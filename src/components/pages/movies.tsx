import * as React from "react";
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Link, Typography, useMediaQuery, withStyles, WithStyles } from "@material-ui/core";
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
  movieMedia: any;
  isMobile?: boolean
  hasOngoingMovies?: boolean;
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
      categories: [],
      movieMedia: []
    };
    window.addEventListener("resize", this.checkScreenWidth);
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.fetchData();
    this.checkScreenWidth();
  }

  /**
   * Component did mount life-cycle handler
   */
    public componentWillUnmount = () => {
      window.removeEventListener("resize", this.checkScreenWidth);
    }

  /**
   * Checks screen width
   */
  private checkScreenWidth = () => {
    this.setState({ isMobile: window.innerWidth <= 1280 });
  }

  /**
   * Component render
   */
  public render() {
    const { lang, classes, slug } = this.props;
    const { isMobile, hasOngoingMovies } = this.state;

    return (
      <>
        { this.renderVideoDialog() }
        <BasicLayout lang={ lang } slug={ slug }>
          <div className={ classes.heroImageDiv }>
            <div className={ classes.heroContent }>
              <Typography variant="h1" className={ classes.heroText }>
                { strings.movie.kinoName }
              </Typography>
            </div>
          </div>
          <div className={ !isMobile ? classes.column : classes.mobileColumn }>
            <div className={ classes.line }></div>
            <div className={ !isMobile ? classes.container : classes.mobileContainer } >
              <Grid item xs={12} md={3} lg={2} key={"123"}>
                <div className={ classes.treeView }>
                  <TreeView slug={ slug }/>
                </div>
              </Grid>
              { hasOngoingMovies ?
                <Grid item xs={12} md={12} lg={12} key={"456"}>
                  <div className={ classes.kinoInformation }>
                    <Masonry
                      breakpointCols={ !isMobile ? 4 : 1 }
                      className={ classes.masornyGrid }
                      columnClassName={ classes.masornyColumn }
                    >
                      { this.renderMovieCards() }
                    </Masonry>
                  </div>
                </Grid> : <h1>{strings.movie.noMovies }</h1>
              }
            </div>
          </div>
        </BasicLayout>
      </>
    );
  }

  /**
   * Method for fetching data
   */
  private fetchData = async () => {
    try {
      const movieResponse = await fetch("/wp-json/wp/v2/mantyharju-elokuva?per_page=100");
      const categoryResponse = await fetch("/wp-json/wp/v2/mantyharju-elokuva-categories?per_page=100");
      const movieMediaResponse = await fetch("/wp-json/wp/v2/media?per_page=100");

      const categories = await categoryResponse.json();
      const movies = await movieResponse.json();
      const movieMedia = await movieMediaResponse.json();

      this.setState({
        movies,
        categories,
        movieMedia
      })
      this.hidePageLoader();
    } catch(error) {
      console.error(error)
      this.hidePageLoader();
    }

    this.initDescriptionState();
    this.hasOngoingMovies();
  }

    /**
   * Check if there is any ongoing movies
   */
    private hasOngoingMovies = () => {
      const { movies } = this.state;
      const ongoingMovies = [];
  
      movies.forEach(movie => {
        if (this.filterShowTimes(movie)) {
          ongoingMovies.push(movie);
        }
      })
  
      if (ongoingMovies.length > 0) {
        this.setState({ hasOngoingMovies: true });
      } else {
        this.setState({ hasOngoingMovies: false});
      }
    }

  /**
   * Toggle video dialog event handler
   * 
   * @param trilerurl url of trailer
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

    openDescriptions[index] = !openDescriptions[index];

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

    this.setState({ openDescriptions: emptyState });
  }

  /**
   * Format url for embedding the video
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

    var min = Math.min.apply(null, showTimes.map(showtime => new Date(showtime.datetime).getTime() ));
    const nextShowTime = showTimes.filter(showTime => new Date(showTime.datetime).getTime() === min);

    return nextShowTime;
  }

  /**
  * 
  * @param movie movie whitch showtimes are filtered
  * @returns filtered showtimes
 */
  private filterShowTimes = (movie: Movie) => {
    const dateSoon = new Date();
    dateSoon.setDate(dateSoon.getDate() + 30);

    const dateSoonNumber = dateSoon.getTime();
    const dateNow = new Date().getTime();
    
    if (!movie.ACF.showtimes) {
      return;
    }

    const hasOngoingMovies = movie.ACF.showtimes.some(showTime => {
      return new Date(showTime.datetime).getTime() <= dateSoonNumber;
    });

    for (const showTime of movie.ACF.showtimes) {
      if (new Date(showTime.datetime).getTime() > dateNow && !hasOngoingMovies) {
        return;
      }
    }

    const filteredShowTimes: MovieACFShowtimes[] = []

    movie.ACF.showtimes.forEach(showTime => {
      if (showTime.datetime) {
        if (new Date(showTime.datetime).getTime() > dateNow) {
          filteredShowTimes.push(showTime);
        }
      }
    });

    return filteredShowTimes;
  }

  /**
   * @param movie movie 
   * @returns Url of image
   */
  private getImageUrl = (movie: Movie) => {
    const { movieMedia } = this.state;

    if (!movie.featured_media || !movieMedia) {
      return undefined;
    }

    const foundMedia = movieMedia.filter((media: any) => media.id === movie.featured_media);

    if (!foundMedia || !foundMedia[0] || !foundMedia[0].guid.rendered) {
      return undefined;
    }

    return foundMedia[0].guid.rendered;
  }

  /**
   * Parses date to string
   * @returns date string
   */
  private parseDate = (showTime: Date, isPremier: boolean) => {
    const date = moment(showTime);
    const dateName = date.locale('fi').format('dd');
    const day = date.format('DD');
    const month = date.format('MM');
    const hoursMins = date.format('HH:mm');

    const dateString = `${dateName} ${day}.${month}. klo: ${hoursMins}`;
    const premierDateString = `${dateName} ${day}.${month}`;

    if (isPremier) {
      return premierDateString
    } else {
      return dateString; 
    }
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
    const director = movie.ACF.director;
    const cast = movie.ACF.cast;

    comingShowtimes.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

    return (
      <>
        { imageUrl &&
          <Typography >
            <img 
              className={ classes.image }
              src={ imageUrl }
              alt="Elokuva"
            />
          </Typography>
        }
        <Typography gutterBottom variant="h4">
          { title }
        </Typography>
        <Typography gutterBottom variant="h5">
          { strings.movie.nextShowTime } 
        </Typography>
        <Typography >
          { showTimes.length > 1 || movie.ACF.ticketsalesurl ? this.parseDate(nextShowTime[0].datetime, false) : this.parseDate(nextShowTime[0].datetime, true) } 
        </Typography>
        { ageLimit &&
          <Box mt={ 1 }>
            <b>{ strings.movie.ageLimit}</b> { ageLimit }
          </Box>
        }
        { runTime &&
          <Box mt={ 1 }>
            <b>{ strings.movie.duration}</b> { runTime }
          </Box>
        }
        { category &&
          <Box mt={ 1 }>
            <b>{ strings.movie.category}</b> { category }
          </Box>
        }
        { cast &&
            <Box mt={ 1 }>
              <b>{ strings.movie.cast}</b> { cast }
            </Box>
        }
        { director &&
            <Box mt={ 1 }>
              <b>{ strings.movie.director}</b> { director }
            </Box>
        }
        { ticketPrice &&
          <Box mt={ 1 }>
            <b>{ strings.movie.price}</b> { ticketPrice }
          </Box>
        }
        { comingShowtimes.length > 0 &&
          <Box mt={ 1 }> 
            <b>{ strings.movie.showTimes }</b>
          </Box>
        }
        <Box mt={ 1 }>
          
        { (comingShowtimes && comingShowtimes.length > 0) && 
          comingShowtimes.map(showTime =>
            <Typography>
              { this.parseDate(showTime.datetime, false) }
            </Typography>
          )
        }
          <Button className={ classes.button } onClick={ () => this.onDescriptionClick(index)} >
            { openDescriptions[index] ? strings.movie.hideDescription : strings.movie.showDescription }
          </Button>
        </Box>
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
        {
          movie.ACF.ticketsalesurl &&
            <Typography >
            <Link href={ movie.ACF.ticketsalesurl }target="_blank">
              <Button className={ classes.button }>
                { strings.movie.buyTickets }
              </Button>
            </Link>
          </Typography>
        }
      </>
    );
  }

  /**
   * Renders video dialog
   */
  private renderVideoDialog = () => {
    const { classes } = this.props;
    const { videoOpen, videoUrl, isMobile } = this.state;

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
            className={ !isMobile ? classes.iFrame : classes.mobileiFrame }
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
   * @returns Category string
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