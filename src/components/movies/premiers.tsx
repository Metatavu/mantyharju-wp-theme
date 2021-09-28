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
  premierMovies: Movie[];
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
      premierMovies: [],
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
    const { isMobile, loading } = this.state;

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
            { this.renderContent() }
          </div>
        </div>
      </>
    );
  }

  /**
   * Renders content
   */
  private renderContent = () => {
    const { classes } = this.props;
    const { premierMovies, isMobile } = this.state;

    if (!premierMovies.length) {
      return (
        <Typography variant="h3" component="h3">
          { strings.movie.noPremiers }
        </Typography>
      );
    }

    return (
      <Box className={ !isMobile ? classes.content : classes.mobileContent }>
        { this.renderMovieCards() }
      </Box>
    );
  }

  /**
   * Method for fetching jobs
   */
  private fetchData = async () => {
    try {
      this.setState({ loading: true });

      const [ movies, categories, movieMedia ] = await Promise.all([
        this.fetchFromUrl("/wp-json/wp/v2/mantyharju-elokuva?per_page=100"),
        this.fetchFromUrl("/wp-json/wp/v2/mantyharju-elokuva-categories?per_page=100"),
        this.fetchFromUrl("/wp-json/wp/v2/media?per_page=100")
      ]);

      const premierMovies = this.getPremierMovies(movies);

      this.initDescriptionState(premierMovies);

      this.setState({
        premierMovies,
        categories,
        movieMedia,
        loading: false
      })

      this.hidePageLoader();
    } catch(error) {
      console.error(error)
      this.hidePageLoader();
    }
  }

  /**
   * Fetch data from given URL
   *
   * @param url URL
   */
  private fetchFromUrl = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  }

  /**
   * Returns premier movies
   *
   * @param movies all movies
   */
  private getPremierMovies = (movies: Movie[]) => {
    return movies.filter(({ ACF: { showtimes } }) =>
      showtimes ? !showtimes.some(this.hasPassed) && showtimes.some(this.isUpcoming) : false
    );
  }

  /**
   * Returns whether showtime has already passed or not
   *
   * @param showtime show time
   * @returns true if showtime has passed, otherwise false
   */
  private hasPassed = (showtime: MovieACFShowtimes) => {
    return this.parseShowTime(showtime) < moment().valueOf();
  };

  /**
   * Returns if show time is upcoming or not
   *
   * @param showtime show time
   * @returns true if show time is upcoming, otherwise false
   */
  private isUpcoming = (showtime: MovieACFShowtimes) => {
    return !!showtime.datetime.toString() && moment(showtime.datetime).isBetween(moment(), moment().add(1, "week"));
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
    const openDescriptions = [ ...this.state.openDescriptions ];

    openDescriptions.splice(index, 1, !openDescriptions[index]);

    this.setState({ openDescriptions: openDescriptions });
  }

  /**
   * Inits show description state for all movies
   *
   * @param premierMovies premier movies
   */
  private initDescriptionState = (premierMovies: Movie[]) => {
    this.setState({
      openDescriptions: Array.from({ length: premierMovies.length }, () => false)
    })
  }

  /**
   * Format url for embedding the video
   *
   * @param trailerUrl trailer url
   * @returns embed url
   */
  private formatUrl = (trailerUrl: string): string => {
    const baseUrl = "https://www.youtube-nocookie.com/embed/";

    if (/youtu\.be/.test(trailerUrl)) {
      return `${baseUrl}${trailerUrl.split("/")[ trailerUrl.split("/").length - 1 ]}`;
    }

    if (/watch/.test(trailerUrl)) {
      return `${baseUrl}${trailerUrl.split("/")[ trailerUrl.split("/").length - 1 ].replace("watch?v=", "")}`;
    }

    return trailerUrl;
  }

  /**
   * Returns premier show time
   *
   * @param movie movie to get premier from
   * @returns premier if movie has one, otherwise undefined
   */
  private getPremier = ({ ACF: { showtimes } }: Movie) => {
    return showtimes?.filter(this.isUpcoming)
      .sort(this.sortByEarliest)
      .shift();
  }

  /**
   * Sorts show times by date
   *
   * @param showtimeA show time A
   * @param showtimeB show time B
   */
  private sortByEarliest = (a: MovieACFShowtimes, b: MovieACFShowtimes) => {
    return moment(a.datetime).diff(b.datetime);
  };

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

      return isPremier ?
        `${dateName} ${day}.${month}` :
        `${dateName} ${day}.${month}. klo: ${hoursMins}`;
  }

  /**
   * Method for rendering movie cards
   */
  private renderMovieCards = () => {
    const { classes } = this.props;
    const { premierMovies } = this.state;

    return premierMovies.reduce<JSX.Element[]>((list, movie, index) => {
      const premier = this.getPremier(movie);

      if (premier) {
        list.push(
          <div key={ index } className={ classes.card }>
            { this.renderCardContent(movie, index, premier) }
            <div className={ classes.cardLine }/>
          </div>
        );
      }

      return list;
    }, []);
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
      return moment(String(showTime.datetime)).valueOf();
    }


}

export default withStyles(styles)(Premiers);