import * as React from "react";
import { Typography, WithStyles, withStyles, Button } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import { Post, Attachment } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import placeholderImg from "../resources/img/muisti-konsepti.png";
import styles from "../styles/hero-banner";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";
import MetaTags from "react-meta-tags";

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
  featuredMedias: { [ key: number ]: Attachment },
  heroBanner?: React.ReactElement,
  heroContent?: React.ReactElement,
  loading: boolean,
  ogImageSrc?: string
}

/**
 * HeroBanner component
 */
class HeroBanner extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      featuredMedias: { },
      loading: false
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    this.setState({
      loading: true
    });

    const api = ApiUtils.getApi();
    const categories = await api.getWpV2Categories({ slug: ["hero"] });
    const posts = await api.getWpV2Posts({ lang: [ this.props.lang ], categories: categories.map((category) => {
      return String(category.id);
    })});

    const featureMediaIds: number[] = posts
      .filter((post) => {
        return post.featured_media;
      })
      .map((post) => {
        return post.featured_media;
      })
      .reduce((unique: any, item: any) => unique.includes(item) ? unique : [...unique, item], []);

    const featureMedias = await Promise.all(featureMediaIds.map((featureMediaId) => {
      return api.getWpV2MediaById({ id: featureMediaId.toString() });
    }));

    const featuredMediaMap: { [ key: number ]: Attachment } = { };

    for (let i = 0; i < featureMedias.length; i++) {
      const featureMedia = featureMedias[i];
      featuredMediaMap[featureMedia.id!] = featureMedia;
    }

    ReactHtmlParser(posts[0].content ? posts[0].content.rendered || "" : "", { transform: this.ExtractHero });

    this.setState({
      posts: posts,
      featuredMedias: featuredMediaMap,
      loading: false
    });
  }

  /**
   * Component render method
   */
  public render() {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        {
          this.renderMetatags()
        }
        {
          this.renderPost()
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
   * Transform html source link element into Material UI button
   */
  private transformContent = (node: DomElement, index: number) => {
    const { classes } = this.props;
    const classNames = this.getElementClasses(node);
    if (classNames.indexOf("wp-block-button") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return (
          <a style={{ textDecoration: "none" }} href={this.getLinkHref(childNode)}>
            <Button className={ classes.button } color="primary" variant="outlined" endIcon={ <ArrowIcon /> }>
              {this.getElementTextContent(childNode)}
            </Button>
          </a>
        );
      }
    }
    return convertNodeToElement(node, index, this.transformContent);
  }

  /**
   * Extract Hero banner
   */
  private ExtractHero = (node: DomElement, index: number) => {
    const classNames = this.getElementClasses(node);
    if (classNames.indexOf("hero") > -1) {
      if (!this.state.heroBanner) {
        this.setState({
          heroBanner: convertNodeToElement(node, index, this.transformContent)
        });
      }
    }
    if (classNames.indexOf("hero-content") > -1) {
      if (!this.state.heroContent) {
        this.setState({
          heroContent: convertNodeToElement(node, index, this.transformContent)
        });
      }
    }
    return null;
  }

  /**
   * Renders og:image metatag for fb link sharing thumbnail
   */
  private renderMetatags = () => {
    return (
      <MetaTags>
        <meta property="og:image" content={ placeholderImg } />
      </MetaTags>
    );
  }

  /**
   * Render post method
   */
  private renderPost() {
    const { classes } = this.props;
    if (!this.state.posts.length) {
      return null;
    }
    const post = this.state.posts[0];
    const featuredMedia = post.featured_media ? this.state.featuredMedias[post.featured_media] : null;
    const featuredMediaUrl = featuredMedia ? featuredMedia.source_url : null;
    let heroBannerBackround = `url(${placeholderImg})`;
    if (featuredMediaUrl) {
      heroBannerBackround = `url(${featuredMediaUrl})`;
    }
    return (
      <>
        { !this.state.heroBanner &&
          <div
            key={ post.id }
            className={ classes.heroItem }
            style={{ backgroundImage: heroBannerBackround }}>
            <div className={ classes.heroContent }>
              <div className={ classes.heroContentBlock }>
                <Typography color="primary" variant="h1"> { post.title ? post.title.rendered : "" } </Typography>
                <div className={ classes.heroText }>
                  { ReactHtmlParser(post.content ? post.content.rendered || "" : "", { transform: this.transformContent }) }
                </div>
              </div>
            </div>
          </div>
        }
        { this.state.heroBanner &&
          <div className={ classes.hero }>
            <div className={ classes.heroContentContainer }>
                <h1 className={ classes.heroTitle }>{ post.title ? post.title.rendered : "" }</h1>
                { ReactHtmlParser(post.content ? post.content.rendered || "" : "", { transform: this.transformContent }) }
            </div>
            { this.state.heroBanner }
          </div>
        }
      </>
    );
  }
}

export default withStyles(styles)(HeroBanner);