import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    height: "90vh",
    overflow: "hidden"
  },
  heroItem: {
    position: "relative",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  heroImage: {
    width: "100%"
  },
  heroContent: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  heroContentBlock: {
    maxWidth: "100vw",
    [theme.breakpoints.up("md")]: {
      maxWidth: "70vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "50vw",
    },
    display: "flex",
    marginLeft: "5%",
    marginRight: "5%",
    flexDirection: "column",
    "& h1": {
      [theme.breakpoints.down(414)]: {
        fontSize: "2.5rem"
      },
      [theme.breakpoints.up("xl")]: {}
    },
    "& p": {
      fontSize: 16
    },
    // Media queries require single quotes
    // tslint:disable-next-line: quotemark
    '@media only screen and (max-width:1280px) and (min-width:960px) and (max-height:750px)': {
      marginTop: "130px",
      "& h1": {
        fontSize: "3.5rem"
      }
    }
  },
  hero: {
    paddingTop: 130,
    height: "90vh",
    display: "flex",
    alignItems: "center",
    "& .wp-block-cover": {
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      "&.has-background-dim.hero:before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 1,
      },
      "& .wp-block-cover__video-background": {
        minWidth: "100%",
        minHeight: "100%",
        [theme.breakpoints.down("sm")]: {
          height: "100%"
        }
      }
    }
  },
  heroContentContainer: {
    marginLeft: "5%",
    marginRight: "5%",
    [theme.breakpoints.up("md")]: {
      width: "70vw",
      marginRight: 0,
    },
    [theme.breakpoints.up("lg")]: {
      width: "75vw",
    },
    [theme.breakpoints.up("xl")]: {
      width: "60vw",
    },
    "& p": {
      fontSize: 16,
      fontFamily: theme.typography.subtitle2.fontFamily,
      margin: 0,
      [theme.breakpoints.up("lg")]: {
        fontSize: 18,
        lineHeight: 1.75
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: 20,
        lineHeight: 1.75
      }
    }
  },
  heroTitle: {
    margin: 0,
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: "normal",
    fontSize: "2.5rem",
    lineHeight: 1,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up(360)]: {
      fontSize: "2.75rem",
    },
    [theme.breakpoints.up(413)]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4rem",
    },
    // Media queries require single quotes
    // tslint:disable-next-line: quotemark
    '@media only screen and (max-width:1280px) and (min-width:960px) and (max-height:750px)': {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "4rem",
      marginLeft: "-6px"
    },
    [theme.breakpoints.up(1367)]: {
      fontSize: "4.5rem",
      marginLeft: "-7px"
    },
    [theme.breakpoints.up(1600)]: {
      fontSize: "5rem"
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "6rem",
      lineHeight: "6.75rem",
      marginLeft: "-8px"
    },
    [theme.breakpoints.up(2000)]: {
      fontSize: "7rem",
      marginLeft: "-9px"
    },
  },
  heroText: {
    [theme.breakpoints.down(414)]: {
      fontSize: 14
    },
    fontFamily: theme.typography.subtitle2.fontFamily,
    color: theme.palette.primary.main,
    marginBottom: 0,
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
    }
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(5),
    fontSize: "1rem",
    [theme.breakpoints.up(413)]: {
      width: 300
    },
    [theme.breakpoints.up("xl")]: {}
  }
});