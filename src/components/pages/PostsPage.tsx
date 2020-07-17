import * as React from 'react';
import ApiUtils from "../../../src/utils/ApiUtils";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { withStyles, WithStyles, Breadcrumbs, Link } from '@material-ui/core';
import styles from '../../styles/posts-page';
import BasicLayout from '../BasicLayout';
import { Page, Post, MenuLocationData, PostTitle, Attachment } from 'src/generated/client/src';

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
      secondPageCategoryId: 12,
      limitedPosts: []
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
        <div className={classes.gallery}>
          { this.renderPosts() }
        </div>
      </BasicLayout>
    )
  }

  private renderPosts() {
    const { classes } = this.props;
    const limitedPosts = this.getLimitedPosts(this.state.secondPageCategoryId, 6);
    if (!this.state.limitedPosts) {
      return null;
    } else {
      return (
        this.state.limitedPosts.map(post => {
          return (
            <div>
              <div style={{ backgroundImage: `url(${this.getAttachmentForPost(post)})` }} onClick={() => { this.onPostClick(post) }} className={classes.gallery_img} />
              <h2>{ReactHtmlParser(post.title ? post.title.rendered || "" : "")}</h2>
            </div>
          )
        })
      )
    }
  }

  /**
   * Returns post featured image URL
   */
  private getAttachmentForPost = (post: Post) => {
    var attachmentUrl = "";
    if (this.state.media) {
      this.state.media.map(attachment => {
        if (attachment.id == post.featured_media) {
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
    ]);

    const page = apiCalls[0][0];
    const posts = apiCalls[1];
    const nav = apiCalls[2];
    const pageTitle = apiCalls[3][0].title || apiCalls[4][0].title;
    const pages = apiCalls[5];
    const media = apiCalls[6];

    this.setState({
      page: page,
      posts: posts,
      loading: false,
      nav: nav,
      pageTitle: pageTitle,
      media: media,
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
          { crumb.label }
        </Link>
      );
    });
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
  private onPostClick(post: Post) {
    window.location.href = post.link || "";
  }

  /**
   * Gets limited posts array for post thumbnails
   * 
   * TODO: Decide which is better, passing to State like here OR like in WelcomePage.tsx by comparing all posts with category. Second approach requires some debugging.
   */
  private getLimitedPosts = async (categoryId: number, delimiter: number) => {
    const api = ApiUtils.getApi();
    const postsArray: Post[] = new Array();
    const categoryPosts = await api.getWpV2Posts({ categories: [ categoryId.toString() ] });

    this.setState({
      limitedPosts: categoryPosts.splice(0, delimiter)
    })
  }
}

export default withStyles(styles)(PostsPage);