import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/mantyharju-images/mantyharju-images/kino_1920x334.jpg";

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
    marginBottom: 15,
    "& p.MuiTypography-body1": {
      fontSize: 14,
      [breakpoints.up("xl")]: {
        fontSize: 16,
      },
    }
  },

  media: {
    height: "15rem"
  },

  masornyGrid: {
    display: "flex",
    [breakpoints.up("md")]: {
      marginLeft: "-15px",
    },
    width: "100%"
  },

  masornyColumn: {
    [breakpoints.up("md")]: {
      paddingLeft: 15,
    },
    backgroundClip: "padding-box"
  },

  container: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%"
  },

  mobileContainer: {
    paddingTop: 20,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  column: {
    height: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  mobileColumn: {
    paddingTop: 50,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  line: {
    border: "1px solid rgba(0,0,0,0.1);"
  },

  button: {
    width: "100%",
    marginTop: theme.spacing(1),
    height: 35
  },

  dialogTitle: {
    display: "flex",
    margin: 0,
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff"
  },

  dialogContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },

  image: {
    width: "100%",
    paddingBottom: 10,
  },

  treeView: {
    maxWidth: "16,666%",
    flexBasis: "16,666%",
    flexGrow: 0
  },

  link: {
    paddingRight: 10,
    cursor: "pointer"
  },

  kinoInformation: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: 2150,
  },

  iFrame: {
    width: "100%",
    height: 400,
    [breakpoints.up("md")]: {
      height: 620
    },
    [breakpoints.up("lg")]: {
      width: 1200,
      height: 720
    },
    [breakpoints.up("xl")]: {
      width: 1720,
      height: 840
    }
  },

  sidebar: {
    flex: 1,
    backgroundColor: "#e4e9f7",
    padding: "2rem"
  },

  loadingIconContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: theme.spacing(2),
    [breakpoints.up("md")]: {
      paddingBottom: 0
    }
  },

  descriptionContainer: {
    "& p.MuiTypography-body1 p": {
      fontSize: 14,
      [breakpoints.up("xl")]: {
        fontSize: 16,
      },
    }
  },

  trailerDialog: {
    width: "100%",
    "& .MuiDialog-paperWidthXl": {
      [breakpoints.down("md")]: {
        width: "100%"
      },
    }
  },

  dialogPaper: {
    backgroundColor: "rgba(0,0,0,0)"
  }

});