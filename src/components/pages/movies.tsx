import * as React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, IconButton, Link, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/movies";
import BasicLayout from "../BasicLayout";
import ReactHtmlParser from "react-html-parser";
import { Movie, MovieACFShowtimes } from "src/generated/client/src/models";
import strings from "../../localization/strings";
import CloseIcon from '@material-ui/icons/Close';
import Masonry from 'react-masonry-css'
import moment from "moment";
import TreeView from "../generic/TreeView";

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
  categories: any;
  openDescriptions: Boolean[]
  videoOpen: boolean;
  videoUrl?: string;
  pageOpen: string;
  movieMedia: any;
}

/**
 * A component for displaying movies
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
      videoOpen: false,
      pageOpen: "kino",
      categories: [],
      movieMedia: []
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.hidePageLoader();
    this.fetchData();
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
        <Grid item xs={12} md={3} lg={2} key={"123"}>
          <div className="rs_skip">
            <TreeView slug={ slug }/>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={12} key={"456"}>
          <div className={ classes.kinoInformation }>
            <Masonry
              breakpointCols={5}
              className={ classes.masornyGrid }
              columnClassName={ classes.masornyColumn }
            >
              { this.renderMovieCards() }
            </Masonry>
          </div>
        </Grid>
        </div>
      </BasicLayout>
      </>
    );
  }

  /**
   * Method for fetching jobs
   */
  private fetchData = async () => {
    try {
      const movieResponse = await fetch("/wp-json/wp/v2/mantyharju-elokuva");
      const categoryResponse = await fetch("/wp-json/wp/v2/mantyharju-elokuva-categories")
      const movieMediaResponse = await fetch("/wp-json/wp/v2/media")

      const categories = await categoryResponse.json();
      const movies = await movieResponse.json();
      const movieMedia = await movieMediaResponse.json();

      this.setState({
        movies,
        categories,
        movieMedia
      })
    } catch(error) {
      console.error(error)
    }

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
   * Gets next showtime of a movie
   */
  private getNextShowTime = (showTimes: MovieACFShowtimes[]) => {

    var min = Math.min.apply(null, showTimes.map(function(a){ return new Date(a.datetime).getTime() }));
    const nextShowTime = showTimes.filter(showTime => new Date(showTime.datetime).getTime() === min);

    return nextShowTime;
    }

  /**
  * 
  * @param movie movie whitch showtimes are filtered
  * @returns filtered showtimes
 */
  private filterShowTimes = (movie: Movie) => {
    const dateNow = new Date().getTime();

    if (!movie.ACF.showtimes) {
      return;
    }

    const hasOngoingMovies = movie.ACF.showtimes.some(showTime => {
      return new Date(showTime.datetime).getTime() <= dateNow
    })

    for (const showTime of movie.ACF.showtimes) {
      if (new Date(showTime.datetime).getTime() > dateNow && !hasOngoingMovies) {
        return undefined;
      }
    }

    const filteredShowTimes: MovieACFShowtimes[] = []

    movie.ACF.showtimes.forEach(showTime => {
      if (showTime.datetime) {
        if (new Date(showTime.datetime).getTime() > dateNow) {
          filteredShowTimes.push(showTime)
        }
      }
    })
    return filteredShowTimes;
  }

  private getImageUrl = (movie: Movie) => {
    const { movieMedia } = this.state;

    console.log(movieMedia)

    if (!movie.featured_media || !movieMedia) {
      return undefined;
    }

    return undefined;
    
    // const foundMedia = movieMedia.filter((media: any) => media.id === movie.featured_media)

    // return foundMedia.guid.rendered;
  }

  /**
   * Parses date to string
   */
  private parseDate = (showTime: Date) => {
    const datee = moment(showTime)
    const dateName = datee.locale('fi').format('dd');
    const day = datee.format('DD')
    const month = datee.format('MM')
    const hoursMins = datee.format('HH:mm')

    const dateString = `${dateName} ${day}.${month}. klo: ${hoursMins}`;
    return dateString;
  }


  /**
   * Method for rendering event cards
   */
  private renderMovieCards = () => {
    const { classes } = this.props;
    const { movies } = this.state;

    return movies.map((movie: Movie, index: number) => {
      const showTimes = this.filterShowTimes(movie);

        return (
          (showTimes && showTimes.length !== 0) ?
              <Card
                key={ index }
                className={ classes.card }
              >
                <CardContent>
                  { this.renderCardContent(movie, index, showTimes) }
                </CardContent>
              </Card>
            : null
          );
    });
  }

  /**
   * Renders card content
   * 
   * @param movie movie
   * @param index index
   * @param showTimes array of showtimes
   * @param showTimes show times of movie
   */
  private renderCardContent = (movie: Movie, index: number, showTimes: MovieACFShowtimes[]) => {
    const { classes } = this.props;
    const { openDescriptions } = this.state;
    const title = ReactHtmlParser(movie.title.rendered);
    const content = ReactHtmlParser(movie.content.rendered);
    const ticketPrice = movie.ACF.ticketprice;
    const ageLimit = movie.ACF.agelimit;
    const category = this.parseMovieCategories(movie);
    const runTime = movie.ACF.runtime;
    const nextShowTime = this.getNextShowTime(showTimes);
    const comingShowtimes = showTimes.filter(showTime => showTime.datetime !== nextShowTime[0].datetime);
    const imageUrl = this.getImageUrl(movie);

    return (
      <>
      { imageUrl &&
        <Typography gutterBottom variant="h4">
          { imageUrl }
        </Typography>
      }
        <Typography gutterBottom variant="h4">
          { title }
        </Typography>
        <Typography gutterBottom variant="h5">
          { strings.movie.nextShowTime } 
        </Typography>
        <Typography >
          { this.parseDate(nextShowTime[0].datetime) } 
        </Typography>
        <Typography >
          <b>{ strings.movie.ageLimit}</b> { ageLimit }
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
        { comingShowtimes.length > 0 &&
          <Typography >
            <b>{ strings.movie.showTimes }</b>
          </Typography>
        }
        <Typography >
        { (comingShowtimes && comingShowtimes.length > 0) && 
          comingShowtimes.map(showTime =>
            <Typography>
              { this.parseDate(showTime.datetime) }
            </Typography>
          )
        }
          <Button className={ classes.button } onClick={ () => this.onDescriptionClick(index)} >
            { openDescriptions[index] ? strings.movie.hideDescription : strings.movie.showDescription }
          </Button>
        </Typography>
        { openDescriptions[index] &&
          <Typography >
            { content }
          </Typography>
        }
        { movie.ACF.trailerurl &&
          <Button className={ classes.button } onClick={ () => this.toggleVideoDialog(movie.ACF.trailerurl)} >
            { strings.movie.watchTrailer }
          </Button>
        }
        <Typography >
        <Link href={ movie.ACF.ticketsalesurl ? movie.ACF.ticketsalesurl : "https://www.nettilippu.fi/fi/event/2949" }target="_blank">
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
          className={ classes.dialogTitle }
          disableTypography
          id="dialog-title"
        >
            <IconButton
              className={ classes.closeButton }
              size="small"
              onClick={ () => this.toggleVideoDialog() }
            >
              <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent
          className={ classes.dialogContent }
        >
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
   * Parses movie's categories to a string
   * 
   * @param movie movie 
   */
  private parseMovieCategories = (movie: Movie) => {
    const { categories } = this.state;
    var foundCategories = [];

    if(!movie.ACF.classification) {
      return undefined;
    }

    for (var i = 0; i < categories.length; i++) {
      for (var y = 0; y < movie.ACF?.classification?.length; y++) {
        if (categories[i].id === movie.ACF.classification[y]) {
          foundCategories.push(categories[i].name);
        }
      }
  }
  return foundCategories.toString().replace(/,/g, '/');
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