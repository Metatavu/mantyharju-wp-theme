import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/mantyharju-images/mantyharju-images/hero-image-mantyharju.jpg";

const { breakpoints } = theme;

const sidePaddingSm = "0 2rem";
const sidePaddingMd = "0 4rem";
const sidePaddingLg = "0 6rem";
const sidePaddingXl = "0 8rem";

export default createStyles({
  /**
   * Mantyharju-theme single event page styles
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
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${hero})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff",
    height: "40vh",
    padding: sidePaddingSm,
    width: "100%",
    position: "relative",
    overflow: "hidden",
    [breakpoints.up("sm")]: {
      padding: sidePaddingMd,
      height: "40vh",
      fontSize: "1.25em",
    },
    [breakpoints.up("md")]: {
      padding: sidePaddingLg,
      paddingTop: "6rem",
    },
    [breakpoints.up("lg")]: {
      padding: sidePaddingXl,
      height: "40vh",
    },
    [breakpoints.up("xl")]: {
      height: "40vh",
    },
    "&:after": {
      zIndex: 1,
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    textShadow: "0 0 25px rgba(0,0,0,0.2)",
    "& h2": {
      fontSize: 20,
      [breakpoints.up("sm")]: {
        fontSize: 30,
      },
      [breakpoints.up("md")]: {
        fontSize: 35,
      },
      [breakpoints.up("lg")]: {
        fontSize: 40,
      }
    }
  },
  heroText: {
    fontSize: 30,
    marginBottom: "2rem",
    fontWeight: 800,
    [breakpoints.up("sm")]: {
      fontSize: 40,
    },
    [breakpoints.up("md")]: {
      fontSize: 45,
    },
    [breakpoints.up("lg")]: {
      fontSize: 45,
    }
  },
  currentPageLink: {
    color: "#1068B3",
  },
  dividerLine: {
    color: "black",
    opacity: "60%"
  },
  event: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: sidePaddingSm,
    marginTop: "2rem",
    marginBottom: "2rem",
    "& h2": {
      marginBottom: "1rem",
      [breakpoints.up("sm")]: {
        marginBottom: "2rem",
      },
    },
    [breakpoints.up("sm")]: {
      padding: sidePaddingMd
    },
    [breakpoints.up("md")]: {
      flexDirection: "row",
      padding: sidePaddingLg
    },
    [breakpoints.up("lg")]: {
      padding: sidePaddingXl
    },
    [breakpoints.up("xl")]: {

    },
  },
  eventColumn: {
    flex: 1,
    [breakpoints.up("md")]: {
      marginLeft: "2rem",
      "&:first-child": {
        marginLeft: 0
      }
    }
  },
  eventLeftColumn: {
    marginBottom: "1rem",
    [breakpoints.up("sm")]: {
      marginBottom: "2rem"
    },
    [breakpoints.up("md")]: {
      marginBottom: 0
    },
    "& h6": {
      marginBottom: "1rem",
      [breakpoints.up("sm")]: {
        marginBottom: "2rem"
      }
    }
  },
  image_styles: {
    width: "100%",
  },
  topPageContent: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    margin: "0vw 8vw 4vw 12vw",
    height: "fit-content"
  }
});