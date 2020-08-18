import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/mantyharju-images/mantyharju-images/hero-front-1600x1080.jpg";

export default createStyles({
  /**
   * Mantyharju-theme front page styles
   */

  /**
   * TODO:
   * - Improve responsive design for buttons (small screens)
   * - Post columns styling
   * - LinkedEvents grid styling
   * - Fonts
   */

  /**
   * General front page styles
   */
  generalButtonStyle: {
    paddingTop: "0.4em",
    paddingBottom: "0.4em",
    paddingLeft: "1em",
    paddingRight: "1em",
    userSelect: "none"
  },

  loadingIconContainer: {
    display: "flex",
    margin: "5rem",
    justifyContent: "center"
  },

  /**
   * Hero-image as background
   */
  heroImageDiv: {
    backgroundImage: `url(${hero})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff",
    height:"35vw",
    maxHeight:"50vw",
    minHeight:"400px",
    paddingLeft: "8vw",
    paddingRight: "8vw",
    paddingTop: "8vw",
    width:"100%",
    position: "relative",
    [theme.breakpoints.down("sm")]:{
      height: "40vw",
      fontSize: "1.25em",
    }
  },
  heroText: {
    fontSize: "3.5em",
    marginTop: "2vw",
    marginBottom: "2vw",
    fontWeight: "bold",
    fontStyle: "italic",
    //textShadow: "1px 1px #000000",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5em"
    },
    [theme.breakpoints.down("sm")]:{
      fontSize: "1.25em",
    },
    [theme.breakpoints.down("xs")]:{
      fontSize: "1em",
    }
  },
  heroButton: {
    color: "black",
    fontSize: "1em",
    backgroundColor: "#FFFFFF",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]:{
      //fontSize: "0.5em",
    }
  },
  heroButtonPopularPages: {
    color: "#fff",
    backgroundColor:"#00AAAD",
    fontSize: "4em",
    paddingTop: "0.2em",
    paddingBottom: "0.2em",
    paddingLeft: "1em",
    paddingRight: "1em",
    cursor: "pointer",
    textTransform: "uppercase",
    position: "absolute",
    bottom: "0",
    right: "5vw",
    },

  /**
   * Add events -div
   */
  addEventDiv: {
    display:"grid",
    gridTemplateColumns: "50% 50%",
    flexDirection:"row",
    width: "90%",
    minHeight: "300px",
    marginTop: "1vw",
    marginLeft:"5%",
    marginBottom: "5%",
    marginRight:"5%",
    color: "fff",
    [theme.breakpoints.down("sm")]:{
      width: "100%",
      gridTemplateRows: "50% 50%",
      margin: "20px 0px 0px 0px"
    }
  },
  addEventImageDiv: {
    gridColumnStart: "1",
    gridColumnEnd: "1", 
    width: "100%",
    float: "left",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]:{
      paddingRight: "0.1vw",
      minHeight: "200px",
      width: "100%",
      gridColumnStart: "1",
      gridColumnEnd: "3", 
    }
  },
  addEventTextDiv: {
    gridColumnStart: "2",
    gridColumnEnd: "2", 
    width: "100%",
    float: "left",
    backgroundColor:"#00AAAD",
    paddingLeft: "5vw",
    paddingRight: "10vw",
    paddingTop: "2vw",
    [theme.breakpoints.down("sm")]:{
      paddingRight: "0.1vw",
      minHeight: "200px",
      width: "100%",
      gridColumnStart: "1",
      gridColumnEnd: "3", 
    },
  },
  addEventTextDivParagraph: {
    lineHeight: "1.5em",
    [theme.breakpoints.down("xs")]:{
      lineHeight: "0.5rem",
      fontSize: "0.5rem"
    },
  },
  addEventTextDivHeading: {
    marginBottom: "0",
    textDecoration: "none"
  },
  addEventImage: {
    width: "100%",
    height: "auto"
  },
  addEventButton: {
    color: "black",
    backgroundColor: "#FFFFFF",
    textTransform: "uppercase",
    marginTop: "1em",
    [theme.breakpoints.down("sm")]:{
      fontSize: "0.5em",
    }
  },

  /**
   * Posts section styles
   */
  postsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      flexDirection:"column",
      textAlign: "center",
      justifyContent: "center",
    },
  },
  postsColumn: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "& linkedevents-event": {
      backgroundColor: "black",
    },
  },
  allPosts: {
  },
  singleNewsPost: {
    "& p":{
      margin: 4,
      padding:0,
      color: "#15B1B3",
      fontSize: "0.8rem",
    },
    "& a":{
      margin: 0,
      padding:0,
      color: "black",
      textDecoration: "blink",
    },
    "& hr":{
      color: "black",
      opacity: "20%",
      margin: 2,
      marginTop: "1rem",
    },
    marginBottom: "2rem",
    maxHeight: "2.3rem",
  },

  /**
   * Nested paragraph comes from wordpress
   */
  singlePost: {
    "& p":{
      margin: 4,
      padding: 0,
      fontFamily: theme.typography.body1.fontFamily
    },
    "& hr":{
      color: "black",
      opacity: "20%",
      marginTop: "1rem",
    },
    marginBottom: "2rem",
    maxHeight: "2.3rem",
  },
  postDate: {
    color: "#15B1B3",
    fontSize: "0.8rem",
    margin: "0"
  },
  postContent: {
    margin: 0,
    padding:0
  },
  postColumnButton: {
    color: "#fff",
    backgroundColor:"#00AAAD",
    marginTop: "2rem",
    textTransform: "uppercase",
    paddingLeft: "2rem",
    paddingRight: "2rem"
  },

  
  /**
   * LinkedEvents section styles
   */

  linkedEventsContainer: {
    marginTop: "5rem",
    padding: "3rem 10rem 3rem 10rem",
    width: "100%",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#EBEBEB"
  },
  eventsTopRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "middle",
  },
  eventsBottomRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "middle",
    marginInline: "10px",
  },
  singleEvent: {
    color: "red",
    width: "100%",
    objectFit: "cover",
  },
  allEventsButton: {
    backgroundColor:"#00AAAD",
    textTransform: "uppercase",
    marginTop: "2rem",
    marginRight: "1rem",
    color: "#fff"
  },
  addLinkedEventButton: {
    backgroundColor:"#00AAAD",
    textTransform: "uppercase",
    marginLeft: "1rem",
    color: "#fff",
    marginTop: "2rem",
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    // gridTemplateRows: "repeat(4, 20vw)",
    gridRowGap: "3vw",
    width: "100%",
    // [theme.breakpoints.down("lg")]: {
    //   gridTemplateRows: "repeat(4, 24vw)",
    // },
    // [theme.breakpoints.down("md")]: {
    //   gridTemplateRows: "repeat(4, 28vw)",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   gridTemplateRows: "repeat(4, 32vw)",
    // },
  },
  events_item_universal: {
    backgroundColor: "#FFFFFF",
    fontWeight: "bold",
    height: "30vh",
    "& p":{
      fontSize: "1.2rem",
      marginTop: "2rem"
    },
    "& hr":{
      display: "none"
    },
    "& a":{
      margin: 0,
      padding:0,
      color: "black",
      textDecoration: "blink",
    },
    "& img":{
      width: "6vw",
      height: "5px",
      marginTop: "0.5vw",
      marginBottom: "2vw"
    },
  },
  bottom_section: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, 2vw)",
    gridRowGap: "18rem",
    gridColumnGap: "0rem",
    paddingLeft: "15rem",
    paddingRight: "12rem",
    height: "100%",
    [theme.breakpoints.down("md")]:{
        paddingLeft: "9rem",
        paddingRight: "5rem"
    },
    [theme.breakpoints.down("sm")]:{
        paddingLeft: "6rem",
        paddingRight: "3rem"
    },
  },
  bottom_section_item: {
    width: "90%",
    height: "15vw",
    cursor: "pointer",
    backgroundSize: "cover",
    [theme.breakpoints.up("xl")]: {
        width: "90%"
    },
    [theme.breakpoints.down("md")]: {
        width: "90%"
    },
    [theme.breakpoints.down("sm")]:{
        width: "90%",
    },
    [theme.breakpoints.down("xs")]:{
        fontSize: "130%",
    },
    "& p":{
      fontSize: "2em",
      marginTop: "6.5vw",
      textAlign: "center",
      marginBottom: "2vw",
      fontWeight: "bold",
      color: "#FFFFFF",
      [theme.breakpoints.down("md")]: {
        fontSize: "1.5em"
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1em",
      }
    }
  },
  
  
  // Mantyharju-theme ends, rest of the code can be deleted before production

/*
  root: {
    height: "100vh"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  buttonSection: {
    textAlign: "center",
    opacity: 0.8
  }
  */
});