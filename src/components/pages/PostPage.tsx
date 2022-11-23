import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Container, WithStyles, withStyles, Button, Breadcrumbs, Link, Grid, CircularProgress } from "@material-ui/core";
import styles from "../../styles/page-content";
import ApiUtils from "../../../src/utils/ApiUtils";
import { Page, Post, PostTitle, CustomPage } from "../../../src/generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";
import strings from "../../localization/strings";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import * as classNames from "classnames";
import * as moment from "moment";
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import TreeView from "../generic/TreeView";
import RightSideBar from "../generic/RightSideBar";
import hero from "../../resources/img/postHeader.jpg";
import ReadSpeaker from "../generic/ReadSpeaker";
import Movies from "../movies/movies";
import Premiers from "../movies/premiers";
import { Add } from "@material-ui/icons";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  slug: string
  lang: string
  mainPageSlug: string
  locationPath: string
}

/**
 * Interface representing component state
 */
interface State {
  currentPage?: Page;
  post?: Post;
  title: string;
  loading: boolean;
  isArticle: boolean;
  pageTitle?: PostTitle;
  breadcrumb: Breadcrumb[];
  mainContent?: React.ReactElement;
  sideContent?: React.ReactElement;
  pages: CustomPage[];
  postThumbnail: string;
  postThumbnailLoading: boolean;
  isMoviePage?: boolean;
}

/**
 * Interface for breadcrumb items
 */
interface Breadcrumb {
  label?: string;
  link?: string;
}

/**
 * PostPage component
 */
class PostPage extends React.Component<Props, State> {

  private contentParsed: boolean;

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      isArticle: false,
      loading: false,
      breadcrumb: [],
      title: "",
      pages: [],
      postThumbnail: "",
      postThumbnailLoading: false
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.loadContent();
  }

  /**
   * Component did update life-cycle handler
   */
  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.slug !== this.props.slug) {
      this.loadContent();
    }
  }

  /**
   * Component render method
   */
  public render() {
    const { classes, lang, slug, locationPath } = this.props;
    const { sideContent, currentPage, postThumbnail, postThumbnailLoading } = this.state;
    const loactionPathnameArrayRaw = (locationPath ? locationPath.replace(/\//g, " ") || "" : "").split(" ");
    const loacationPathnameArray = loactionPathnameArrayRaw.splice(1, (loactionPathnameArrayRaw.length -1 ) - 1);
    const checkContent = React.Children.map(sideContent, child => child ? child.props.children.length : 0);
    const isContent = (checkContent ? (checkContent[0] === 0 ? false : true) : false);
    const heroDivStyle = postThumbnailLoading ? { background: "#eee"  } : { backgroundImage: `url(${ postThumbnail ? postThumbnail : hero })` };
    return (
      <BasicLayout
        lang={ lang }
        slug={ slug }
        title={ this.setTitleSource() }
      >
        <div className={ classes.heroImageDiv } style={ heroDivStyle }>
          <h1 className={ classes.heroText }>
            { currentPage ? ReactHtmlParser(currentPage.title ? currentPage.title.rendered || "" : "") : "..." }
          </h1>
        </div>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
              <Grid container spacing={ 0 }>
                <Grid item xs={ 12 } md={ 8 } key={ "123" }>
                  <Breadcrumbs separator=">">
                    { this.state.breadcrumb && this.renderBreadcrumb() }
                  </Breadcrumbs>
                </Grid>
                <Grid item xs={ 12 } md={ 4 } key={ "456" }>
                  <ReadSpeaker />
                </Grid>
              </Grid>
            </div>
            <div id="readthis" className={ classes.columns }>
              <Grid container spacing={ 0 }>
                <Grid item xs={ 12 } md={ 3 } lg={ 2 } key={ "123" }>
                  <div className="rs_skip">
                    <TreeView slug={ slug }/>
                  </div>
                </Grid>
                <Grid item xs={ 12 } md={ 6 } lg={ 7 } key={ "456" }>
                  <div className={ classes.contentarea }>       
                      { this.renderContent() }
                  </div>
                </Grid>
                <Grid item xs={ 12 } md={ 3 } lg={ 3 } key={ "789" }>
                  { sideContent &&
                  <div
                    className={ classes.sidebar }
                    style={ isContent ? { display: "block" } : { display: "none" } }
                  >
                    <RightSideBar content={ sideContent } />
                  </div>
                  }
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </BasicLayout>
    );
  }



  /**
   * Renders breadcrumb
   */
  private renderBreadcrumb = () => {
    const { breadcrumb } = this.state;
    return breadcrumb.map((crumb) => {
      return (
        <Link color="inherit" href={ crumb.link } onClick={() => {}}>
          { ReactHtmlParser(crumb.label ? crumb.label || "" : "") }
        </Link>
      );
    });
  }

  /**
   * Render content method
   */
  private renderContent = () => {
    const { classes } = this.props;
    const { isMoviePage } = this.state;

    const page = this.state.currentPage;
    return (
      <Container className={ classNames( classes.root, this.state.isArticle && "article") }>
        { !isMoviePage &&
          <h2>
            { page ? ReactHtmlParser(page.title ? page.title.rendered || "" : "") : null }
          </h2>
        }
        { this.renderPostContent() }
      </Container>
    );
  }

  /**
   * Loads page or post content
   */
  private loadContent = async () => {
    this.setState({
      loading: true,
      postThumbnailLoading: true
    });

    const lang = this.props.lang;
    const slugParts = this.props.slug.split("/");
    const slug = slugParts.pop() || slugParts.pop();
    if (!slug) {
      // TODO: handle error
      return;
    }
    this.hidePageLoader();    
    const api = ApiUtils.getApi();

    Promise.all([
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] })
    ]).then(([pagesRes, postsRes]) => {
      const post = postsRes[0];
      this.setState({ loading: false, currentPage: pagesRes[0], post: post, isArticle: !!post });
      
    });

    Promise.all([
      api.getWpV2Pages({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ this.props.mainPageSlug ] })
    ]).then(([pages, posts]) => {
      const pageTitle = pages[0].title || posts[0].title;
      this.setState({ pageTitle });
    });

    ApiUtils.cachedGetCustomPages(api, "posts").then((pages) => {
      this.setState({ pages });
      this.breadcrumbPath(pages);
    });

    api.getPostThumbnail({ slug: slug }).then((postThumbnail) => {
      this.setState({ postThumbnail, postThumbnailLoading: false });
    });
  }

  /**
   * Initializes building a breadcrumb
   *
   * @param pages page array
   */
  private breadcrumbPath = (pages: CustomPage[]) => {
    const mainPages = pages.filter(item => item.post_parent === 0);
    this.buildPath(mainPages, pages);
  }

  /**
   * Recursively builds breadcrumb
   * 
   * @param children child pages array
   * @param pages all pages array
   * @param path collected breadcumbs
   */
  private buildPath = (children: CustomPage[], pages: CustomPage[], path?: Breadcrumb[]) => {
    const { currentPage } = this.state;
    children.forEach(childPage => {
      const childPages = pages.filter(item => item.post_parent === childPage.ID);
      if (currentPage && (currentPage.id === childPage.ID) && childPage.post_title) {
        this.setState({
          title: childPage.post_title || "",
          breadcrumb: path ? [...path, { label: childPage.post_title || "", link: childPage.link || "" }] : [{ label: childPage.post_title || "", link: childPage.link || "" }]
        });
      } else if (childPages && childPage.post_title) {
        this.buildPath(childPages, pages, path ? [...path, { label: childPage.post_title || "", link: childPage.link || "" }] : [{ label: childPage.post_title || "", link: childPage.link || "" }]);
      }
    });
  }

  /**
   * Render post content method
   */
  private renderPostContent = () => {
    const { classes, lang } = this.props;
    const { mainContent } = this.state;
    const content = this.getPageOrPostContent();
    moment.locale(lang);
    return (
      <div className={
        classNames(classes.htmlContainer,
        this.state.isArticle && "article")
        }
      >
      { this.state.loading && 
        <div className={ classes.loadingIconContainer }>
          <CircularProgress />
        </div>
      }
      { !this.state.loading && !mainContent &&
        content
      }
      { !this.state.loading &&
        mainContent
      }
    </div>
    );
  }

  /**
   * get html element classes
   *
   * @param node DomElement
   */
  private getElementClasses = (node: DomElement): string[] => {
    const classString = node.attribs ? node.attribs.class : "";
    if (node.attribs && node.attribs.class) {
      return classString.split(" ");
    }

    return [];
  }

  /**
   * Get html link href
   */
  private getLinkHref = (node: DomElement) => {
    return node.attribs && node.attribs.href ? node.attribs.href : "";
  }

  /**
   * Get html text content
   */
  private getElementTextContent = (node: DomElement) => {
    return node.children && node.children[0] ? node.children[0].data as string : "";
  }

  /**
   * Set html source for page content
   */
  private getPageOrPostContent = () => {
    const {currentPage, post} = this.state;

    const noContentError = <h2 className="error-text">{ strings.pageNotFound }</h2>;
    const undefinedContentError = <h2 className="error-text">{ strings.somethingWentWrong }</h2>;
    if (!currentPage && !post) {
      return noContentError;
    }

    const renderedContent = currentPage && currentPage.content ? currentPage.content.rendered : post && post.content ? post.content.rendered : undefined;
    if (!renderedContent) {
      return undefinedContentError;
    }

    return ReactHtmlParser(renderedContent, { transform: this.transformContent });
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
   * Set html source for page content
   */
  private setTitleSource = () => {
    const { pageTitle, loading } = this.state;
    const noContentError = `${ strings.whoops }`;
    const undefinedContentError = `${ strings.error }`;

    if (pageTitle) {
      return pageTitle.rendered || undefinedContentError;
    } else if (!loading) {
      return noContentError;
    } else {
      return "";
    }
  }

  /**
   * transform without changes
   *
   * @param node DomElement
   * @param index DomElement index
   */
  private transform = (node: DomElement, index: number) => {
    const content = this.getElementTextContent(node);

    if (content && content.indexOf("[movies]") > -1) {
      this.setState({ isMoviePage: true });
      return <Movies/>;
    }

    if (content && content.indexOf("[premiers]") > -1) {
      this.setState({ isMoviePage: true });
      return <Premiers/>;
    }

    return convertNodeToElement(node, index, this.transform);
  }

  /**
   * transform html source content before it is rendered
   *
   * @param node DomElement
   * @param index DomElement index
   */
  private transformContent = (node: DomElement, index: number) => {
    const { classes } = this.props;
    const classNames = this.getElementClasses(node);

    if (classNames.indexOf("wp-block-columns") > -1 && node.children && node.children.length > 3 && !this.contentParsed) {
      this.contentParsed = true;
      const mainContent = convertNodeToElement(node.children[1], index, this.transform);
      const sideContent = convertNodeToElement(node.children[3], index, this.transform);
      this.setState({
        mainContent: mainContent,
        sideContent: sideContent
      });
    }

    // Find any add new event buttons and make them trigger add event dialog
    // TODO: move add event dialog into separate component from WelcomePage.tsx that can be launched from anywhere
    if (classNames.indexOf("new-event-button") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return (
          <Button onClick={ this.addEvent } className={ classes.button } color="primary" variant="outlined" startIcon={ <Add /> }>
            { this.getElementTextContent(childNode) }
          </Button>
        );
      }  // Find any buttons and replace them with Material UI button
    }  else if (classNames.indexOf("wp-block-button") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return (
          <a href={ this.getLinkHref(childNode) } style={{ textDecoration: "none" }}>
            <Button className={ classes.button } color="primary" variant="outlined" endIcon={ <ArrowIcon /> }>
              { this.getElementTextContent(childNode) }
            </Button>
          </a>
        );
      }
    }

    return convertNodeToElement(node, index, this.transformContent);
  }

  /**
   * Open add event dialog method
   * TODO: open add event dialog when it has been separated from the WelcomePage.tsx
   */
  private addEvent = () => {
    alert("Open add event dialog!")
  }
}
export default withStyles(styles)(PostPage);
