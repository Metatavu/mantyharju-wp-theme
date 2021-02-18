import * as React from "react";
import { withStyles, WithStyles, Typography, Card, CardContent } from "@material-ui/core";
import styles from "../../styles/jobs";
import BasicLayout from "../BasicLayout";
import ApiUtils from "../../utils/ApiUtils";
import ReactHtmlParser from "react-html-parser";

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
  jobs: string[];
}

/**
 * A component for displaying all jobs
 */
class Jobs extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.hidePageLoader();
    this.fetchJobs();
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
              Työpaikat
            </Typography>
          </div>
        </div>
        <div className={ classes.cards }>
          { this.renderContent() }
        </div>
      </BasicLayout>
    );
  }

  /**
   * Method for fetching jobs
   */
  private fetchJobs = () => {
    const api = ApiUtils.getApi();
    api.getWpV2Posts({ slug: [ "jobs" ], per_page: 1 }).then((postArray) => {
      const post = postArray.length ? postArray[0] : undefined;
      if (post) {
        const postContent = post.content ? post.content.rendered : undefined;
        if (postContent) {
          const jobs = this.parseJobs(postContent);
          this.setState({
            jobs: jobs
          });
        }
      }
    });
  }

  /**
   * Renders content
   */
  private renderContent() {
    const { classes } = this.props;
    const { jobs } = this.state;

    if (!jobs) {
      return null;
    }

    return jobs.map((job: string) => (
      <Card className={ classes.card }>
        <CardContent>
          { ReactHtmlParser(job) }
        </CardContent>
      </Card>
    ));
  }

  /**
   * Method for parsing jobs
   *
   * @param postContent post content
   * @returns string array
   */
  private parseJobs = (postContent: string): string[] => {
    const postContentWithoutLinebreaks = postContent.replace(/\n/g, '<br>');
    const matches = postContentWithoutLinebreaks.match(/<article.*?>.*?<\/article>/g); // Matches <article> tags and their content
    if (matches) {
      const jobs = matches.map(match => match);
      return jobs;
    }
    return [];
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

export default withStyles(styles)(Jobs);