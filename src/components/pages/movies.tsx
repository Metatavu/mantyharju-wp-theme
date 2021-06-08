import * as React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/movies";
import BasicLayout from "../BasicLayout";
import ApiUtils from "../../utils/ApiUtils";
import ReactHtmlParser from "react-html-parser";
import { Movie } from "src/generated/client/src/models";

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
      movies: []
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
              Elokuvat
            </Typography>
          </div>
        </div>
        <div
        className={ classes.container }
        >
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
    console.log(movies)
  }

  /**
   * Method for rendering event cards
   */
  private renderMovieCards = () => {
    const { classes } = this.props;
    const { movies } = this.state;

    return movies.map((movie: Movie, index: number) => {

      const title = ReactHtmlParser(movie.title.rendered);
      const content = ReactHtmlParser(movie.content.rendered);
      const ticketPrice = movie.ACF.ticketprice

      return (
        <Card
          key={ index }
          className={ classes.card }
        >
            <CardContent>
              <div>
                <Typography gutterBottom variant="caption">
                  { title }
                </Typography>
                <Typography  gutterBottom variant="h5">
                  { content }
                </Typography>
              </div>
              <Typography gutterBottom variant="caption">
                { ticketPrice }
              </Typography>
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