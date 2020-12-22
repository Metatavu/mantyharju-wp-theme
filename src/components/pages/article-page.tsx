import * as React from "react";
import BasicLayout from "../BasicLayout";
import ApiUtils from "../../utils/ApiUtils";
import styles from "../../styles/article-page";
import ReactHtmlParser from "react-html-parser";
import { Post } from "src/generated/client/src";
import strings from "../../localization/strings";
import { withStyles, WithStyles, Typography } from "@material-ui/core";
import ReadSpeaker from "../generic/ReadSpeaker";
import hero from "../../resources/img/mantyharju-images/mantyharju-images/hero-image-mantyharju.jpg";

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
  postThumbnail?: string;
  loading: boolean;
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
      postThumbnail: "",
      loading: true
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
    const { postTitle, postThumbnail } = this.state;

    return (       
      <> 
      { !this.state.loading &&
      <BasicLayout lang={ lang } slug={ slug }>
          <div className={classes.heroImageDiv} style={{ backgroundImage: `url(${postThumbnail ? postThumbnail : hero})` }}>
            <div className={classes.heroContent}>
              <Typography variant="h1" className={classes.heroText}>
                {postTitle}
              </Typography>
            </div>
          </div>
          <div>
            { this.renderContent() }
          </div>
      </BasicLayout>
      }
      </>
    );
  }

  /**
   * Method for loading page content
   */
  private loadContent = async () => {
    this.setState({
      loading: true
    });

    const { lang, slug } = this.props;
    const api = ApiUtils.getApi();

    const apiCalls = await Promise.all([
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ], per_page: 1 }),
      api.getPostThumbnail({ slug: slug })
    ]);

    const post = apiCalls ? apiCalls[0][0] : undefined;
    const postThumbnail = apiCalls[1];
    const postTitle = this.getPostTitle(post);
    const postContent = this.getPostContent(post);

    this.setState({
      post: post,
      postTitle: postTitle,
      postContent: postContent,
      postThumbnail: postThumbnail,
      loading: false
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
            <ReadSpeaker />
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
