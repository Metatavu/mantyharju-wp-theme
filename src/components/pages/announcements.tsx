import * as React from "react";
import { withStyles, WithStyles, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@material-ui/core";
import styles from "../../styles/announcements";
import BasicLayout from "../BasicLayout";
import ApiUtils from "../../utils/ApiUtils";
import { CustomPost } from "src/generated/client/src";
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
  announcements: CustomPost[];
}

/**
 * A component for displaying all announcements
 */
class Announcements extends React.Component<Props, State> {

  /**
   * Constructor
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      announcements: []
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.hidePageLoader();
    this.fetchAnnouncements();
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
              Kuulutukset
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
   * Method for fetching announcements
   */
  private fetchAnnouncements = () => {
    const api = ApiUtils.getApi();
    api.getCustomPosts({ category: "announcement" }).then((announcements: CustomPost[]) => {
      this.setState({
        announcements: announcements
      });
    });
  }

  /**
   * Renders content
   */
  private renderContent() {
    const { classes } = this.props;
    const { announcements } = this.state;

    if (!announcements) {
      return null;
    }

    return announcements.map((announcement: CustomPost) => (
      <Card className={ classes.card }>
        <CardMedia
          image={ announcement.featured_image_url }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { announcement.post_title }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { ReactHtmlParser(this.getFirstParagraph(announcement.post_content)) }
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            className={ classes.button }
            onClick={ () => { window.location.href = announcement.link || window.location.href } }
          >
            Lue lisää
          </Button>
        </CardActions>
      </Card>
    ));
  }

  /**
   * Method for getting first paragraph
   *
   * @param content string
   * @returns string
   */
  private getFirstParagraph = (content?: string): string => {
    if (content) {
      const match = content.match(/<p.*?>.*?<\/p>/g);
      if (match) {
        const paragraph = match[0];
        return paragraph;
      }
    }
    return "";
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

export default withStyles(styles)(Announcements);