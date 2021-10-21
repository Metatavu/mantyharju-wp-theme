import * as React from "react";
import { Box, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Link, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/movies";
import ReactHtmlParser from "react-html-parser";
import { Movie, MovieACFShowtimes } from "src/generated/client/src/models";
import strings from "../../localization/strings";
import CloseIcon from "@material-ui/icons/Close";
import Masonry from "react-masonry-css";
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
  ongoingMovies?: Movie[];
  categories: any;
  openDescriptions: Boolean[];
  videoOpen: boolean;
  videoUrl?: string;
  movieMedia: any;
  isMobile?: boolean
  masonryColumns: number;
  sideContent?: React.ReactElement;
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
      masonryColumns: 3,
      loading: true,
      openDescriptions: [],
      videoOpen: false,
      categories: [],
      movieMedia: []
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = async () => {
    window.addEventListener("resize", this.setPageLayout);
    this.setPageLayout();
    await this.fetchData();
    this.setState({ loading: false });
  }

  /**
   * Component did mount life cycle handler
   */
    public componentWillUnmount = () => {
      window.removeEventListener("resize", this.setPageLayout);
    }

  /**
   * Sets page layout according to screen width
   */
  private setPageLayout = () => {
    this.setState({
      isMobile: window.innerWidth <= 1280,
      masonryColumns: this.getMasonryColumnCount()
    });
  }

  /**
   * Returns column amount for Masonry
   */
  private getMasonryColumnCount = () => {
    if (window.innerWidth <= 1280) {
      return 1;
    } else if (window.innerWidth > 1280 && window.innerWidth <= 1600) {
      return 2;
    } else {
      return 3;
    }
  }

  /**
   * Component render
   */
  public render() {
    const { classes } = this.props;
    const { isMobile } = this.state;

    return (
      <>
        { this.renderVideoDialog() }
        <div className={ !isMobile ? classes.column : classes.mobileColumn }>
          <div className={ !isMobile ? classes.container : classes.mobileContainer }>
            { this.renderContent() }
          </div>
        </div>
      </>
    );
  }

  /**
   * Method for fetching data
   */
  private fetchData = async () => {
    try {
      const [ movies, categories, movieMedia ] = await Promise.all([
        this.fetchFromUrl("/wp-json/wp/v2/mantyharju-elokuva?per_page=100"),
        this.fetchFromUrl("/wp-json/wp/v2/mantyharju-elokuva-categories?per_page=100"),
        this.fetchFromUrl("/wp-json/wp/v2/media?per_page=100")
      ]);

      const ongoingMovies = this.getOngoingMovies(movies);

      this.initDescriptionState(ongoingMovies);

      this.setState({
        ongoingMovies,
        categories,
        movieMedia
      });
    } catch(error) {
      console.error(error);
    }

    this.hidePageLoader();
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
   * Returns ongoing movies
   *
   * @param movies movies
   */
  private getOngoingMovies = (movies: Movie[]) => {
    return movies.filter(({ ACF: { showtimes } }) => {
      if (!showtimes) {
        return false;
      }

      const validShowTimes = showtimes.filter(({ datetime }) => !!datetime);

      return !validShowTimes.every(this.inPast) && !validShowTimes.every(this.inFuture);
    });
  }

  /**
   * Returns whether given movie show time is in the past or not
   *
   * @param showtime movie show time
   */
  private inPast = (showtime: MovieACFShowtimes) => {
    return !!showtime.datetime && moment(showtime.datetime).isBefore(moment(), "day");
  }

  /**
   * Returns whether given movie show time is in the past or not
   *
   * @param showtime movie show time
   */
  private inFuture = (showtime: MovieACFShowtimes) => {
    return !!showtime.datetime && moment(showtime.datetime).isAfter(moment(), "day");
  }

  /**
   * Toggle video dialog event handler
   *
   * @param trailerUrl URL of trailer
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

    this.setState({ openDescriptions: openDescriptions });
  }

  /**
   * Inits show description state for all movies
   *
   * @param premierMovies premier movies
   */
  private initDescriptionState = (ongoingMovies: Movie[]) => {
    this.setState({
      openDescriptions: Array.from({ length: ongoingMovies.length }, () => false)
    });
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

    if(/watch/.test(trailerUrl)) {
      return `${baseUrl}${trailerUrl.split("/")[ trailerUrl.split("/").length - 1 ].replace("watch?v=", "")}`;
    }

    return trailerUrl;
  }

  /**
   * Gets next showtime of a movie
   */
  private getNextShowTime = (showTimes: MovieACFShowtimes[]) => {
    const min = Math.min.apply(null, showTimes.map(showtime => this.parseShowTime(showtime)));
    const nextShowTime = showTimes.filter(showTime => this.parseShowTime(showTime) === min);
    return nextShowTime;
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

  /**
   * Filters show times
   *
   * @param movie movie which show times are filtered
   * @returns filtered show times
   */
  private filterShowTimes = (movie: Movie) => {
    if (!movie.ACF.showtimes) {
      return [];
    }

    const now = moment().valueOf();
    const monthFromNow = moment(now).add(1, "month").valueOf();

    return movie.ACF.showtimes.filter(showTime => {
      const parsedShowTime = this.parseShowTime(showTime);
      return now < parsedShowTime && parsedShowTime <= monthFromNow;
    });
  }

  /**
   * Returns image URL
   *
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
   * Renders content
   */
  private renderContent = () => {
    const { classes } = this.props;
    const { loading, masonryColumns, ongoingMovies } = this.state;

    if (loading) {
      return (
        <Box className={ classes.loadingIconContainer }>
          <CircularProgress/>
        </Box>
      );
    }

    if (!ongoingMovies?.length) {
      return (
        <Box className={ classes.loadingIconContainer }>
          <Typography variant="h3" component="h3">
            { strings.movie.noMovies }
          </Typography>
        </Box>
      );
    }

    return (
      <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
        <Box className={ classes.kinoInformation }>
          <Masonry
            breakpointCols={ masonryColumns }
            className={ classes.masornyGrid }
            columnClassName={ classes.masornyColumn }
          >
            { ongoingMovies.map(this.renderMovieCard) }
          </Masonry>
        </Box>
      </Grid>
    );
  }

  /**
   * Method for rendering movie card
   *
   * @param movie movie
   * @param index index
   */
  private renderMovieCard = (movie: Movie, index: number) => {
    const { classes } = this.props;

    const showTimes = this.filterShowTimes(movie);

    if (!showTimes.length) {
      return null;
    }

    return (
      <Card
        key={ index }
        className={ classes.card }
      >
        <CardContent>
          { this.renderCardContent(movie, index, showTimes) }
        </CardContent>
      </Card>
    );
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

    comingShowtimes.sort((a, b) => this.parseShowTime(a) - this.parseShowTime(b));

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
        <Typography gutterBottom variant="h5">
          { title }
        </Typography>
        <Typography gutterBottom variant="body1">
          { strings.movie.nextShowTime }
        </Typography>
        <Typography variant="h6">
          { showTimes.length > 1 || movie.ACF.ticketsalesurl ? this.parseDate(nextShowTime[0].datetime, false) : this.parseDate(nextShowTime[0].datetime, true) }
        </Typography>
        { ageLimit &&
          <Box mt={ 1 }>
            <Typography component="p">
            <b>{ strings.movie.ageLimit }</b> { ageLimit }
            </Typography>
          </Box>
        }
        { runTime &&
          <Box mt={ 1 }>
            <Typography component="p">
              <b>{ strings.movie.duration }</b> { runTime }
            </Typography>
          </Box>
        }
        { category &&
          <Box mt={ 1 }>
            <Typography component="p">
              <b>{ strings.movie.category }</b> { category }
            </Typography>
          </Box>
        }
        { cast &&
            <Box mt={ 1 }>
              <Typography component="p">
                <b>{ strings.movie.cast }</b> { cast }
              </Typography>
            </Box>
        }
        { director &&
            <Box mt={ 1 }>
              <Typography component="p">
                <b>{ strings.movie.director }</b> { director }
              </Typography>
            </Box>
        }
        { ticketPrice &&
          <Box mt={ 1 }>
            <Typography component="p">
              <b>{ strings.movie.price }</b> { ticketPrice }
            </Typography>
          </Box>
        }
        { comingShowtimes.length &&
          <Box mt={ 1 }>
            <Typography component="p">
              <b>{ strings.movie.showTimes }</b>
            </Typography>
          </Box>
        }
        <Box mt={ 1 }>
        { comingShowtimes.length &&
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
          <Box mt={ 2 } className={ classes.descriptionContainer }>
            <Typography variant="body1">
              { content }
            </Typography>
          </Box>
        }
        { movie.ACF.trailerurl &&
          <Button className={ classes.button } onClick={ () => this.toggleVideoDialog(movie.ACF.trailerurl)} >
            { strings.movie.watchTrailer }
          </Button>
        }
        {
          movie.ACF.ticketsalesurl &&
          <Box>
            <Link href={ movie.ACF.ticketsalesurl } target="_blank">
              <Button className={ classes.button }>
                { strings.movie.buyTickets }
              </Button>
            </Link>
          </Box>
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