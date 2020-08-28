import * as React from 'react';
import { convertNodeToElement } from "react-html-parser";
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '../../styles/single-event-page';
import BasicLayout from '../BasicLayout';
import { DomElement } from "domhandler";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
    slug: string
    lang: string
    mainPageSlug: string
    locationKey?: string
    eventId?: string
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
        <div className={ classes.heroImageDiv }>
          <p className={ classes.heroText }>{ fetchedContent ? fetchedContent.name.fi || "Event" : "Event" }</p>
        </div>
        <p className={ classes.dividerLine }>
          <hr>
          </hr>
        </p>
        { this.renderEventContent() }
      </BasicLayout>
    )
  }

  /**
   * Renders single LinkedEvent content content
   */
  private renderEventContent() {
    const { classes, locationKey } = this.props;
    const { fetchedContent } = this.state;
    if (!fetchedContent) {
        return null;
    } else {
        return(
            <div className={ classes.gallery }>
                <div className={ classes.gallery_header }>
                    <h2>{fetchedContent.name.fi}</h2>
                    <div><a>{fetchedContent.start_time}</a></div>
                    <div><a>{fetchedContent.end_time}</a></div>
                    <div><a>{fetchedContent.offers[0].price.fi}</a></div>
                </div>
                <div className={ classes.gallery_image }>
                    { this.renderEventPicture() }
                </div>
                <div className={ classes.gallery_description }>
                    <div><a>{fetchedContent.description.fi}</a></div>
                </div>
            </div> 
        )
    }
  }

  /**
   * Renders single LinkedEvent content content
   */
  private renderEventPicture() {
    const { classes, locationKey } = this.props;
    const { fetchedContent } = this.state;
    if (!fetchedContent.images[0]) {
        return null;
    } else {
        return(
          <div>
            <img className={ classes.image_styles } src={ fetchedContent.images[0].url } alt=""></img>
          </div>
        )
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
        const response = await fetch('https://mantyharju.linkedevents.fi/v1/event/' + eventId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'GET',
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