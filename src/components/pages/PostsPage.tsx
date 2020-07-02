import * as React from 'react';
import ApiUtils from "../../../src/utils/ApiUtils";
import socialIg from "../../resources/img/ig-logo.png";
import socialFb from "../../resources/img/fb-logo.png";
import { withStyles, WithStyles, Breadcrumbs, Link } from '@material-ui/core';
import styles from '../../styles/posts-page';
import BasicLayout from '../BasicLayout';
import { Page, Post, MenuLocationData, PostTitle } from 'src/generated/client/src';

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
  post?: Post;
  loading: boolean;
  isArticle: boolean;
  heroBanner?: React.ReactElement;
  heroContent?: React.ReactElement;
  nav?: MenuLocationData;
  breadcrumb: Breadcrumb[];
  pageTitle?: PostTitle;
  title: string;
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
      isArticle: false,
      loading: false,
      breadcrumb: [],
      title: ""
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
      </BasicLayout>
    )
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
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] }),
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
      api.getWpV2Pages({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getWpV2Pages({ per_page: 100 })
    ]);

    const page = apiCalls[0][0];
    const post = apiCalls[1][0];
    const nav = apiCalls[2];
    const pageTitle = apiCalls[3][0].title || apiCalls[4][0].title;
    const pages = apiCalls[5];

    this.setState({
      page: page,
      post: post,
      isArticle: !!post,
      loading: false,
      nav: nav,
      pageTitle: pageTitle
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

}

export default withStyles(styles)(PostsPage);