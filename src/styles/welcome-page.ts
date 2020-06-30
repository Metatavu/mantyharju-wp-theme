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
    * 
    * NOTE: Try using rem instead of em..
    */

   /**
    * General front page styles
    */
   generalButtonStyle: {
    paddingTop: "0.4em",
    paddingBottom: "0.4em",
    paddingLeft: "1em",
    paddingRight: "1em",
    pointerEvents: "auto",
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
    pointerEvents: "none",
    textTransform: "uppercase",
    position: "absolute",
    bottom: "0",
    right: "5vw",
    [theme.breakpoints.down("sm")]:{
      fontSize: "0.5em",
    }
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
    minHeight:"30vw",
    color: "fff"
  },
  addEventImageDiv: {
    width: "50%",
    height:"30vw"
  },
  addEventTextDiv: {
    maxWidth: "50%",
    backgroundColor:"#00AAAD",
    height:"30vw",
    paddingLeft: "5vw",
    paddingRight: "10vw",
    paddingTop: "2vw",
    [theme.breakpoints.down("sm")]:{
      paddingRight: "0.1vw",
      lineHeight: "1.4rem",
      fontSize: "0.7rem"
    },
    [theme.breakpoints.down("xs")]:{
      lineHeight: "0.8rem",
      fontSize: "0.5rem"
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
    fontSize: "2.5vw",
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
                            
  //Announcement post styles

  announcementsContainer: {
    paddingLeft: "40%",
    display: "table",
    alignItems: "middle",
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
  }
  */
});