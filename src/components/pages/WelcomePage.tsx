import * as React from "react";
import BasicLayout from "../BasicLayout";
import contentImage from "../../resources/img/mantyharju-images/mantyharju-images/hero-front-1600x1080.jpg";
import ReactHtmlParser from "react-html-parser";
import ApiUtils from "../../utils/ApiUtils";
import { WithStyles, withStyles, Button, CircularProgress } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import * as moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import CurrenEventsIcon from '@material-ui/icons/QuestionAnswerOutlined';
import AnnouncementsIcon from '@material-ui/icons/VolumeUp';
import JobsIcon from '@material-ui/icons/ThumbsUpDown';
import { Post, MenuLocationData, Customize, Attachment, GetWpV2PostsOrderbyEnum, GetWpV2PostsOrderEnum } from "../../generated/client/src";

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
  media: Attachment[],
  linkedEventsPost?: Post,
  loading: boolean,
  popularPosts: Post[],
  mainMenu?: MenuLocationData,
  localeMenu?: MenuLocationData,
  scrollPosition: number,
  siteMenuVisible: boolean,
  siteSearchVisible: boolean,
  announcementsCategoryId: number,
  newsCategoryId: number,
  linkedEventsLimitingNumber: number,
  customizeFields: Customize
}

/**
 * WelcomePage component
 */
class WelcomePage extends React.Component<Props, State> {

  popularPagesSection: React.RefObject<HTMLDivElement>;

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
      media: [],
      loading: false,
      popularPosts: [],
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false,
      announcementsCategoryId: 3,
      newsCategoryId: 5,
      linkedEventsLimitingNumber: 8,
      customizeFields: {}
    };

    this.popularPagesSection = React.createRef();
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
    const [posts, mainMenu, localeMenu, popularCategory, eventsPost, media, customizeFields] = await Promise.all(
      [
        api.getWpV2Posts({per_page: 40}),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2Categories({ slug: ["popular"] }),
        api.getWpV2PostsById({ id: "64" }),
        api.getWpV2Media({}),
        api.getWpV2Customize()
      ]
    );

    const categoryIdArray = [(popularCategory.length > 0 ? popularCategory[0].id || -1 : -1).toString()];

    const popularPosts = await api.getWpV2Posts({ categories: categoryIdArray, per_page: 6, orderby: GetWpV2PostsOrderbyEnum.Date, order: GetWpV2PostsOrderEnum.Desc });

    this.setState({
      posts: posts,
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
      popularPosts: popularPosts,
      linkedEventsPost: eventsPost,
      media: media,
      customizeFields: customizeFields
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
    const { customizeFields } = this.state;
    let addEventImageStyle = {backgroundImage: `url(${ customizeFields.showcase_image })`};

    return (
      <BasicLayout lang={ lang }>
        <div className={ classes.heroImageDiv }>
          <h1 className={ classes.heroText }>Mäntyharju. -logo</h1>
          <h2 className={ classes.heroText }>Luontoa, kulttuuria ja elämää!</h2>
          <Button title="Lorem Ipsum" className= { `${classes.generalButtonStyle} ${classes.heroButton}`}>Lorem Ipsum</Button>
          <Button onClick={ this.scrollDownToPopularPages } title="Suosituimmat sivut" className={ `${classes.heroButtonPopularPages}`} endIcon={ <AddIcon/> }>Suosituimmat sivut</Button>
        </div>
        { this.state.loading &&
          <div className={ classes.loadingIconContainer }>
            <CircularProgress />
          </div>
        }
        { !this.state.loading &&
          <div className= { classes.addEventDiv }>
            <div className= { classes.addEventImageDiv } style={addEventImageStyle}>
            </div>
            <div className= { classes.addEventTextDiv }>
              <h3 className= { classes.addEventTextDivHeading }>{ customizeFields.showcase_title }</h3>
              <p className= { classes.addEventTextDivParagraph }>
                { customizeFields.showcase_text }
              </p>
              <Button onClick={ this.navigateTo(customizeFields.showcase_button_link || window.location.href) } className={ `${classes.generalButtonStyle} ${classes.addEventButton}`}>
                { customizeFields.showcase_button_text }
              </Button>
            </div>
          </div>
        }
        <div className={ classes.postsContainer }>
          <div className= { classes.postsColumn }>
            <h1>{ <CurrenEventsIcon/> } Ajankohtaista</h1>
            { this.renderNews(this.state.newsCategoryId) }
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
            { this.renderLinkedEvents(64) }
          </div>
          <Button title= "Kaikki tapahtumat" onClick={this.expandLinkedEvents} className={ `${classes.generalButtonStyle} ${classes.allEventsButton}` }>Kaikki tapahtumat</Button>
          <Button title= "Lisää tapahtuma" className={ `${classes.generalButtonStyle} ${classes.addLinkedEventButton}` }>Lisää tapahtuma</Button>
        </div>
        <div ref={ this.popularPagesSection } className={ classes.bottom_section }>
          {
            this.renderBottomSectionPosts()
          }
        </div>
      </BasicLayout>
    );
  }

  /**
   * Render News posts
   * 
   * TODO: Get linkedEventsPost not by the hardcoded post ID
   */
  private renderNews = (categoryId: number) => {
    const { classes } = this.props;
    const newsPost = this.getLimitedPosts(categoryId, 1)[0];
    var events = new Array();
    if (!newsPost) {
      return null;
    } else {
      const parsedContent = ReactHtmlParser(newsPost.content ? newsPost.content.rendered || "" : "");
      return (
        parsedContent.splice(0, 4).map(contentItem => {
          return (
            <div className={ classes.allPosts}>
              <div className={ classes.singleNewsPost }>
                { contentItem }
              </div>
            </div>
          )
        })
      )
    }
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
        this.getLimitedPosts(categoryId, 3).map((post) => {
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
                    <hr />
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
  private renderLinkedEvents = (postId: number) => {
    const { classes } = this.props;
    const linkedEventsPost = this.state.linkedEventsPost;
    const events = new Array();
    if (!this.state.linkedEventsPost) {
      return null;
    } else {
      const parsedContent = ReactHtmlParser(this.state.linkedEventsPost.content ? this.state.linkedEventsPost.content.rendered || "" : "");
      return (
        parsedContent.splice(0, this.state.linkedEventsLimitingNumber).map(contentItem => {
          return (
            <figure className={classes.events_item_universal}>
              { contentItem }
            </figure>
          );
        })
      );
    }
  }

  /**
   * Render Bottom section posts
   */
  private renderBottomSectionPosts = () => {
    const { classes } = this.props;
    const { popularPosts } = this.state;
    return popularPosts.map(post => {
      return (
        <div onClick={ this.navigateTo(post.link || window.location.href) } style={{ backgroundImage: `url(${ this.getAttachmentForPost(post) })` }} className={classes.bottom_section_item}>
          <p>{ post.title ? post.title.rendered || "" : "" }</p>
        </div>
      );
    });
  }

  /**
   * Returns post featured image URL
   */
  private getAttachmentForPost = (post: Post) => {
    let attachmentUrl = "";
    if (this.state.media) {
      this.state.media.map(attachment => {
        if (attachment.id == post.featured_media) {
          attachmentUrl = attachment.source_url || "";
        }
      });
    }
    
    return attachmentUrl;
  }

  /**
   * Navigates to the url
   *
   * @param url url
   */
  private navigateTo = (url: string) => () => {
    window.location.href = url;
  }

  /**
   * Scrolls down to popular pages
   */
  private scrollDownToPopularPages = () => {
    const { current } = this.popularPagesSection;
    if (current) {
      current.scrollIntoView();
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
   * Action handler for "Show more" Linked events button
   */
  private expandLinkedEvents = () => {
    var newLimitingNumber: number;
    if (this.state.linkedEventsLimitingNumber == 8) {
      newLimitingNumber = 16
    } else {
      newLimitingNumber = 8
    }

    this.setState({
      linkedEventsLimitingNumber: newLimitingNumber
    })
  }

  /**
   * Gets limited posts array
   */
  private getLimitedPosts = (categoryId: number, delimiter: number) => {
    const postsArray: Post[] = new Array();
    this.state.posts.map((post) => {
      if ((post.categories ? post.categories : new Array()).includes(categoryId)) {
        postsArray.push(post);
      }
    })

    return postsArray.splice(0, delimiter);
  }
}

export default withStyles(styles)(WelcomePage);
