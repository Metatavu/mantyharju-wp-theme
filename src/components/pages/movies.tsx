import * as React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Link, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/movies";
import BasicLayout from "../BasicLayout";
import ReactHtmlParser from "react-html-parser";
import { Movie, MovieACFShowtimes } from "src/generated/client/src/models";
import strings from "../../localization/strings";
import CloseIcon from '@material-ui/icons/Close';
import Masonry from 'react-masonry-css'
import { black } from "material-ui/styles/colors";
import { ItemComponent } from "react-simple-tree-menu";
import moment from "moment";
import classNames from "classnames";

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
  pageOpen: string;
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
      pageOpen: "kino"
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.hidePageLoader();
    this.fetchMovies();
  }


  /**
   * Component render
   */
  public render() {
    const { lang, classes, slug } = this.props;
    const { pageOpen } = this.state;

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
          { this.renderNavigation() }
          { pageOpen === "movieList" &&
            <div className={ classes.movieList }>
              <Masonry
                breakpointCols={4}
                className={ classes.masornyGrid }
                columnClassName={ classes.masornyColumn }
              >
                { this.renderMovieCards() }
              </Masonry>
            </div>
          }
          { pageOpen === "kino" &&
              this.renderKinoInformation()
          }
        </div>
      </BasicLayout>
      </>
    );
  }

  /**
   * Method for fetching jobs
   */
  private fetchMovies = async () => {
    const response = await fetch("https://mntyharju.local/wp-json/wp/v2/mantyharju-elokuva");
    const movies = await response.json();
    this.setState({
      movies: movies
    })

    this.initDescriptionState();
  }

  private renderNavigation = () => {
    const { classes } = this.props;

    return (
      <div className={ classes.sideNavigation }>
          <Link
            className={ classes.link }
            onClick={ () => this.onChangePage("kino") }
          >
            { strings.movie.movieTheatre }
          </Link>
          <Link
            className={ classes.link }
            onClick={ () => this.onChangePage("movieList") }
          >
            { strings.movie.ongoingMovies }
          </Link>
          <Link
            className={ classes.link }
            href="https://ilokuvafestivaali.net/"
          >
            { strings.movie.festival }
          </Link>
      </div>
    );
  }

  private renderKinoInformation = () => {
    const { classes } = this.props;

    return (
      <div className={ classes.container }>
        <div className={ classes.kinoInformation }>
          <Typography>
            <Box className={ classes.boxBold }>
              { strings.movie.movieTheatre }
            </Box>
            <Box className={ classes.box }>
              { strings.movie.movieInformationText.text1 }
            </Box>
            <Box className={ classes.box }>
              { strings.movie.movieInformationText.text2 }
            </Box>
            <Box className={ classes.box }>
              { strings.movie.movieInformationText.text3 }
            </Box>
            <Box className={ classes.box }>
              { strings.movie.movieInformationText.text4 }
            </Box>
            <Box className={ classes.box }>
              <img
                className={ classes.coronaImage }
                src="https://mantyharju.metatavu.io/wp-content/uploads/2020/11/seol-opaste-teattereille_1-724x1024-1.jpg"
                alt="Suomen Elokuvateatteriliiton korona-ohjeistus jpg 112KB"
                width="260"
                height="60"
              />
            </Box>
            <Box
              className={ classes.infoBox }
              dangerouslySetInnerHTML={{
                __html: strings.movie.movieInformationText.text5
              }}
            >
            </Box>
            <Box
              className={ classes.infoBox }
            >
              { strings.movie.giftCard }
            </Box>
            <Box
              dangerouslySetInnerHTML={{
                __html: strings.movie.movieInformationText.text6
              }}
            >
            </Box>
            <Box
              className={ classes.infoBox }
            >
              { strings.movie.commonInformation }
            </Box>
            <Box
              className={ classes.box }  
            >
              { strings.movie.movieInformationText.text11 }
            </Box>
            <Box className={ classes.box }>
                <ul>
                  <li>{ strings.movie.movieInformationText.text7 }</li>
                  <li>{ strings.movie.movieInformationText.text8 }</li>
                  <li>{ strings.movie.movieInformationText.text9 }</li>
                  <li
                    dangerouslySetInnerHTML={{
                    __html: strings.movie.movieInformationText.text10
                    }}
                  >
                  </li>
                </ul>
              </Box>
          </Typography>
        </div>
        <div className={ classes.sideInformation }>
          <div className={ classes.sideInfoContent }>
            <Typography>
              <Box className={ classes.boxBold }>
                { strings.movie.movieTheatre }
              </Box>
              <Box className={ classes.box}>
                { strings.movie.email }
              </Box>
              <Box className={ classes.boxBold }>
                { strings.movie.buyTicets }
              </Box>
              <Box className={ classes.box }>
                { strings.movie.addres}
              </Box>
              <Box >
                { strings.movie.postalCode}
              </Box>
              <Box>
              <Link
                target="_blank"
                className={ classes.link }
                href="https://www.suomi.fi/kartta/palvelupaikat/0dda06e2-f9b6-4bbe-a30e-d2feab6afc7f?lat=6809203.911&lon=492856.842&zoom=10&sl=e7af0351-9fe9-4b86-849b-afeb45dc8cc5/"
              >
                { strings.movie.placeAtMap }
              </Link>
              </Box>
              <Box>
              <Link
                target="_blank"
                className={ classes.link }
                href="https://www.suomi.fi/kartta/reitit?lat=6809203&lon=492476&zoom=10&to.lon=492856&to.lat=6809203"
              >
                { strings.movie.showRoute }
              </Link>
              </Box>
              <Box className={ classes.box }>
              <Link
                target="_blank"
                className={ classes.link }
                href="https://www.nettilippu.fi/fi/event/2949"
              >
                <img
                  src="https://mantyharju.metatavu.io/wp-content/uploads/2020/10/nettilippu_logo.jpg"
                  alt=""
                  width="260"
                  height="60"
                />
              </Link>
              </Box>
              <Box className={ classes.boxBold }>
                { strings.movie.basicTicket }
              </Box>
              <Box>
                { strings.movie.basicInfo }
              </Box>
              <Box className={ classes.boxBold }>
                { strings.movie.flexoundTicket }
              </Box>
              <Box>
                { strings.movie.flexoundInfo }
              </Box>
              <Box
                fontStyle="italic"
                fontWeight="bold"
              >
                { strings.movie.flexoundExtraInfo }
              </Box>
              <Box className={ classes.boxBold }>
                { strings.movie.meansOfPayment }
              </Box>
              <Box className={ classes.box }>
                <ul>
                  <li>{ strings.movie.cash }</li>
                  <li>{ strings.movie.creditCard }</li>
                  <li>{ strings.movie.smartum }</li>
                  <li>{ strings.movie.ePassi }</li>
                  <li>{ strings.movie.virikeSeteli }</li>
                  <li>{ strings.movie.eazyBreak }</li>
                </ul>
              </Box>
            </Typography>
          </div>
        </div>
      </div>
    )
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
   * Changes page on click
   * @param page to change
   */
  private onChangePage = (page: string) => {
    this.setState({
      pageOpen: page
    });
  }

  private renderSideInformation = () => {

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
    const category = movie.ACF.classification
    const runTime = movie.ACF.runtime;
    const nextShowTime = this.getNextShowTime(showTimes);
    const comingShowtimes = showTimes.filter(showTime => showTime.datetime !== nextShowTime[0].datetime);

    return (
      <>
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
        <Typography >
        <Typography >
        <b>{ strings.movie.showTimes }</b>
        </Typography>
        { (comingShowtimes && comingShowtimes.length !== 0) && 
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