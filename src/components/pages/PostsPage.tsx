import * as React from 'react';
import ApiUtils from "../../../src/utils/ApiUtils";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { Container, withStyles, WithStyles, Breadcrumbs, Link, Grid } from '@material-ui/core';
import styles from '../../styles/posts-page';
import BasicLayout from '../BasicLayout';
import { DomElement } from "domhandler";
import { Page, Post, MenuLocationData, PostTitle, Attachment, CustomPage } from 'src/generated/client/src';
import strings from "../../localization/strings";
import * as moment from "moment";
import * as classNames from "classnames";
import hero from "../../resources/img/postHeader.png";
import ReadSpeaker from '../generic/ReadSpeaker';

/**
 * Facebook-logo license: https://commons.wikimedia.org/wiki/File:Facebook_William_Aditya_Sarana.png
 */

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
    slug: string
    lang: string
    mainPageSlug: string
    locationKey?: string
}

/**
 * Component state
 */
interface State {
  currentPage?: Page;
  page?: Page;
  loading: boolean;
  nav?: MenuLocationData;
  breadcrumb: Breadcrumb[];
  pageTitle?: PostTitle;
  title: string;
  secondPageCategoryId: number;
  limitedPosts: Post[];
  pages: CustomPage[];
  parentPage?: Page;
  mainContent?: React.ReactElement;
  sideContent?: React.ReactElement;
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
 * A component for basic layout footer contents
 */
class PostsPage extends React.Component<Props, State> {

  private contentParsed: boolean;

  /**
   * Constructor
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      breadcrumb: [],
      title: "",
      secondPageCategoryId: 6,
      limitedPosts: [],
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
   * Component render
   */
  public render() {
    const { lang, slug, classes } = this.props;
    const { currentPage, postThumbnail } = this.state;
    return (
      <BasicLayout lang={ lang } slug={ slug } title={ this.setTitleSource() }>
        <div className={ classes.heroImageDiv } style={{ backgroundImage: `url(${ postThumbnail ? postThumbnail : hero })` }}>
          <h1 className={ classes.heroText }>{ currentPage ? ReactHtmlParser(currentPage.title ? currentPage.title.rendered || "" : "") : null }</h1>
        </div>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
            <Grid className={ classes.breadcrumbar } container spacing={0}>
                <Grid item xs={12} md={8} key={"123"}>
                  <Breadcrumbs separator=">">
                    { this.state.breadcrumb && this.renderBreadcrumb() }
                  </Breadcrumbs>
                </Grid>
                <Grid item xs={12} md={4} key={"456"}>
                 <ReadSpeaker />
                </Grid>
              </Grid>
              <div id ="readthis">
                <div>
                  { this.renderPostContent() }
                </div>
                <div style={{flexGrow: 1}}>
                  <Grid container className={ classes.gallery }>
                    { this.renderPosts() }
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasicLayout>
    )
  }

  private renderPosts() {
    const { classes, locationKey } = this.props;
    const { page } = this.state;
    let displayPages = this.getChildMenuPages(page ? page.id || -1 : -1);
    if (!displayPages) {
      return null;
    } else {
      return (
        displayPages.map(page => {
          if (page.post_status === "publish") {
            return (
              <Grid item xs={12} sm={6} md={4} className={classes.grid_item}>
                <div style={{ backgroundImage: `url(${ page.featured_image_url || hero })`, backgroundPosition: "center" }} onClick={() => { this.onPostClick(page) }} className={ classes.gallery_section_item  } />
                <h2>{ ReactHtmlParser(page.post_title ? page.post_title || "" : "") }</h2>
              </Grid>
            );
          } else {
            return null;
          }
        })
      )
    }
  }

  /**
   * Render content method
   */
  private renderContent = () => {
    const { classes } = this.props;
    const page = this.state.currentPage;
    return (
      <Container className={ classNames( classes.root ) }>
        <h2>{ page ? ReactHtmlParser(page.title ? page.title.rendered || "" : "") : null }</h2>
        { this.renderPostContent() }
      </Container>
    );
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
   * Render post content method
   */
  private renderPostContent = () => {
    const { classes, lang } = this.props;
    const { mainContent, sideContent } = this.state;
    this.getPageOrPostContent();
    moment.locale(lang);
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={4} className={classes.grid_item}>
          {mainContent}
        </Grid>
        <Grid item xs={12} sm={12} md={8} className={classes.grid_item}>
          {sideContent}
        </Grid>
      </Grid>
    );
  }

  /**
   * Loads page or post content
   */
  private loadContent = async () => {
    this.setState({
      loading: true
    });

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
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
      api.getWpV2Pages({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getCustomPages({ parent_slug: "posts" }),
      api.getWpV2Pages({ slug: [ "sivut" ] }),
      api.getPostThumbnail({ slug: slug })
    ]);

    const currentPage = apiCalls[0][0];
    const page = apiCalls[0][0];
    const nav = apiCalls[1];
    const pageTitle = apiCalls[2][0].title || apiCalls[3][0].title;
    const pages = apiCalls[4];
    const parentPage = apiCalls[5][0];
    const postThumbnail = apiCalls[6];

    this.setState({
      currentPage: currentPage,
      page: page,
      loading: false,
      nav: nav,
      pageTitle: pageTitle,
      pages: pages,
      parentPage: parentPage,
      postThumbnail: postThumbnail,
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
    const { page } = this.state;
    children.forEach(childPage => {
      const childPages = pages.filter(item => item.post_parent === childPage.ID);
      if (page && (page.id === childPage.ID) && childPage.post_title) {
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
   * Set html source for page content
   */
  private getPageOrPostContent = () => {
    const { page } = this.state;
    const undefinedContentError = <h2 className="error-text">{ strings.somethingWentWrong }</h2>;
    const renderedContent = page && page.content ? page.content.rendered : undefined;
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
   * Redirects to post URL
   * @param post Post
   */
  private onPostClick(page: CustomPage) {
    window.location.href = page.link || "";
  }

  /**
   * Return array of page's child pages
   * @returns Page[]
   */
  private getChildMenuPages = (parentPageId: number) => {
    const { pages, page } = this.state;
    let menuPagesArray: CustomPage[] = new Array();
    if (!pages || !parentPageId) {
      return null;
    } else {
      pages.map(page => {
        if (page.post_parent == parentPageId) {
          menuPagesArray.push(page);
        }
      })
      return menuPagesArray;
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
  }
}

export default withStyles(styles)(PostsPage);
