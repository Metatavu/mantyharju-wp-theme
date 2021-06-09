import * as React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Link, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/movies";
import BasicLayout from "../BasicLayout";
import ReactHtmlParser from "react-html-parser";
import { Movie } from "src/generated/client/src/models";
import strings from "../../localization/strings";
import CloseIcon from '@material-ui/icons/Close';

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
  movies: Movie[];
  openDescriptions: Boolean[]
  videoOpen: boolean;
  videoUrl?: string;
}

/**
 * Inteface for storing showtime date and unix 
 */
interface CustomDate {
  datetime?: Date;
  unix?: number;
}

/**
 * A component for displaying all jobs
 */
class Movies extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      movies: [],
      openDescriptions: [],
      videoOpen: false
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
      <>
      { this.renderVideoDialog() }
      <BasicLayout lang={ lang } slug={ slug }>
        <div className={ classes.heroImageDiv }>
          <div className={ classes.heroContent }>
            <Typography variant="h1" className={ classes.heroText }>
              { strings.movie.movies }
            </Typography>
          </div>
        </div>
        <div className={ classes.container } >
          <div className={ classes.grid }>
            { this.renderMovieCards() }
          </div>
        </div>
      </BasicLayout>
      </>
    );
  }

  /**
   * Method for fetching jobs
   */
  private fetchJobs = async () => {
    const response = await fetch("https://mntyharju.local/wp-json/wp/v2/mantyharju-elokuva");
    const movies = await response.json();
    this.setState({
      movies: movies
    })

    this.initDescriptionState();
  }

  /**
   * Toggle video dialog event handler
   * 
   * @param index index of clicked item
   */
  private toggleVideoDialog = (trailerUrl?: string) => {
    this.setState({
      videoOpen: !this.state.videoOpen,
      videoUrl: trailerUrl ?? undefined
    });
  }

  /**
   * Handles open description
   * 
   * @param index index of clicked item
   */
  private onDescriptionClick = (index: number) => {
    const { openDescriptions } = this.state;

    openDescriptions[index] = !openDescriptions[index]

    this.setState({
      openDescriptions: openDescriptions
    })
  }

  /**
   * Inits state of show description
   */
  private initDescriptionState = () => {
    const { movies } = this.state;

    const emptyState: Boolean[] = [];

    movies.map(movie => {
      emptyState.push(false)
    })

    this.setState({
      openDescriptions: emptyState
    })
  }

  /**
   * Format url for embedding the video
   * TODO: Add other sites alongside youtube, if requested
   * 
   * @param trailerUrl trailer url
   * @returns embed url
   */
  private formatUrl = (trailerUrl: string): string => {
    if (/youtu\.be/.test(trailerUrl) || /youtube/.test(trailerUrl)) {
      const baseUrl = "https://www.youtube-nocookie.com/embed/";
      if (/youtu\.be/.test(trailerUrl)) {
        return `${baseUrl}${trailerUrl.split("/")[ trailerUrl.split("/").length-1 ]}`;
      }
      if(/watch/.test(trailerUrl)) {
        return `${baseUrl}${trailerUrl.split("/")[ trailerUrl.split("/").length-1 ].replace("watch?v=", "")}`;
      }
      return trailerUrl;
    }
    return trailerUrl;
  }

  /**
   * Method for rendering event cards
   */
  private renderMovieCards = () => {
    const { classes } = this.props;
    const { movies, openDescriptions } = this.state;
    const dateNow = parseInt((new Date().getTime()/1000).toFixed(0));

    return movies.map((movie: Movie, index: number) => {

      const showTimes: CustomDate[] = movie.ACF.showtimes ? movie.ACF.showtimes.map(showTime => {
        if (showTime?.datetime) {
          const dayTime = showTime.datetime.toString().split(" ");
          const [ yy, MM ,dd ] = dayTime[0].split("-");
          const [ hh, mm ] = dayTime[1].split(":");
          const unix = parseInt(((new Date(`${yy}-${MM}-${dd}T${hh}:${mm}:00`).getTime())/1000).toFixed(0));
          return {
            datetime: showTime.datetime,
            unix: unix
          }
        }
        return {
          datetime: undefined,
          unix: undefined
        };
      }) : [];
      
      let datesInFuture = false;
      for (const date of showTimes) {
        if (!date.unix || date.unix >= dateNow) {
          datesInFuture = true;
        }
      }
      if (showTimes.length === 0 || datesInFuture) {
        return (
          <Card
            key={ index }
            className={ classes.card }
          >
            <CardContent>
              { this.renderCardContent(movie, index, showTimes, dateNow) }
            </CardContent>
          </Card>
        );
      }
      return null;
    });
  }

  /**
   * Renders card content
   * 
   * @param movie movie
   * @param index index
   * @param showTimes array of showtimes
   * @param dateNow date now in unix
   */
  private renderCardContent = (movie: Movie, index: number, showTimes: CustomDate[], dateNow: number) => {
    const { classes } = this.props;
    const { openDescriptions } = this.state;
    const title = ReactHtmlParser(movie.title.rendered);
    const content = ReactHtmlParser(movie.content.rendered);
    const ticketPrice = movie.ACF.ticketprice;
    const ageLimit = movie.ACF.agelimit;
    const category = movie.ACF.classification
    const runTime = movie.ACF.runtime;

    return (
      <>
        <Typography gutterBottom variant="h5">
          { title }
        </Typography>
        <Typography >
          { ageLimit }
        </Typography>
        { runTime &&
          <Typography >
            <b>{ strings.movie.duration}</b> { runTime }
          </Typography>
        }
        { category &&
          <Typography >
            <b>{ strings.movie.category}</b> { category }
          </Typography>
        }
        { ticketPrice &&
          <Typography >
            <b>{ strings.movie.price}</b> { ticketPrice }
          </Typography>
        }
        { openDescriptions[index] &&
          <Typography >
            { content }
          </Typography>
        }
        <Typography >
        <b>{ strings.movie.showTimes }</b>
        </Typography>
        { (showTimes && showTimes.length !== 0) && 
          showTimes.filter(item =>
            item.datetime && item.datetime.toString() !== "0" && item.unix && item.unix !== 0 && item.unix >= dateNow)
            .map(showTime =>
              <Typography>
                { showTime.datetime }
              </Typography>
            )
        }
        { !showTimes.length &&
          <Typography>
          { strings.movie.noReleaseDate }
          </Typography>
        }
        <Typography >
        <Button className={ classes.button } onClick={ () => this.onDescriptionClick(index)} >
          { strings.movie.showDescription }
        </Button>
        <Button className={ classes.button } onClick={ () => this.toggleVideoDialog(movie.ACF.trailerurl)} >
          { strings.movie.watchTrailer }
        </Button>
        <Link href={ movie.ACF.ticketsalesurl } target="_blank">
          <Button className={ classes.button }>
          { strings.movie.buyTickets }
          </Button>
        </Link>
        </Typography>
      </>
    );
  }

  /**
   * Renders video dialog
   */
  private renderVideoDialog = () => {
    const { classes } = this.props;
    const { videoOpen, videoUrl } = this.state;

    return (
      <Dialog
        open={ videoOpen }
        onClose={ () => this.toggleVideoDialog() }
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle
          disableTypography
          id="dialog-title"
        >
          <Box display="flex" justifyContent="space-between">
            <Box/>
            <IconButton
              size="small"
              onClick={ () => this.toggleVideoDialog() }
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <iframe
            className={ classes.iFrame }
            src={ videoUrl ? this.formatUrl(videoUrl) : "#" }
            allowFullScreen>
          </iframe>
        </DialogContent>
      </Dialog>
    );
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

export default withStyles(styles)(Movies);