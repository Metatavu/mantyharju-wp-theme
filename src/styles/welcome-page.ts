import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/mantyharju-images/mantyharju-images/hero-front-1600x1080.jpg";

export default createStyles({
  /**
   * Mantyharju-theme
   */

   /**
    * Hero-image as background 
    * TODO: 
    * - Improve responsive design for texts and button
    */
  heroImageDiv: {
    backgroundImage: `url(${hero})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff",
    height:"35vw",
    maxHeight:"50vw",
    paddingLeft: "8vw",
    paddingRight: "8vw",
    paddingTop: "8vw",
    width:"100%"
  },
  heroText: {
    fontSize: "3.5em",
    marginTop: "2vw",
    marginBottom: "2vw",
    fontWeight: "bold",
    fontStyle: "italic"
  },
  heroButton: {
    color: "black",
    backgroundColor: "#FFFFFF",
  },
  /**
   * TODO:
   * - Position bottom right of the parent 
   */
  heroButtonPopularPages: {
    color: "#fff",
    backgroundColor:"#00AAAD",
    position: "absolute",
    bottom: "3.5vw",
    right: "3vw"
    },

  /**
   * Add events -div
   */
  addEventDiv: {
    display:"flex",
    flexDirection:"row",
    width: "90%",
    marginTop: "1vw",
    marginLeft:"5%",
    marginBottom: "5%",
    marginRight:"5%",
    height:"25vw"
  },
  addEventImageDiv: {
    width: "50%",
    height:"25vw"
  },
  addEventTextDiv: {
    maxWidth: "50%",
    backgroundColor:"#00AAAD",
    maxHeight:"25vw",
    paddingLeft: "5vw",
    paddingRight: "5vw"
  },
  addEventImage: {
    width: "100%",
    height: "25vw"
  },

  /**
   * Posts section styles
   */
  postsContainer: {
    height: "100vh",
    width: "100%",
    paddingRight: "6rem",
    paddingLeft: "6rem",
    display: "flex",
    flexDirection:"row",

    [theme.breakpoints.down("sm")]: {
      flexDirection:"column",
      minHeight: "100vh",
      textAlign: "center"
    },
  },
  postsColumn: {
    minHeight: "90vw",
    marginRight: "5rem",
    width: "33.33%",
    display: "table",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "3rem"
    },
  },
  allPosts: {
    marginTop: "3rem",

  },

  /**
   * Nested paragraph comes from wordpress
   */
  singlePost: {
    '& p':{
      margin: 0,
      padding:0,
    },
    marginBottom: "2rem"
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

  
  //LinkedEvents section styles

  eventsContainer: {
    marginTop: "5vw",
    width: "100%",
    alignContent: "center",
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
  },
  menuButtonOne: {
    backgroundColor: "#386dc2",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#386dc2"
    }
  },
  menuButtonTwo: {
    backgroundColor: "#ffdf3d",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#ffdf3d"
    }
  },
  menuButtonThree: {
    backgroundColor: "#59a345",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#59a345"
    }
  },
  menuButtonFour: {
    backgroundColor: "#de782a",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#de782a"
    }
  },
  logoBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "298px",
    marginBottom: 50
  },
  localeMenu: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between"
  },*/
});
