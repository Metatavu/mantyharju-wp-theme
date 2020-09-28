import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/mantyharju-images/mantyharju-images/hero-image-mantyharju.jpg";

const { breakpoints } = theme;

const sidePaddingSm = "0 2rem";
const sidePaddingMd = "0 4rem";
const sidePaddingLg = "0 6rem";
const sidePaddingXl = "0 8rem";

const hoverHighlight = "rgba(0,0,0,0.1)";

export default createStyles({

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

  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },

  pageContent: {
    marginTop: "3rem",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 960,
    padding: "0 2rem 1rem",
    [breakpoints.up("md")]: {
      padding: "0 4rem 2rem"
    },
    [breakpoints.up("lg")]: {
      padding: "0 6rem 2rem"
    },
    [breakpoints.up("xl")]: {
      padding: "0 8rem 2rem"
    },
  },
  contentarea: {
    display: "flex",
    flexDirection: "column",
    flex: 3,
    "& .wp-block-group__inner-container": {
      marginTop: "1em",
      marginBottom: "1em",
      "& h3": {
        marginBlockStart: 0,
        marginBlockEnd: 0
      },
      "& p": {
        marginBlockStart: 0,
        marginBlockEnd: 0
      },
    },
  },
  backlink: {
    padding: "0.5rem 1rem",
    color: theme.palette.primary.main,
    fontSize: 14,
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: hoverHighlight
    }
  }
});