import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/mantyharju-images/mantyharju-images/hero-image-mantyharju.jpg";

const { breakpoints } = theme;

const sidePaddingSm = "0 2rem";
const sidePaddingMd = "0 4rem";
const sidePaddingLg = "0 6rem";
const sidePaddingXl = "0 8rem";

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

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    height: "fit-content",
    [breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)"
    },
  },

  card: {
    margin: "2rem",
    padding: "2rem",
    "& a, a:hover, a:visited, a:focus": {
      color: theme.palette.primary.dark
    }
  },

  media: {
    height: "15rem"
  },

  grid: {
    flex: 1,
    display: "grid",
    gridGap: 1,
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridGap: 1,
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    }
  },

  container: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 1500,
    [theme.breakpoints.up("md")]: {
      width: "90vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "85vw",
    },
    [theme.breakpoints.up("xl")]: {
      width: "80vw",
    }
  },


  button: {
    color: "#fff"
  }

});