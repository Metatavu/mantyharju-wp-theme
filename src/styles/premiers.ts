import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/mantyharju-images/mantyharju-images/kino_1920x334.jpg";
import strings from "../localization/strings";
import { Height } from "@material-ui/icons";

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
      height: "23vh",
      fontSize: "1.25em",
    },
    [breakpoints.up("md")]: {
      padding: sidePaddingLg,
      paddingTop: "6rem",
    },
    [breakpoints.up("lg")]: {
      padding: sidePaddingXl,
      height: "23vh",
    },
    [breakpoints.up("xl")]: {
      height: "23vh",
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

  card: {
    //background: theme.palette.background.paper,
    marginBottom: "15px",
    width: 900
  },

  media: {
    height: "15rem"
  },

  container: {
    paddingTop: "50px",
    paddingLeft: "15px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },

  column: {
    paddingTop: "50px",
    paddingLeft: "125px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },


  line: {
    border: "1px solid rgba(0,0,0,0.1);"
  },

  cardLine: {
    border: "1px solid rgba(0,0,0,0.1);",
    marginTop: 20
  },

  button: {
    color: "primary",
    variant: "contained",
    marginTop: theme.spacing(1),
    height: 35
  },

  dialogTitle: {
    margin: "0",
    background: "grey"
  },

  closeButton: {
    position: "absolute",
    right: 0,
    top: -3,
  },

  dialogContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },

  link: {
    paddingTop: 5,
    cursor: "pointer"
  },

  content: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 1310,
    [theme.breakpoints.up("md")]: {
      width: "90vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "85vw",
    },
    [theme.breakpoints.up("xl")]: {
      width: "75vw",
    }
  },

  image: {
    width: "100%",
    paddingBottom: 10
  },

  iFrame: {
    width: 600,
    height: 600,
    frameBorder: 0,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    title: strings.movie.watchTrailer
  },

  treeView: {
    maxWidth: "16,666%",
    flexBasis: "16,666%",
    flexGrow: 0
  },

  title: {
    paddingBottom: 30
  }
});