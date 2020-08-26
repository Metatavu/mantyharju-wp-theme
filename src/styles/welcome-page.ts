import { createStyles } from "@material-ui/core";
import theme from "./theme";

const sidePaddingSm = "0 2rem";
const sidePaddingMd = "0 4rem";
const sidePaddingLg = "0 6rem";
const sidePaddingXl = "0 8rem";
const maxPageWidthXl = 2000;

export default createStyles({
  /**
   * Mantyharju-theme front page styles
   */

  /**
   * TODO:
   * - Improve responsive design for buttons (small screens)
   * - Post columns styling
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
    height:" 40vh",
    padding: sidePaddingSm,
    paddingTop: "2rem",
    width:"100%",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      padding: sidePaddingMd,
      paddingTop: "4rem",
      height: "50vh",
      fontSize: "1.25em",
    },
    [theme.breakpoints.up("md")]: {
      padding: sidePaddingLg,
      paddingTop: "6rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: sidePaddingXl,
      paddingTop: "8rem",
    },
    [theme.breakpoints.up("xl")]: {

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
    fontSize: 20,
    margin: "2rem 0",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
    }
  },
  heroButton: {
    zIndex: 2,
    color: "black",
    fontSize: "1em",
    backgroundColor: "#FFFFFF",
    textTransform: "uppercase",
    [theme.breakpoints.up("sm")]: {
    }
  },
  heroButtonPopularPages: {
    zIndex: 2,
    color: "#fff",
    backgroundColor: "#00AAAD",
    cursor: "pointer",
    textTransform: "uppercase",
    fontSize: "4rem",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    justifyContent: "space-between",
    "& .MuiButton-label": {
      fontSize: 16
    },
      [theme.breakpoints.up("lg")]: {
        right: "8rem",
        width: "initial",
        left: "initial",
        "& .MuiButton-label": {
          fontSize: 20
        }
      }
    },

  /**
   * Add events -div
   */
  addEventDiv: {
    display: "flex",
    flexDirection: "column-reverse",
    alignSelf: "center",
    color: "#fff",
    width: "100%",
    minHeight: 300,
    marginTop: "2rem",
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
      padding: "2rem 8rem",
      display: "grid",
      flexDirection: "row",
      gridTemplateColumns: "50% 50%",
      maxWidth: maxPageWidthXl
    }
  },
  addEventImageDiv: {
    gridColumnStart: "1",
    gridColumnEnd: "1",
    width: "100%",
    minHeight: 200,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  },
  addEventTextDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem",
    gridColumnStart: "2",
    gridColumnEnd: "2",
    width: "100%",
    backgroundColor: "#00AAAD",
    [theme.breakpoints.up("sm")]: {
      padding: "2rem",
    }
  },
  addEventTextDivParagraph: {
    fontSize: "1rem"
  },
  addEventTextDivHeading: {
    fontSize: "36px",
    margin: "0",
    textDecoration: "none"
  },
  addEventImage: {
    width: "100%",
    height: "auto"
  },
  addEventButton: {
    display: "flex",
    alignSelf: "flex-start",
    color: "#000",
    backgroundColor: "#FFFFFF",
    textTransform: "uppercase"
  },

  /**
   * Posts section styles
   */
  postsContainer: {
    marginTop: "4rem",
    padding: sidePaddingSm,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      padding: sidePaddingSm,
    },
    [theme.breakpoints.up("md")]: {
      padding: sidePaddingLg,
    },
    [theme.breakpoints.up("lg")]: {
      padding: sidePaddingXl,
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: maxPageWidthXl,
    },
  },
  postsColumn: {
    display: "flex",
    flex: 1,
    maxWidth: "100%",
    flexDirection: "column",
    marginBottom: "2rem",
    [theme.breakpoints.up("sm")]: {
      width: "25%",
      margin: "0 1rem"
    },
    [theme.breakpoints.up("md")]: {
      width: "25%",
      margin: "0 2rem"
    },
    [theme.breakpoints.up("lg")]: {
      marginBottom: 0,
      margin: "0 4rem"
    },
    "& .linkedevents-event": {
      backgroundColor: "black",
    },
  },
  postsHeading: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
    "& h1": {
      marginLeft: "1rem",
      fontSize: 26,
      fontWeight: 600,
      [theme.breakpoints.up("sm")]: {
        fontSize: 26,
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 36,
      }
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
      color: "#000",
      textDecoration: "blink",
    },
    "& hr":{
      color: "#000",
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
    "& p": {
      margin: 4,
      padding: 0,
      fontFamily: theme.typography.body1.fontFamily
    },
    "& hr": {
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
    padding: 0
  },
  postColumnButton: {
    color: "#fff",
    backgroundColor: "#00AAAD",
    marginTop: "1rem",
    textTransform: "uppercase",
    maxWidth: 270,
    [theme.breakpoints.up("sm")]: {
      marginTop: "2rem",
    }
  },

  /**
   * LinkedEvents section styles
   */

  linkedEventsContainer: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    marginTop: "2rem",
    padding: "2rem",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    [theme.breakpoints.up("sm")]: {
      marginTop: "3rem",
      padding: sidePaddingMd,
      paddingTop: "2rem"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "5rem",
      padding: sidePaddingLg,
      paddingTop: "2rem"
    },
    [theme.breakpoints.up("lg")]: {
      padding: sidePaddingXl,
      paddingTop: "3rem"
    },
    [theme.breakpoints.up("xl")]: {
      padding: "3rem 10rem 3rem 10rem",
      maxWidth: maxPageWidthXl
    },
    "& h1": {
      fontSize: 32,
      fontWeight: 600,
      alignSelf: "center",
      marginBottom: "2rem",
      [theme.breakpoints.up("xl")]: {
        fontSize: 50,
        marginBottom: "4rem"
      }
    }
  },
  legendWrapper: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
    [theme.breakpoints.up("xl")]: {
      marginBottom: "4rem"
    }
  },
  legend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 1rem"
  },
  legendColor: {
    height: 8,
    width: 25,
    marginRight: "1rem"
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
    color: "#fff",
    width: 270
  },
  addLinkedEventButton: {
    backgroundColor: "#00AAAD",
    textTransform: "uppercase",
    marginLeft: "1rem",
    color: "#fff",
    marginTop: "2rem",
    width: 270
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridRowGap: "2rem",
      gridColumnGap: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    }
  },
  events_item_universal: {
    backgroundColor: "#FFFFFF",
    padding: "1rem 1rem 2rem 1rem",
    textAlign: "center",
    margin: 0,
    cursor: "pointer",
    marginBottom: "1rem",
    transition: "box-shadow 0.2s ease-out",
    [theme.breakpoints.up("sm")]: {
      marginBottom: 0,
      padding: "2rem 2rem 4rem 2rem",
    },
    "& p": {
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    "& hr": {
      display: "none"
    },
    "& a": {
      margin: 0,
      padding: 0,
      color: "#000",
      textDecoration: "blink",
    },
    "& img": {
      width: "33.33%",
      height: "6px",
      marginBottom: "2rem",
      transition: "width 0.2s ease-out"
    },
    "&:hover": {
      boxShadow: "0 0 20px rgba(0,0,0,0.2)"
    },
    "&:hover img": {
      width: "50%"
    },
  },
  bottom_section: {
    display: "flex",
    flexDirection: "column",
    gridGap: "2rem",
    padding: sidePaddingSm,
    margin: "2rem 0",
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      padding: sidePaddingMd,
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      padding: sidePaddingLg,
      margin: "4rem 0",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      padding: sidePaddingXl,
    },
  },
  bottom_section_item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 250,
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backgroundBlendMode: "soft-light",
    backgroundSize: "cover",
    [theme.breakpoints.up("md")]: {
      transition: "background-color 0.2s ease-out, box-shadow 0.2s ease-out",
      "&:hover": {
        backgroundColor: "#267b7d",
        boxShadow: "0px 0px 30px rgba(0,0,0,0.2)",
      },
    },
    "& p":{
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFFFFF",
      textAlign: "center",
      margin: "2rem",
      textShadow: "0 0 20px rgba(0,0,0,0.5)",
      [theme.breakpoints.up("lg")]: {
        fontSize: 28,
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: 34,
      },
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