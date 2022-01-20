import * as React from "react";
import { convertNodeToElement } from "react-html-parser";
import { withStyles, WithStyles, Typography, Card, CardContent, CardHeader } from "@material-ui/core";
import styles from "../../styles/single-event-page";
import BasicLayout from "../BasicLayout";
import { DomElement } from "domhandler";
import * as moment from "moment";
import ReadSpeaker from "../generic/ReadSpeaker";
import { Place } from "src/types/Place";

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
  eventPlace?: Place;
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
          <div>
            { this.renderEventContent() }
          </div>
        </div>
      </BasicLayout>
    );
  }

  /**
   * Renders single LinkedEvent content content
   */
  private renderEventContent() {
    const { classes } = this.props;
    const { fetchedContent, eventPlace } = this.state;
    const start_time = fetchedContent ? moment(fetchedContent.start_time).format("DD.MM.YYYY HH:mm") : null;
    const end_time = fetchedContent ? moment(fetchedContent.end_time).format("DD.MM.YYYY HH:mm"): null;
    if (!fetchedContent) {
      return null;
    } else {
      return (
        <div>
          <div className={ classes.event }>
            <ReadSpeaker />
          </div>
          <div className={ classes.event }>
            { this.renderEventPicture() }
            <div className={ classes.eventColumn } id="readthis">
              <Card className={ classes.card }>
                <CardContent>
                  <Typography variant="h3" className={ classes.heroText }>
                    { fetchedContent ? fetchedContent.name.fi || "Event" : "Event" }
                  </Typography>
                  <Typography
                    style={{ whiteSpace: "pre-line" }}
                    dangerouslySetInnerHTML={{
                    __html: fetchedContent.description.fi
                    }}
                  >
                  </Typography>
                  <Typography variant="body2">
                    { fetchedContent.location.id }
                  </Typography>
                </CardContent>
              </Card>
              <Card className={ classes.card }>
                <CardContent>
                  <Typography variant="h6">
                    Tapahtuman tiedot
                  </Typography>
                  { eventPlace &&
                    <Typography variant="body2">
                      Tapahtumapaikka: { eventPlace.name.fi }
                    </Typography>
                  }
                  { start_time &&
                    <Typography variant="body2">
                      Alkaa: { start_time }
                    </Typography>
                  }
                  { end_time &&
                    <Typography variant="body2">
                      Päättyy: { end_time }
                    </Typography>
                  }
                  { fetchedContent.custom_data['provider-fi'] &&
                    <Typography variant="body2">
                      Järjestäjä: { fetchedContent.custom_data['provider-fi'] }
                    </Typography>
                  }
                  { fetchedContent.custom_data['provider-phone'] &&
                    <Typography variant="body2">
                      Puhelinnumero: { fetchedContent.custom_data['provider-phone'] }
                    </Typography>
                  }
                  { fetchedContent.custom_data['provider-email'] &&
                    <Typography variant="body2">
                      Email: { fetchedContent.custom_data['provider-email'] }
                    </Typography>
                  }
                  { fetchedContent.offers[0].price.fi &&
                    <Typography variant="body2" style={{ marginBottom: "1rem" }}>
                      Hintatiedot: { fetchedContent.offers[0].price.fi }
                    </Typography> 
                  }
                  { fetchedContent.offers[0].description &&
                    <Typography variant="body2" style={{ marginBottom: "1rem" }}>
                      Lisätiedot: { fetchedContent.offers[0].description }
                    </Typography>
                  }
                  { fetchedContent.offers[0].info_url &&
                    <Typography variant="body2" style={{ marginBottom: "1rem" }}>
                      Linkki: { fetchedContent.offers[0].info_url }
                    </Typography>
                  }
                  { fetchedContent.custom_data['registration-fi'] || fetchedContent.custom_data['registration_url'] &&
                  <>
                    <hr />
                    <Typography variant="h6">
                      Ilmoittautuminen
                    </Typography>
                  </>
                  }
                  { fetchedContent.custom_data['registration-fi'] &&
                  <Typography variant="body2">
                    { fetchedContent.custom_data['registration-fi'] }
                  </Typography>
                  }
                  { fetchedContent.custom_data['registration_url'] &&
                  <Typography variant="body2">
                    <a href={ fetchedContent.custom_data['registration_url'] }>{ fetchedContent.custom_data['registration_url'] }</a>
                  </Typography>
                  }
                </CardContent>
              </Card>
            </div>
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
      null;
    } else {
      try {
        const response = await fetch("https://mantyharju.linkedevents.fi/v1/event/" + eventId, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const content = await response.json();
        const placeResponse = await fetch(content.location["@id"].replace(/^http:\/\//i, 'https://'));        
        const place: Place = await placeResponse.json();

        this.setState({
          fetchedContent: content,
          eventPlace: place
        });
      } catch (error) {
        console.error(error);
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