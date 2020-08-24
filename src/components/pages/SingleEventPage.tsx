import * as React from 'react';
import ApiUtils from "../../../src/utils/ApiUtils";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { withStyles, WithStyles, Breadcrumbs, Link } from '@material-ui/core';
import styles from '../../styles/single-event-page';
import BasicLayout from '../BasicLayout';
import { DomElement } from "domhandler";
import { Page, Post, MenuLocationData, PostTitle, Attachment } from "../../generated/client/src";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
    slug: string
    lang: string
    mainPageSlug: string
    locationKey?: string
    eventId?: string
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
  media: Attachment[];
  pages: Page[];
  parentPage?: Page;
  fetchedContent?: any;
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
class SingleEventPage extends React.Component<Props, State> {

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
      pages: [],
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.loadContent();
    this.getEventWithId();
  }

  /**
   * Component did update life-cycle handler
   */
  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.slug !== this.props.slug) {
      this.loadContent();
      this.getEventWithId();
    }
  }

  /**
   * Component render
   */
  public render() {
    const { lang, classes } = this.props;
    const { fetchedContent } = this.state;

    return (
      <BasicLayout lang={ lang }>
        <div className={ classes.heroImageDiv }>
          <p className={ classes.heroText }>{ fetchedContent ? fetchedContent.name.fi || "Event" : "Event" }</p>
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
        { this.renderEventContent() }
      </BasicLayout>
    )
  }
  /**
   * Renders single LinkedEvent content content
   */
  private renderEventContent() {
    const { classes, locationKey } = this.props;
    const { fetchedContent } = this.state;
    if (!fetchedContent) {
        return null;
    } else {
        return(
            <div className={ classes.gallery }>
                <div className={ classes.gallery_header }>
                    <h2>{fetchedContent.name.fi}</h2>
                    <div><a>{fetchedContent.start_time}</a></div>
                    <div><a>{fetchedContent.end_time}</a></div>
                    <div><a>{fetchedContent.offers[0].price.fi}</a></div>
                </div>
                <div className={ classes.gallery_image }>
                    <div><img className={ classes.image_styles } src={fetchedContent.images[0].url} alt=""></img></div>
                </div>
                <div className={ classes.gallery_description }>
                    <div><a>{fetchedContent.description.fi}</a></div>
                </div>
            </div> 
        )
    }
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
   * Loads a single LinkedEvent content
   */
  private getEventWithId = async () => {
    const { eventId } = this.props;
    if (!eventId || eventId == null) {
        null;
    } else {
        const response = await fetch('https://mantyharju.linkedevents.fi/v1/event/' + eventId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        if (response.status !== 400) {
            const content = await response.json();
            
            this.setState({
                fetchedContent: content
            });
          }
    }
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
   * transform without changes
   *
   * @param node DomElement
   * @param index DomElement index
   */
  private transform = (node: DomElement, index: number) => {
    return convertNodeToElement(node, index, this.transform);
  }
}

export default withStyles(styles)(SingleEventPage);
