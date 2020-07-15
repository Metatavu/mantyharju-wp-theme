import * as React from "react";
import BasicLayout from "../BasicLayout";
import contentImage from "../../resources/img/mantyharju-images/mantyharju-images/hero-front-1600x1080.jpg";
import { Post, MenuLocationData } from "../../generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import ApiUtils from "../../utils/ApiUtils";
import { WithStyles, withStyles, Button, Container } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import * as moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import CurrenEventsIcon from '@material-ui/icons/QuestionAnswerOutlined';
import AnnouncementsIcon from '@material-ui/icons/VolumeUp';
import JobsIcon from '@material-ui/icons/ThumbsUpDown';

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  lang: string
}

/**
 * Interface representing component state
 */
interface State {
  posts: Post[],
  linkedEventsPost?: Post,
  loading: boolean,
  mainMenu?: MenuLocationData,
  localeMenu?: MenuLocationData,
  scrollPosition: number,
  siteMenuVisible: boolean,
  siteSearchVisible: boolean,
  announcementsCategoryId: number,
}

/**
 * WelcomePage component
 */
class WelcomePage extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   * Check announcementsCategoryId from wp post categories
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false,
      announcementsCategoryId: 9,
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      loading: true
    });

    const api = ApiUtils.getApi();

    const [posts, mainMenu, localeMenu, eventsPost] = await Promise.all(
      [
        api.getWpV2Posts({lang: [ this.props.lang ]}),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2PostsById({ id: "57" })
      ]
    )

    this.setState({
      posts: posts,
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
      linkedEventsPost: eventsPost
    });

    this.hidePageLoader();
  }

  /**
   * Component will unmount life-cycle handler
   */
  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Component render method
   */
  public render() {
    const { lang, classes } = this.props;

    return (
      <BasicLayout lang={ lang }>
        <div className={ classes.heroImageDiv }>
          <h1 className={ classes.heroText }>Mäntyharju. -logo</h1>
          <h2 className={ classes.heroText }>Luontoa, kulttuuria ja elämää!</h2>
          <Button title="Lorem Ipsum" className= { `${classes.generalButtonStyle} ${classes.heroButton}`}>Lorem Ipsum</Button>
          <Button title="Suosituimmat sivut" className={ `${classes.heroButtonPopularPages}`} endIcon={ <AddIcon/> }>Suosituimmat sivut</Button>
        </div>
        <div className= { classes.addEventDiv }> 
          <div className= { classes.addEventImageDiv }>
            <img className= { classes.addEventImage } alt="Lisää tapahtuma: kuvituskuva" src={ contentImage }></img>
          </div>
          <div className= { classes.addEventTextDiv }>
            <h3 className= { classes.addEventTextDivHeading }>Lisää kesätapahtumasi tapahtumakalenteriin</h3>
            <p className= { classes.addEventTextDivParagraph }>
              Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </p>
            <Button className={ `${classes.generalButtonStyle} ${classes.addEventButton}`}>Lorem Ipsum</Button>
          </div>
        </div>
        <div className={ classes.postsContainer }>
          <div className= { classes.postsColumn }>
            <h1>{ <CurrenEventsIcon/> } Ajankohtaista</h1>
            { this.renderAnnouncements(this.state.announcementsCategoryId) }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
          <div className= { classes.postsColumn }>
            <h1>{ <AnnouncementsIcon/> } Kuulutukset</h1>
            { this.renderAnnouncements(this.state.announcementsCategoryId) }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
          <div className= { classes.postsColumn }>
            <h1>{ <JobsIcon/> } Työpaikat</h1>
            { this.renderAnnouncements(this.state.announcementsCategoryId) }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
        </div>
        <div className = { classes.linkedEventsContainer }>
          <h1>Tapahtumat</h1>
          <div className={ classes.wrapper }>
            { this.renderPosts(57) }
          </div>
          <Button title= "Kaikki tapahtumat" className={ `${classes.generalButtonStyle} ${classes.allEventsButton}` }>Kaikki tapahtumat</Button>
          <Button title= "Lisää tapahtuma" className={ `${classes.generalButtonStyle} ${classes.addLinkedEventButton}` }>Lisää tapahtuma</Button>
        </div>
      </BasicLayout>
    );
  }

  /**
   * Render Announcements posts
   */
  private renderAnnouncements = (categoryId: number) => {
    const { classes } = this.props;
    if (!this.state.posts.length) {
      return null;
    } else {
      return (
        this.getLimitedPosts(categoryId).map((post) => {
          const parsedContent = ReactHtmlParser(post.content ? post.content.rendered || "" : "");
            if ((post.categories ? post.categories : new Array()).includes(categoryId)) {
              const postsArray = new Array();
              postsArray.concat(post);
              return(
                <div className={ classes.allPosts}>
                  <div className={ classes.singlePost }>
                    <p className={ classes.postDate }>{ ReactHtmlParser(!post.date ? "" : moment(post.date).format("DD.MM.YYYY")) }</p>
                    <div className={ classes.postContent }>
                      { ReactHtmlParser(post.content ? post.content.rendered || "" : "") }
                    </div>
                  </div>
                </div>
              )
            } else {
              return null;
            }
        })
      );
    }
  }

  /**
   * Render LinkedEvents posts
   * 
   * TODO: Get linkedEventsPost not by the hardcoded post ID
   */
  private renderPosts = (postId: number) => {
    const { classes } = this.props;
    const linkedEventsPost = this.state.linkedEventsPost;
    var events = new Array();
    if (!this.state.linkedEventsPost) {
      return null;
    } else {
      const parsedContent = ReactHtmlParser(this.state.linkedEventsPost.content ? this.state.linkedEventsPost.content.rendered || "" : "");
      return (
        parsedContent.splice(0, 8).map(contentItem => {
          return (
            <figure className={classes.events_item_universal}>
              <p>{ contentItem }</p>
            </figure>
          )
        })
     )
    }
  }

  /**
   * Hide page loader
   */
  private hidePageLoader() {
    const loaderElement = document.getElementById("pageLoader");
    if (loaderElement) {
      loaderElement.style.opacity = "0";
      setTimeout(() => {
        loaderElement.style.display = "none";
      }, 500);
    }
  }

  /**
   * Update scrolling position method
   */
  private handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      scrollPosition: currentScrollPos
    });
  }

  /**
   * Gets limited posts array
   */
  private getLimitedPosts = (categoryId: number) => {
    const postsArray: Post[] = new Array();
    this.state.posts.map((post) => {
      if ((post.categories ? post.categories : new Array()).includes(categoryId)) {
        postsArray.push(post)
      }
    })

    return postsArray.splice(0, 3);
  }
}

export default withStyles(styles)(WelcomePage);