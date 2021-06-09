import * as React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/movies";
import BasicLayout from "../BasicLayout";
import ReactHtmlParser from "react-html-parser";
import { Movie } from "src/generated/client/src/models";
import strings from "../../localization/strings";

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
   * Method for rendering event cards
   */
  private renderMovieCards = () => {
    const { classes } = this.props;
    const { movies, openDescriptions } = this.state;
    console.log(movies)

    return movies.map((movie: Movie, index: number) => {


      const title = ReactHtmlParser(movie.title.rendered);
      const content = ReactHtmlParser(movie.content.rendered);
      const ticketPrice = movie.ACF.ticketprice;
      const ageLimit = movie.ACF.agelimit;
      const category = movie.ACF.classification
      const runTime = movie.ACF.runtime;
    
      return (
        <Card
          key={ index }
          className={ classes.card }
        >
            <CardContent>
              <div>
                <Typography gutterBottom variant="h5">
                  { title }
                </Typography>
                <Typography >
                  { ageLimit }
                </Typography>
                <Typography >
                  <b>{ strings.movie.duration}</b> { runTime }
                </Typography>
                <Typography >
                <b>{ strings.movie.category}</b> { category }
                </Typography>
                <Typography >
                <b>{ strings.movie.price}</b> { ticketPrice }
                </Typography>
                { openDescriptions[index] &&
                  <Typography >
                    { content }
                  </Typography>
                }
                <Typography >
                <Button variant="contained" color="primary" onClick={ () => this.onDescriptionClick(index)} >
                  { strings.movie.showDescription }
                </Button>
                </Typography>
              </div>
            </CardContent>
        </Card>
      );
    });
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