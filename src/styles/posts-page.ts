import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/mantyharju-images/mantyharju-images/hero-image-mantyharju.jpg";
import { AvRepeat } from "material-ui/svg-icons";

export default createStyles({
  /**
   * Mantyharju-theme front page styles
   */

   /**
    * TODO: 
    * - Improve responsive design for buttons (small screens)
    * - Post columns styling
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
    height:"20vw",
    maxHeight:"30vw",
    paddingLeft: "8vw",
    paddingRight: "8vw",
    paddingTop: "5vw",
    width:"100%",
    position: "relative",
    [theme.breakpoints.down("sm")]:{
      height: "40vw",
      fontSize: "1.25em",
    }
  },
  heroText: {
    fontSize: "3.5em",
    alignContent: "center center",
    alignItems: "center",
    marginTop: "2vw",
    marginBottom: "2vw",
    fontWeight: "bold",
    // fontStyle: "italic",
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
  breadcrumb: {
    width: "83%",
    marginLeft: "8%",
    marginBottom: "3rem",
    color: "#00AAAD"
  },
  currentPageLink: {
      color: "#00AAAD",
  },
  dividerLine: {
    color: "black",
    opacity: "60%"
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, 10vw)",
    gridRowGap: "18rem",
    gridColumnGap: "0rem",
    paddingLeft: "12rem",
    paddingRight: "8rem",
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
  gallery_img: {
    width: "90%",
    height: "15vw",
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
    }
  },
});