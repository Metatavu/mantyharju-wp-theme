import { createStyles } from "@material-ui/core";
import theme from "./theme";

const sidePaddingLg = "0 8rem";
const maxPageWidthXl = 2000;

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

  loadingIconContainer: {
    display: "flex",
    margin: "5rem",
    justifyContent: "center"
  },

  /**
   * Hero-image as background
   */
  heroImageDiv: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff",
    height:"50vh",
    padding: sidePaddingLg,
    paddingTop: "8rem",
    width:"100%",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: "40vh",
      fontSize: "1.25em",
    },
    "&:after": {
      zIndex: 1,
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.2)"
    }
  },
  heroLogo: {
    position: "relative",
    zIndex: 2,
    [theme.breakpoints.up("lg")]: {
      width: 500
    },
  },
  heroText: {
    position: "relative",
    zIndex: 2,
    fontSize: "3.5em",
    margin: "2rem 0",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5em"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
    }
  },
  heroButton: {
    zIndex: 2,
    color: "black",
    fontSize: "1em",
    backgroundColor: "#FFFFFF",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
    }
  },
  heroButtonPopularPages: {
    zIndex: 2,
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
    right: "8rem",
    },

  /**
   * Add events -div
   */
  addEventDiv: {
    display: "grid",
    alignSelf: "center",
    color: "#fff",
    width: "100%",
    padding: "2rem 8rem",
    minHeight: 300,
    flexDirection: "row",
    gridTemplateColumns: "50% 50%",
    [theme.breakpoints.up("xl")]: {
      maxWidth: maxPageWidthXl
    },
    [theme.breakpoints.down("sm")]: {
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
    marginTop: "4rem",
    padding: sidePaddingLg,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.up("xl")]: {
      maxWidth: maxPageWidthXl,
    },
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      flexDirection:"column",
      textAlign: "center",
      justifyContent: "center",
    },
  },
  postsColumn: {
    display: "flex",
    flex: 1,
    maxWidth: "25%",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "& linkedevents-event": {
      backgroundColor: "black",
    },
  },
  postsHeading: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
    "& h1": {
      marginLeft: "1rem",
      fontSize: 35,
      fontWeight: 600
    }
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
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    marginTop: "5rem",
    padding: "3rem 10rem 3rem 10rem",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    [theme.breakpoints.up("xl")]: {
      maxWidth: maxPageWidthXl
    },
    "& h1": {
      fontSize: 50,
      fontWeight: 600,
      alignSelf: "center",
      marginBottom: "4rem"
    }
  },
  eventsButtonRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0"
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
    backgroundColor: "#00AAAD",
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
    gridRowGap: "2rem",
    gridColumnGap: "1.5rem",
    width: "100%",
  },
  events_item_universal: {
    backgroundColor: "#FFFFFF",
    padding: "2rem",
    margin: 0,
    textAlign: "center",
    "& p": {
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    "& hr": {
      display: "none"
    },
    "& a": {
      margin: 0,
      padding:0,
      color: "black",
      textDecoration: "blink",
    },
    "& img": {
      width: "50%",
      height: "5px",
      marginTop: "2rem",
      marginBottom: "2rem"
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