import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {},
  footerBackground: {
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  footerPosts: {
    display: "flex",
    width: "100%",
    backgroundColor: "#000",
    flexDirection: "column",
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    }
  },
  footerPost: {
    padding: theme.spacing(5),
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(8),
    },
    "& h3": {
      fontSize: "2.5rem",
      lineHeight: 1.2
    },
    "&:nth-child(1)": {
      backgroundColor: "#2E2E50"
    },
    "&:nth-child(2)": {
      backgroundColor: theme.palette.secondary.main,
      "& p": {
        display: "none"
      }
    },
    "&:nth-child(3)": {
      backgroundColor: "#ffffff",
      "& .MuiTypography-h3": {
        paddingBottom: theme.spacing(6),
        lineHeight: 1.2
      }
    }
  },
  footerdata: {
    width: 300,
    marginBottom: theme.spacing(5)
  },
  carouselWrapper: {
    display: "grid",
    justifyContent: "center"
  },
  carouselItem: {
    gridColumn: 1,
    gridRow: 1
  },
  carouselImg: {
    maxHeight: "5rem",
    maxWidth: "95%",
    padding: 0
  },
  contentContainer: {
    [theme.breakpoints.up("md")]: {
      height: "calc( 100vh - 60px )",
      padding: theme.spacing(10)
    },
    backgroundColor: "rgba(45, 45, 45, 0.8)"
  },
  logoAndSomeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(5),
    paddingTop: 20,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      justifyContent: "none",
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: 0
    }
  },
  imageContainer: {
      "& img": {
        width: "100%"
      }
  },
  someLinkContainer: {
    margin: theme.spacing(2)
  },
  someLink: {
    color: "#ffffff"
  },
  iconLink: {
    fontSize: "2rem",
    float: "right",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      fontSize: "2.2rem",
      marginLeft: theme.spacing(3)
    }
  },
  logo: {
    float: "left"
  },
  button: {
    fontSize: "1rem",
    width: "100%",
    [theme.breakpoints.down(414)]: {
      width: "100%"
    },
    [theme.breakpoints.down(960)]: {
      width: 300
    },
    [theme.breakpoints.up("lg")]: {
      width: 300
    }
  },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap-reverse",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 150,
      flexWrap: "nowrap",
    }
  },
  menuGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      marginRight: 60,
    },
    [theme.breakpoints.up("md")]: {
      marginRight: 100,
    },
    [theme.breakpoints.up("lg")]: {},
    "&:last-child": {
      marginRight: 0
    }
  },
  link: {
    marginBottom: "2rem"
  },
  subLink: {
    marginBottom: "1rem"
  },
  contactsMenu: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    },
    "& h3": {
      margin: 0,
    }
  }
});