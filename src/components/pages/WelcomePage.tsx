import * as React from "react";
import BasicLayout from "../BasicLayout";
import contentImage from "../../resources/img/mantyharju-images/mantyharju-images/hero-front-1600x1080.jpg";
import { Post, MenuLocationData } from "../../generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import ApiUtils from "../../utils/ApiUtils";
import { WithStyles, withStyles, Button } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import * as moment from "moment";
import AddIcon from "@material-ui/icons/Add"

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
  loading: boolean,
  mainMenu?: MenuLocationData,
  localeMenu?: MenuLocationData,
  scrollPosition: number,
  siteMenuVisible: boolean,
  siteSearchVisible: boolean,
  announcementsCategoryId: number
}

/**
 * WelcomePage component
 */
class WelcomePage extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false,
      announcementsCategoryId: 9
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

    const [posts, mainMenu, localeMenu] = await Promise.all(
      [
        api.getWpV2Posts({lang: [ this.props.lang ]}),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" })
      ]
    )

    this.setState({
      posts: posts,
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
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
          <h1>Mäntyharju. -logo</h1>
          <h2 className={ classes.heroText }>Luontoa, kulttuuria ja elämää!</h2>
          <Button className={ classes.heroButton }>Lorem Ipsum</Button>
          <Button className={ classes.heroButtonPopularPages } endIcon={ <AddIcon/> }>Suosituimmat sivut</Button>
        </div>
        <div className= { classes.addEventDiv }> 
          <div className= { classes.addEventImageDiv }>
            <img className= { classes.addEventImage } alt="Lisää tapahtuma: kuvituskuva" src={ contentImage }></img>
          </div>
          <div className= { classes.addEventTextDiv }>
            <h3>Lisää kesätapahtumasi tapahtumakalenteriin</h3>
            <p>
              Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </p>
          </div>
        </div>
        <div className= { classes.announcementsContainer }>
          <h1>Kuulutukset</h1>
          { this.renderAnnouncements(this.state.announcementsCategoryId) }
        </div>
        <div>
          { this.renderPosts(57) }
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
                <div>
                  <div>
                    <p>{ ReactHtmlParser(!post.date ? "" : moment(post.date).format("DD.MM.YYYY")) }</p>
                    <p>{ ReactHtmlParser(post.content ? post.content.rendered || "" : "") }</p>
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
   */
  private renderPosts = (postId: number) => {
    const { classes } = this.props;
    if (!this.state.posts.length) {
      return null;
    } else {
      return (
        this.state.posts.map((post) => {
          const postCategories = post.categories;
          const parsedContent = ReactHtmlParser(post.content ? post.content.rendered || "" : "");
          const parsedContentSecond = ReactHtmlParser(post.content ? post.content.rendered || "" : "");

            if (post.id == postId) {
              return(
                <div className={ classes.eventsContainer }>
                  <div className={ classes.eventsTopRow }>
                    { parsedContent.splice(0, 4) }
                  </div>
                  <div className={ classes.eventsBottomRow }>
                    { parsedContentSecond.splice(4, 8) }
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