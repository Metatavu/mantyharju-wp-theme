import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Container, WithStyles, withStyles, Button, Breadcrumbs, Link, Typography } from "@material-ui/core";
import styles from "../../styles/page-content";
import ApiUtils from "../../../src/utils/ApiUtils";
import { Page, Post, MenuLocationData, PostTitle } from "../../../src/generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";
import strings from "../../localization/strings";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import * as classNames from "classnames";
import * as moment from "moment";
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import TreeView from "../generic/TreeView";
import RightSideBar from "../generic/RightSideBar";

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
  pages: Page[];
  sideMenuParentPage?: Page;
  leftMenuCurrentTopPage?: Page;
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
    const { sideContent, currentPage, parentPage, pages, leftMenuCurrentTopPage } = this.state;
    const loactionPathnameArrayRaw = (locationPath ? locationPath.replace(/\//g, " ") || "" : "").split(" ");
    const loacationPathnameArray = loactionPathnameArrayRaw.splice(1, (loactionPathnameArrayRaw.length -1 ) - 1);
    const checkContent = React.Children.map(sideContent, child => child ? child.props.children.length:0);
    const isContent = (checkContent ? (checkContent[0] === 0 ? false : true) : false);
    return (
      <BasicLayout lang={ lang } slug={ slug } title={ this.setTitleSource() }>
        <div className={ classes.heroImageDiv }>
          <h1 className={ classes.heroText }>{ currentPage ? ReactHtmlParser(currentPage.title ? currentPage.title.rendered || "" : "") : null }</h1>
        </div>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
              <Breadcrumbs separator=">">
                <Link color="inherit" href="/" onClick={() => {}}>
                  Etusivu
                </Link>
                { this.state.breadcrumb && this.renderBreadcrumb() }
              </Breadcrumbs>
            </div>
            <div className={ classes.columns }>
              <TreeView slug={ slug } />
              <div className={ classes.contentarea }>
                { this.renderContent() }
              </div>
                { sideContent &&
                <div className={ classes.sidebar } style={ isContent ? { display: "block" }: { display: "none" } } >
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
      api.getWpV2Pages({ per_page: 100 }),
      api.getWpV2Pages({ slug: [ "sivut" ] }),
      api.getWpV2Pages({ slug: [ loacationPathnameArray[1] ] }),
    ]);

    const currentPage = apiCalls[0][0];
    const post = apiCalls[1][0];
    const nav = apiCalls[2];
    const pageTitle = apiCalls[3][0].title || apiCalls[4][0].title;
    const pages = apiCalls[5];
    const parentPage = apiCalls[6][0];
    const leftMenuCurrentTopPage = apiCalls[7][0];

    this.setState({
      currentPage: currentPage,
      post: post,
      isArticle: !!post,
      loading: false,
      nav: nav,
      pageTitle: pageTitle,
      pages: pages,
      parentPage: parentPage,
      leftMenuCurrentTopPage: leftMenuCurrentTopPage
    });

    this.breadcrumbPath(pages);
    this.hidePageLoader();
  }

  /**
   * Initializes building a breadcrumb
   *
   * @param pages page array
   */
  private breadcrumbPath = (pages: Page[]) => {
    const mainPages = pages.filter(item => item.parent === 0);
    this.buildPath(mainPages, pages);
  }

  /**
   * Recursively builds breadcrumb
   * 
   * @param children child pages array
   * @param pages all pages array
   * @param path collected breadcumbs
   */
  private buildPath = (children: Page[], pages: Page[], path?: Breadcrumb[]) => {
    const { currentPage } = this.state;
    children.forEach(childPage => {
      const childPages = pages.filter(item => item.parent === childPage.id);     
      if (currentPage && (currentPage.id === childPage.id) && childPage.title) {
        this.setState({
          title: childPage.title.rendered || "",
          breadcrumb: path ? [...path, { label: childPage.title.rendered || "", link: childPage.link || "" }] : [{ label: childPage.title.rendered || "", link: childPage.link || "" }]
        });
      } else if (childPages && childPage.title) {
        this.buildPath(childPages, pages, path ? [...path, { label: childPage.title.rendered || "", link: childPage.link || "" }] : [{ label: childPage.title.rendered || "", link: childPage.link || "" }]);
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
