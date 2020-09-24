import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Container, WithStyles, withStyles, Button, Breadcrumbs, Link, Typography } from "@material-ui/core";
import styles from "../../styles/page-content";
import ApiUtils from "../../../src/utils/ApiUtils";
import { Page, Post, MenuLocationData, PostTitle, CustomPage } from "../../../src/generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";
import strings from "../../localization/strings";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import * as classNames from "classnames";
import * as moment from "moment";
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import TreeView from "../generic/TreeView";
import RightSideBar from "../generic/RightSideBar";
import hero from "../../resources/img/postHeader.png";

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
  parentPage?: Page;
  post?: Post;
  title: string;
  loading: boolean;
  isArticle: boolean;
  pageTitle?: PostTitle;
  nav?: MenuLocationData;
  breadcrumb: Breadcrumb[];
  mainContent?: React.ReactElement;
  sideContent?: React.ReactElement;
  pages: CustomPage[];
  sideMenuParentPage?: Page;
  leftMenuCurrentTopPage?: Page;
  postThumbnail: string;
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
      postThumbnail: ""
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
    const { sideContent, currentPage, postThumbnail } = this.state;
    const loactionPathnameArrayRaw = (locationPath ? locationPath.replace(/\//g, " ") || "" : "").split(" ");
    const loacationPathnameArray = loactionPathnameArrayRaw.splice(1, (loactionPathnameArrayRaw.length -1 ) - 1);
    const checkContent = React.Children.map(sideContent, child => child ? child.props.children.length : 0);
    const isContent = (checkContent ? (checkContent[0] === 0 ? false : true) : false);
    return (
      <BasicLayout lang={ lang } slug={ slug } title={ this.setTitleSource() }>
        <div className={ classes.heroImageDiv } style={{ backgroundImage: `url(${ postThumbnail ? postThumbnail : hero })` }}>
          <h1 className={ classes.heroText }>{ currentPage ? ReactHtmlParser(currentPage.title ? currentPage.title.rendered || "" : "") : null }</h1>
        </div>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
              <Breadcrumbs separator=">">
                { this.state.breadcrumb && this.renderBreadcrumb() }
              </Breadcrumbs>
              <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve">
                <a rel="nofollow" className="rsbtn_play" accessKey="L" title="Kuuntele ReadSpeaker webReaderilla" href={"//app-eu.readspeaker.com/cgi-bin/rsent?customerid=11747&amp;lang=fi_fi&amp;readclass=readthis&amp;url="+encodeURIComponent(window.location.href)}>
                    <span className="rsbtn_left rsimg rspart"><span className="rsbtn_text"><span>Kuuntele</span></span></span>
                    <span className="rsbtn_right rsimg rsplay rspart"></span>
                </a>
              </div>
            </div>
            <div className={ classes.columns }>
              <TreeView slug={ slug } />
            <div className={ classes.contentarea } >
              <div className="readthis">
                { this.renderContent() }
              </div>
            </div>
              { sideContent &&
              <div className={ classes.sidebar } style={ isContent ? { display: "block" } : { display: "none" } }>
                <RightSideBar content={ sideContent } />
              </div>
              }
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
    const page = this.state.currentPage;
    return (
      <Container className={ classNames( classes.root, this.state.isArticle && "article") }>
        <h2>{ page ? ReactHtmlParser(page.title ? page.title.rendered || "" : "") : null }</h2>
        { this.renderPostContent() }
      </Container>
    );
  }

  /**
   * Loads page or post content
   */
  private loadContent = async () => {
    this.setState({
      loading: true
    });

    const { locationPath } = this.props;
    const loactionPathnameArrayRaw = (locationPath ? locationPath.replace(/\//g, " ") || "" : "").split(" ");
    const loacationPathnameArray = loactionPathnameArrayRaw.splice(1, (loactionPathnameArrayRaw.length -1 ) - 1);
    const lang = this.props.lang;
    const slugParts = this.props.slug.split("/");
    const slug = slugParts.pop() || slugParts.pop();
    if (!slug) {
      // TODO: handle error
      return;
    }

    const api = ApiUtils.getApi();

    const apiCalls = await Promise.all([
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] }),
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
      api.getWpV2Pages({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getCustomPages({ parent_slug: "sivut" }),
      api.getWpV2Pages({ slug: [ "sivut" ] }),
      api.getWpV2Pages({ slug: [ loacationPathnameArray[1] ] }),
      api.getPostThumbnail({ slug: slug })
    ]);

    const currentPage = apiCalls[0][0];
    const post = apiCalls[1][0];
    const nav = apiCalls[2];
    const pageTitle = apiCalls[3][0].title || apiCalls[4][0].title;
    const pages = apiCalls[5];
    const parentPage = apiCalls[6][0];
    const leftMenuCurrentTopPage = apiCalls[7][0];
    const postThumbnail = apiCalls[8];

    this.setState({
      currentPage: currentPage,
      post: post,
      isArticle: !!post,
      loading: false,
      nav: nav,
      pageTitle: pageTitle,
      pages: pages,
      parentPage: parentPage,
      leftMenuCurrentTopPage: leftMenuCurrentTopPage,
      postThumbnail: postThumbnail
    });

    this.breadcrumbPath(pages);
    this.hidePageLoader();
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

    // Find any buttons and replace them with Material UI button
    if (classNames.indexOf("wp-block-button") > -1) {
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
}
export default withStyles(styles)(PostPage);
