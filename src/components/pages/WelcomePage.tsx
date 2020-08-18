import * as React from "react";
import BasicLayout from "../BasicLayout";
import ReactHtmlParser from "react-html-parser";
import ApiUtils from "../../utils/ApiUtils";
import { WithStyles, withStyles, Button, CircularProgress } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import * as moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import CurrenEventsIcon from "@material-ui/icons/QuestionAnswerOutlined";
import AnnouncementsIcon from "@material-ui/icons/VolumeUp";
import JobsIcon from "@material-ui/icons/ThumbsUpDown";
import { Post, MenuLocationData, CustomizeField, Attachment, Page } from "../../generated/client/src";

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
  loading: boolean,
  popularPages: Page[],
  mainMenu?: MenuLocationData,
  localeMenu?: MenuLocationData,
  scrollPosition: number,
  siteMenuVisible: boolean,
  siteSearchVisible: boolean,
  announcementsCategoryId: number,
  newsCategoryId: number,
  linkedEventsCategoryId: number,
  linkedEventsLimitingNumber: number,
  customizeFields: CustomizeField[]
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
      popularPages: [],
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false,
      announcementsCategoryId: 4,
      newsCategoryId: 15,
      linkedEventsCategoryId: 14,
      linkedEventsLimitingNumber: 8,
      customizeFields: []
    };

    this.popularPagesSection = React.createRef();
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    this.setState({
      loading: true
    });
    const api = ApiUtils.getApi();

    const customizeFields = await api.getWpV2Customize();

    this.setState({
      customizeFields: customizeFields
    });

    const [posts, mainMenu, localeMenu, popularCategory, media] = await Promise.all(
      [
        api.getWpV2Posts({per_page: 90}),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2Categories({ slug: ["suosittu"] }),
        api.getWpV2Media({}),
        api.getWpV2Customize()
      ]
    );

    const categoryIdArray = [(popularCategory.length > 0 ? popularCategory[0].id || -1 : -1)];

    const popularPages = await api.getWpV2Pages({ categories: categoryIdArray, per_page: 6});

    this.setState({
      posts: posts,
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
      popularPages: popularPages,
      media: media
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
    const showcase_image = this.getCustomizerValue("showcase_image");
    const showcase_title = this.getCustomizerValue("showcase_title");
    const showcase_text = this.getCustomizerValue("showcase_text");
    const showcase_button_link = this.getCustomizerValue("showcase_button_link");
    const showcase_button_text = this.getCustomizerValue("showcase_button_text");
    const hero_image = this.getCustomizerValue("hero_image");
    const hero_logo_image = this.getCustomizerValue("hero_logo_image");
    const hero_title = this.getCustomizerValue("hero_title");
    const hero_button_link = this.getCustomizerValue("hero_button_link");

    let heroBackgroundImage = {backgroundImage: `url(${ hero_image })`};
    let addEventImageStyle = {backgroundImage: `url(${ showcase_image })`};

    return (
      <BasicLayout lang={ lang }>
        <div className={ classes.heroImageDiv } style={ heroBackgroundImage }>
          <h1 className={ classes.heroText }><img src={ hero_logo_image } /></h1>
          <h2 className={ classes.heroText }>{ hero_title }</h2>
          <Button title="Lorem Ipsum" className= { `${ classes.generalButtonStyle } ${ classes.heroButton }`}>{ hero_button_link }</Button>
          <Button
            className={ `${ classes.heroButtonPopularPages }`}
            onClick={ this.scrollDownToPopularPages }
            title="Suosituimmat sivut"
            endIcon={ <AddIcon/> }
          >
            Suosituimmat sivut
          </Button>
        </div>
          <div className= { classes.addEventDiv }>
            <div className= { classes.addEventImageDiv } style={addEventImageStyle}>
            </div>
            <div className= { classes.addEventTextDiv }>
              <h3 className= { classes.addEventTextDivHeading }>{ showcase_title }</h3>
              <p className= { classes.addEventTextDivParagraph }>
                { showcase_text }
              </p>
              <Button onClick={ this.navigateTo(showcase_button_link || window.location.href) } className={ `${classes.generalButtonStyle} ${classes.addEventButton}`}>
                { showcase_button_text }
              </Button>
            </div>
          </div>
        <div className={ classes.postsContainer }>
          <div className= { classes.postsColumn }>
            <h1>{ <CurrenEventsIcon/> } Ajankohtaista</h1>
            { this.state.loading &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            {!this.state.loading &&
              <div>
                { this.renderNews(this.state.newsCategoryId) }
              </div>
            }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
          <div className= { classes.postsColumn }>
            <h1>{ <AnnouncementsIcon/> } Kuulutukset</h1>
            { this.state.loading &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            {!this.state.loading &&
              <div>
                { this.renderAnnouncements(this.state.announcementsCategoryId) }
              </div>
            }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
          <div className= { classes.postsColumn }>
            <h1>{ <JobsIcon/> } Työpaikat</h1>
            { this.state.loading &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            { !this.state.loading &&
              <div>
                { this.renderAnnouncements(this.state.announcementsCategoryId) }
              </div>
            }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
        </div>

        <div className = { classes.linkedEventsContainer }>
          <h1>Tapahtumat</h1>
          <div className={ classes.wrapper }>
            { this.renderLinkedEvents(this.state.linkedEventsCategoryId) }
          </div>
          <Button
            className={ `${classes.generalButtonStyle} ${classes.allEventsButton}` }
            title= "Kaikki tapahtumat" 
            onClick={this.expandLinkedEvents}
          >
              Kaikki tapahtumat
          </Button>
          <Button
            className={ `${classes.generalButtonStyle} ${classes.addLinkedEventButton}` }
            title= "Lisää tapahTuma"
          >
            Lisää tapahtuma
          </Button>
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
   * Method for getting customizer field value
   *
   * @param key field key
   * @returns string
   */
  private getCustomizerValue = (key: string) => {
    const { customizeFields } = this.state;
    const field = customizeFields.find(field => field.key === key);
    const value = field ? field.value : "";
    return value;
  }

  /**
   * Render News posts
   *
   * TODO: Get linkedEventsPost not by the hardcoded post ID
   */
  private renderNews = (categoryId: number) => {
    const { classes } = this.props;
    const newsPost = this.getLimitedPosts(categoryId, 1)[0];
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
          );
        })
      );
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
  private renderLinkedEvents = (categoryId: number) => {
    const { classes } = this.props;
    const linkedEventsPost = this.getLimitedPosts(categoryId, 1)[0];
    if (!linkedEventsPost) {
      return null;
    } else {
      const parsedContent = ReactHtmlParser(linkedEventsPost.content ? linkedEventsPost.content.rendered || "" : "");
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
    const { popularPages } = this.state;
    return popularPages.map(page => {
      return (
        <div
          onClick={ this.navigateTo(page.link || window.location.href) }
          style={{ backgroundImage: `url(${ this.getAttachmentForPage(page) })` }}
          className={classes.bottom_section_item}
        >
          <p>{ page.title ? page.title.rendered || "" : "" }</p>
        </div>
      );
    });
  }

  /**
   * Returns page featured image URL
   */
  private getAttachmentForPage = (page: Page) => {
    let attachmentUrl = "";
    if (this.state.media) {
      this.state.media.map(attachment => {
        if (attachment.id === page.featured_media) {
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
    let newLimitingNumber: number;
    if (this.state.linkedEventsLimitingNumber === 8) {
      newLimitingNumber = 16;
    } else {
      newLimitingNumber = 8;
    }

    this.setState({
      linkedEventsLimitingNumber: newLimitingNumber
    });
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
    });

    return postsArray.splice(0, delimiter);
  }
}

export default withStyles(styles)(WelcomePage);
