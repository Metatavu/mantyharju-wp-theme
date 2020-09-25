import * as React from "react";
import { convertNodeToElement } from "react-html-parser";
import { withStyles, WithStyles, Typography } from "@material-ui/core";
import styles from "../../styles/single-event-page";
import BasicLayout from "../BasicLayout";
import { DomElement } from "domhandler";
import * as moment from "moment";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
    slug: string;
    lang: string;
    mainPageSlug: string;
    locationKey?: string;
    eventId?: string;
}

/**
 * Component state
 */
interface State {
  fetchedContent?: any;
}

/**
 * A component for single Linked Event page
 */
class SingleEventPage extends React.Component<Props, State> {

  /**
   * Constructor
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
    this.getEventWithId();
    this.hidePageLoader();
  }

  /**
   * Component render
   */
  public render() {
    const { lang, classes, slug } = this.props;
    const { fetchedContent } = this.state;

    return (
      <BasicLayout lang={ lang } slug={ slug }>
        <div id="readthis">
          <div className={ classes.heroImageDiv }>
            <div className={ classes.heroContent }>
              <Typography variant="h1" className={ classes.heroText }>{ fetchedContent ? fetchedContent.name.fi || "Event" : "Event" }</Typography>
              <Typography variant="h2">
                { fetchedContent ? moment(fetchedContent.start_time).format("DD.MM.YYYY HH:mm") : "" } - { fetchedContent ? moment(fetchedContent.end_time).format("DD.MM.YYYY HH:mm") : "" }
              </Typography>
            </div>
          </div>
          { this.renderEventContent() }
        </div>
      </BasicLayout>
    );
  }

  /**
   * Renders single LinkedEvent content content
   */
  private renderEventContent() {
    const { classes } = this.props;
    const { fetchedContent } = this.state;
    if (!fetchedContent) {
      return null;
    } else {
      return (
        <div className={ classes.event }>
          <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve">
            <a rel="nofollow" className="rsbtn_play" accessKey="L" title="Kuuntele ReadSpeaker webReaderilla" href={"//app-eu.readspeaker.com/cgi-bin/rsent?customerid=11747&amp;lang=fi_fi&amp;readid=readthis&amp;url="+encodeURIComponent(window.location.href)}>
                <span className="rsbtn_left rsimg rspart"><span className="rsbtn_text"><span>Kuuntele</span></span></span>
                <span className="rsbtn_right rsimg rsplay rspart"></span>
            </a>
          </div>
          { this.renderEventPicture() }
          <div className={ classes.eventColumn }>
            { fetchedContent.offers[0].price.fi &&
              <Typography variant="h6" style={{ marginBottom: "1rem" }}> { fetchedContent.offers[0].price.fi }</Typography>
            }
            <Typography variant="body2">{ fetchedContent.description.fi }</Typography>
          </div>
        </div>
      );
    }
  }

  /**
   * Renders single LinkedEvent content content
   */
  private renderEventPicture() {
    const { classes } = this.props;
    const { fetchedContent } = this.state;
    if (!fetchedContent.images[0]) {
      return null;
    } else {
      return (
        <div className={ `${ classes.eventColumn } ${classes.eventLeftColumn}` }>
          <img className={ classes.image_styles } src={ fetchedContent.images[0].url } alt=""></img>
        </div>
      );
    }
  }

  /**
   * Loads a single LinkedEvent content
   */
  private getEventWithId = async () => {
    const { eventId } = this.props;
    if (!eventId || eventId == null) {
      console.log("Event id is: ", eventId);
      null;
    } else {
      console.log("Event id is: ", eventId);
      const response = await fetch("https://mantyharju.linkedevents.fi/v1/event/" + eventId, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
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