import * as React from "react";
import { withStyles, WithStyles, Typography } from "@material-ui/core";
import styles from "../../styles/article-page";
import BasicLayout from "../BasicLayout";
import ApiUtils from "../../utils/ApiUtils";
import ReactHtmlParser from "react-html-parser";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
    slug: string
    lang: string
}

/**
 * Component state
 */
interface State {
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
    this.hidePageLoader();
  }

  /**
   * Component render
   */
  public render() {
    const { lang, classes, slug } = this.props;

    return (
      <BasicLayout lang={ lang } slug={ slug }>
        <div className={ classes.heroImageDiv }>
          <div className={ classes.heroContent }>
            <Typography variant="h1" className={ classes.heroText }>
              Title
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
   * Renders content
   */
  private renderContent() {
    const { classes } = this.props;

    return <div>hello world</div>;
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