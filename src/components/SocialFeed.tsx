import * as React from "react";
import ApiUtils from "../utils/ApiUtils";
import { Post } from "../generated/client/src";
import { WithStyles, withStyles } from "@material-ui/core";
import styles from "../styles/social-feed";
import ReactHtmlParser from "react-html-parser";
import { DomElement } from "domhandler";
import Masonry from "react-masonry-css";
import "../styles/feed.css";

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
  loading: boolean
}

/**
 * SocialFeed component
 */
class SocialFeed extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
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
    const categories = await api.getWpV2Categories({ slug: ["some"] });
    const posts = await api.getWpV2Posts({ lang: [ lang ], categories: categories.map((category) => {
      return String(category.id);
    })});

    this.setState({
      posts: posts,
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
   * Render post method
   */
  private renderPost() {
    const { classes } = this.props;
    if (!this.state.posts.length) {
      return null;
    }

    const post = this.state.posts[0];

    const items = ReactHtmlParser(post.content ? post.content.rendered || "" : "", { preprocessNodes: this.preprocessNodes });

    // Responsive column amount
    const breakpointColumnsObj = {
      default: 5,
      1600: 4,
      1440: 3,
      800: 2,
      600: 1
    };

    return (
      <div key={ post.id } className={ classes.content }>
        <Masonry id="cff" breakpointCols={ breakpointColumnsObj } className="masonry-grid" columnClassName="masonry-grid_column">
          { items }
        </Masonry>
      </div>
    );
  }

  /**
   * Preprosessor for ReactHtmlParser that flatlists cff-items recursively from DOM tree
   *
   * @param nodes original nodes
   * @returns flatlisted nodes
   */
  private preprocessNodes = (nodes: DomElement[]) => {
    let result: DomElement[] = [];

    for (let i = 0; i < nodes.length; i++) {
      result = result.concat(this.getNodeItems(nodes[i]));
    }

    return result;
  }

  /**
   * Recursively finds all cff-items child nodes within DOM tree
   *
   * @param node parent node
   * @returns flatlisted nodes
   */
  private getNodeItems = (node: DomElement): DomElement[] => {
    const allChildren = node.children || [];

    const children = allChildren.filter((child: DomElement) => {
      const classNames = this.getElementClasses(child);
      return classNames.indexOf("cff-item") > -1;
    });

    if (children.length > 0) {
      return children;
    } else {
      let result: DomElement[] = [];

      for (let i = 0; i < allChildren.length; i++) {
        result = result.concat(this.getNodeItems(allChildren[i]));
      }

      return result;
    }
  }
}

export default withStyles(styles)(SocialFeed);