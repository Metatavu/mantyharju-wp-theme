import * as React from "react";
import BasicLayout from "../BasicLayout";
import ApiUtils from "../../utils/ApiUtils";
import styles from "../../styles/article-page";
import ReactHtmlParser from "react-html-parser";
import { Post } from "src/generated/client/src";
import strings from "../../localization/strings";
import { withStyles, WithStyles, Typography } from "@material-ui/core";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  slug: string;
  lang: string;
}

/**
 * Component state
 */
interface State {
  post?: Post;
  postTitle?: string;
  postContent?: React.ReactElement[];
}

/**
 * A component for displaying articles
 */
class ArticlePage extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.loadContent();
    this.hidePageLoader();
  }

  /**
   * Component render
   */
  public render() {
    const { lang, classes, slug } = this.props;
    const { postTitle } = this.state;

    return (
      <BasicLayout lang={ lang } slug={ slug }>
        <div className={ classes.heroImageDiv }>
          <div className={ classes.heroContent }>
            <Typography variant="h1" className={ classes.heroText }>
              { postTitle }
            </Typography>
          </div>
        </div>
        <div>
          { this.renderContent() }
        </div>
      </BasicLayout>
    );
  }

  /**
   * Method for loading page content
   */
  private loadContent = async () => {
    const { lang, slug } = this.props;
    const api = ApiUtils.getApi();

    const [posts] = await Promise.all([
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ], per_page: 1 })
    ]);

    const post = posts ? posts[0] : undefined;
    const postTitle = this.getPostTitle(post);
    const postContent = this.getPostContent(post);

    this.setState({
      post: post,
      postTitle: postTitle,
      postContent: postContent
    });
  }

  /**
   * Renders content
   */
  private renderContent() {
    const { classes } = this.props;
    const { postContent } = this.state;

    return (
      <React.Fragment>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent } id="readthis">
            <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve">
              <a rel="nofollow" className="rsbtn_play" accessKey="L" title="Kuuntele ReadSpeaker webReaderilla" href={"//app-eu.readspeaker.com/cgi-bin/rsent?customerid=11747&amp;lang=fi_fi&amp;readid=readthis&amp;url="+encodeURIComponent(window.location.href)}>
                  <span className="rsbtn_left rsimg rspart"><span className="rsbtn_text"><span>Kuuntele</span></span></span>
                  <span className="rsbtn_right rsimg rsplay rspart"></span>
              </a>
            </div>
            { postContent }
            <div>
              <Typography variant="button" display="block" gutterBottom>
                <a href="/">Palaa takaisin etusivulle</a>
              </Typography>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  /**
   * Method for getting post title
   *
   * @param post post
   * @returns post title rendered or undefined
   */
  private getPostTitle = (post?: Post): string | undefined => {

    if (!post) {
      return undefined;
    }

    const postTitle = post.title;
    const postTitleRendered = postTitle ? postTitle.rendered : undefined;
    return postTitleRendered;
  }

  /**
   * Method for getting post content
   *
   * @param post post
   * @returns post content jsx
   */
  private getPostContent = (post?: Post): React.ReactElement[] => {

    // Post not found error
    if (!post) {
      return [
        <h2 className="error-text">{ strings.pageNotFound }</h2>
      ];
    }
    
    const postContent = post.content;
    const postContentRendered = postContent ? postContent.rendered || "" : "";

    // No content error
    if (!postContentRendered) {
      return [
        <h2 className="error-text">{ strings.somethingWentWrong }</h2>
      ];
    }

    return ReactHtmlParser(postContentRendered);
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

export default withStyles(styles)(ArticlePage);
