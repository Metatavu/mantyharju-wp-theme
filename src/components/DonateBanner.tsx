import * as React from "react";
import ApiUtils from "../utils/ApiUtils";
import { Post, Attachment } from "../generated/client/src";
import { WithStyles, withStyles, Typography, Button } from "@material-ui/core";
import styles from "../styles/donate-banner";
import ArrowIcon from "@material-ui/icons/ArrowForwardSharp";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";

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
  loading: boolean
}

/**
 * DonateBanner component
 */
class DonateBanner extends React.Component<Props, State> {

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
    const lang = this.props.lang;
    const api = ApiUtils.getApi();
    const categories = await api.getWpV2Categories({ slug: ["lahjoitus"] });
    const posts = await api.getWpV2Posts({ lang: [ lang ], categories: categories.map((category) => {
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
          this.renderPost()
        }
        <div>
          {
            this.renderArticles()
          }
        </div>
      </div>
    );
  }

  /**
   * Get element css styleclasses
   */
  private getElementClasses = (node: DomElement): string[] => {
    const classString = node.attribs ? node.attribs.class : "";
    if (node.attribs && node.attribs.class) {
      return classString.split(" ");
    }

    return [];
  }

  /**
   * Get link href
   */
  private getLinkHref = (node: DomElement) => {
    return node.attribs && node.attribs.href ? node.attribs.href : "";
  }

  /**
   * Get text content
   */
  private getElementTextContent = (node: DomElement) => {
    return node.children && node.children[0] ? node.children[0].data as string : "";
  }

  /**
   * Render identified buttons into Material UI buttons
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

    return (
      <div key={ post.id } className={ classes.donateContent }>
        <div className={ classes.donateContentBlock }>
          <Typography color="primary" variant="h3"> { post.title ? post.title.rendered : "" } </Typography>
          <div className={ classes.textContainer }>
            {
              ReactHtmlParser(post.content ? post.content.rendered || "" : "", { transform: this.transformContent })
            }
          </div>
        </div>
        <div className={ classes.imageContainer }>
          {
            this.renderImage(featuredMediaUrl)
          }
        </div>
      </div>
    );
  }

  /**
   * Renders post image
   * @param url
   */
  private renderImage(url?: string | null) {
    if (!url) {
      return null;
    }

    return (
      <img src={ url }></img>
    );
  }

  // TODO: render articles related to donations
  /**
   * Render post method
   */
  private renderArticles() {
    return (
      <div></div>
    );
  }
}

export default withStyles(styles)(DonateBanner);