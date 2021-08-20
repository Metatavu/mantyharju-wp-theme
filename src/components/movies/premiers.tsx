import * as React from "react";
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/premiers";
import ReactHtmlParser from "react-html-parser";
import { Movie, MovieACFShowtimes } from "src/generated/client/src/models";
import strings from "../../localization/strings";
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {}

/**
 * Component state
 */
interface State {
  loading: boolean;
  movies: Movie[];
  categories: any;
  openDescriptions: Boolean[]
  videoOpen: boolean;
  videoUrl?: string;
  movieMedia: any;
  isMobile?: boolean;
  hasPremiers?: boolean;
}

/**
 * A component for displaying movie premiers
 */
class Premiers extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
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
      this.setState({ isMobile: window.innerWidth <= 760 });
    }

  /**
   * Component render
   */
  public render() {
    const { classes } = this.props;
    const { isMobile, hasPremiers, loading } = this.state;

    if (loading) {
      return (
        <Box className={ classes.loadingIconContainer }>
          <CircularProgress/>
        </Box>
      );
    }

    return (
      <>
        { this.renderVideoDialog() }
          <div className={ !isMobile ? classes.column : classes.mobileColumn }>
            <div className={ !isMobile ? classes.container : classes.mobileContainer } >
              {
                hasPremiers ?
                <Box className={ !isMobile ? classes.content : classes.mobileContent }>
                  { this.renderMovieCards() }
                </Box>
                :
                <Typography variant="h3" component="h3">
                  {strings.movie.noPremiers }
                </Typography>
              }
            </div>
          </div>
      </>
    );
  }

  /**
   * Method for fetching jobs
   */
  private fetchData = async () => {
    try {
      this.setState({ loading: true });
      const movieResponse = await fetch("/wp-json/wp/v2/mantyharju-elokuva?per_page=100");
      const categoryResponse = await fetch("/wp-json/wp/v2/mantyharju-elokuva-categories?per_page=100");
      const movieMediaResponse = await fetch("/wp-json/wp/v2/media?per_page=100");

      const categories = await categoryResponse.json();
      const movies = await movieResponse.json();
      const movieMedia = await movieMediaResponse.json();

      this.setState({
        movies,
        categories,
        movieMedia,
        loading: false
      })
      this.hidePageLoader();
    } catch(error) {
      console.error(error)
      this.hidePageLoader();
    }

    this.initDescriptionState();
    this.hasPremier();
  }

  /**
   * Toggle video dialog event handler
   * 
   * @param trailerUrl trailer url
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
   * Check if movie has any premiers
   */
  private hasPremier = () => {
    const { movies } = this.state;
    const premiers = [];

    movies.forEach(movie => {
      if (this.filterShowTimes(movie)) {
        premiers.push(movie)
      }
    })

    if (premiers.length > 0) {
      this.setState({ hasPremiers: true })
    } else {
      this.setState({ hasPremiers: false})
    }
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
  * @param showTimes movie whitch showtimes are filtered
  * @returns premier if movie has any
 */
  private filterShowTimes = (movie: Movie) => {
    const dateNow = new Date().getTime();
    const showTimes = movie.ACF.showtimes;

    if (!showTimes) {
      return;
    }

    for (const showTime of showTimes) {
      if (this.parseShowTime(showTime) < dateNow) {
        return;
      }
    }

    const filteredShowTimes = showTimes.filter(showTime => showTime.datetime.toString() !== "");

    if (!filteredShowTimes) {
      return;
    }

    const premier = filteredShowTimes.reduce((prev, curr) => {
      return new Date(prev.datetime).getTime() < new Date(curr.datetime).getTime() ? prev : curr;
    });
  
    return premier;
  }


  /**
   * Parses date to string
   * 
   * @param showTime show time
   * @param isPremier is movie premier or not
   * @returns Parsed date string
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
   * Method for rendering movie cards
   */
  private renderMovieCards = () => {
    const { classes } = this.props;
    const { movies } = this.state;
    const hasOngoingMovies = [];

    return movies.map((movie: Movie, index: number) => {
      const premier = this.filterShowTimes(movie);

      return (
        (premier ?
            <div
              key={ index }
              className={ classes.card }
            >
              { this.renderCardContent(movie, index, premier) }
            <div className={ classes.cardLine }></div>
            </div>
          : null
        ));
    })
  }

  /**
   * Renders card content
   * 
   * @param movie movie
   * @param index index
   * @param premier premier of the movie
   */
  private renderCardContent = (movie: Movie, index: number, premier: MovieACFShowtimes) => {
    const { classes } = this.props;
    const { openDescriptions, isMobile } = this.state;
    const title = ReactHtmlParser(movie.title.rendered);
    const content = ReactHtmlParser(movie.content.rendered);
    const ageLimit = movie.ACF.agelimit;
    const category = this.parseMovieCategories(movie);
    const imageUrl = this.getImageUrl(movie);

    return (
      <>
        { imageUrl &&
          <Box mt={ 1 } >
            <img 
              className={ !isMobile ? classes.image : classes.mobileImage }
              src={ imageUrl }
              alt="Elokuva"
            />
          </Box>
        }
        <Typography gutterBottom variant="h4">
          { title }
        </Typography>
        <Typography gutterBottom variant="h5">
          <b>{ strings.movie.premier }</b> { movie.ACF.ticketsalesurl ? this.parseDate(premier.datetime, false) : this.parseDate(premier.datetime, true) } 
        </Typography>
        { ageLimit &&
          <Box mt={ 1 }>
            <b>{ strings.movie.ageLimit}</b> { ageLimit }
          </Box>
        }
        { category &&
          <Box mt={ 1 } >
            <b>{ strings.movie.category}</b> { category }
          </Box>
        }
        <Typography >
          <Button className={ classes.button } onClick={ () => this.onDescriptionClick(index)} >
            { openDescriptions[index] ? strings.movie.hideDescription : strings.movie.showDescription }
          </Button>
        </Typography>
        { openDescriptions[index] &&
          <Box mt={ 2 } className={ classes.descriptionContainer }>
            { content }
          </Box>
        }
        { movie.ACF.trailerurl &&
          <Button className={ classes.button } onClick={ () => this.toggleVideoDialog(movie.ACF.trailerurl)} >
            { strings.movie.watchTrailer }
          </Button>
        }
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
        PaperProps={{
          elevation: 0,
          className: classes.dialogPaper
        }}
        open={ videoOpen }
        onClose={ () => this.toggleVideoDialog() }
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth="xl"
        className={ classes.trailerDialog }
      >
        <DialogTitle
          className={ classes.dialogTitle }
          disableTypography
          id="dialog-title"
        >
          <Typography variant="h6">
            { strings.movie.watchTrailer }
          </Typography>
          <IconButton
            color="inherit"
            onClick={ () => this.toggleVideoDialog() }
          >
            <CloseIcon htmlColor="#fff" />
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
   * @returns Parsed categories
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
   * Parses showtime field as unix timestamp
   * 
   * @param showTime showtime field
   * @returns unix timestamp
   */
    private parseShowTime = (showTime: any) => {
      return moment(String(showTime.datetime)).toDate().getTime();
    }

    
}

export default withStyles(styles)(Premiers);