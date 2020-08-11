import * as React from 'react';
import ApiUtils from "../../../src/utils/ApiUtils";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { withStyles, WithStyles, Breadcrumbs, Link } from '@material-ui/core';
import styles from '../../styles/posts-page';
import BasicLayout from '../BasicLayout';
import { DomElement } from "domhandler";
import { Page, Post, MenuLocationData, PostTitle, Attachment } from 'src/generated/client/src';
import strings from "../../localization/strings";
import * as moment from "moment";

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
  page?: Page;
  posts: Post[];
  loading: boolean;
  nav?: MenuLocationData;
  breadcrumb: Breadcrumb[];
  pageTitle?: PostTitle;
  title: string;
  secondPageCategoryId: number;
  media: Attachment[];
  limitedPosts: Post[];
  pages: Page[];
  parentPage?: Page;
  mainContent?: React.ReactElement;
  sideContent?: React.ReactElement;
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
      posts: [],
      media:[],
      loading: false,
      breadcrumb: [],
      title: "",
      secondPageCategoryId: 6,
      limitedPosts: [],
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
   * Component render
   */
  public render() {
    const { lang, classes } = this.props;

    return (
      <BasicLayout lang={ lang }>
        <div className={ classes.heroImageDiv }>
          <p className={ classes.heroText }>Asiointi ja päätöksenteko</p>
        </div>
        <div className={ classes.breadcrumb }>
            <Breadcrumbs separator=">">
                <Link color="inherit" href="/" onClick={() => {}}>
                    Etusivu
                </Link>
                { this.state.breadcrumb && this.renderBreadcrumb() }
            </Breadcrumbs>
            <p className={ classes.dividerLine }><hr></hr></p>
        </div>
        <div>
          { this.renderPostContent() }
        </div>
        <div className={classes.gallery}>
          { this.renderPosts() }
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
      displayPages = displayPages.length > 6 ? displayPages.splice(0, 6) : displayPages;
      return (
        displayPages.map(page => {
          return (
            <div>
              <div style={{ backgroundImage: `url(${this.getAttachmentForPost(page)})` }} onClick={() => { this.onPostClick(page) }} className={classes.gallery_img} />
              <h2>{ReactHtmlParser(page.title ? page.title.rendered || "" : "")}</h2>
            </div>
          )
        })
      )
    }
  }

  /**
   * Render post content method
   */
  private renderPostContent = () => {
    const { classes, lang } = this.props;
    const { mainContent, sideContent } = this.state;
    const content = this.getPageOrPostContent();
    moment.locale(lang);
    return (
      <div className={classes.topPageContent}>
        <div>
          <h2>{mainContent}</h2>
        </div>
        <div>
          {sideContent}
        </div>
      </div>
    );
  }

  /**
   * Returns post featured image URL
   */
  private getAttachmentForPost = (page: Page) => {
    var attachmentUrl = "";
    if (this.state.media) {
      this.state.media.map(attachment => {
        if (attachment.id == page.featured_media) {
          attachmentUrl = attachment.source_url || "";
        }
      })
    }
    
    return attachmentUrl;
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
      api.getWpV2Posts({ lang: [ lang ] }),
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
      api.getWpV2Pages({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getWpV2Pages({ per_page: 100 }),
      api.getWpV2Media({}),
      api.getWpV2Pages({ slug: [ "sivut" ] }),
    ]);

    const page = apiCalls[0][0];
    const posts = apiCalls[1];
    const nav = apiCalls[2];
    const pageTitle = apiCalls[3][0].title || apiCalls[4][0].title;
    const pages = apiCalls[5];
    const media = apiCalls[6];
    const parentPage = apiCalls[7][0];

    this.setState({
      page: page,
      posts: posts,
      loading: false,
      nav: nav,
      pageTitle: pageTitle,
      media: media,
      pages: pages,
      parentPage: parentPage,
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
    const { page } = this.state;
    children.forEach(childPage => {
      const childPages = pages.filter(item => item.parent === childPage.id);     
      if (page && (page.id === childPage.id) && childPage.title) {
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
   * Renders breadcrumb
   */
  private renderBreadcrumb = () => {
    const { classes } = this.props;
    const { breadcrumb } = this.state;
    return breadcrumb.map((crumb) => {
      return (
        <Link className={ classes.currentPageLink } href={ crumb.link } onClick={() => {}}>
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
  private onPostClick(page: Page) {
    window.location.href = page.link || "";
  }

  /**
   * Return array of page's child pages
   * @returns Page[]
   */
  private getChildMenuPages = (parentPageId: number) => {
    const { pages, page } = this.state;
    let menuPagesArray: Page[] = new Array();
    if (!pages || !parentPageId) {
      return null;
    } else {
      pages.map(page => {
        if (page.parent == parentPageId) {
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
