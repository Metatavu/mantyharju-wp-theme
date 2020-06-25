import { createStyles } from "@material-ui/core";
import theme from "./theme";
// import headerImage from "../resources/img/headerImage.png";

export default createStyles({
  logoBar: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
    marginLeft: "10%",
    width: "50%",
    // marginBottom: 50
  },
  nav: {
    display: "flex",
    flexDirection: "row",
  },
  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // whiteSpace: "nowrap",
    height: 80,
    textDecoration: "none",
    fontFamily: theme.typography.h3.fontFamily,
    color: theme.palette.primary.main,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]:{
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
      marginLeft: 10,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
      marginLeft: 35,
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 45,
    }
  },
  mainMenu: {
    paddingInlineStart: "100px",
  },
  localeMenu: {
    display: "inline",
    alignItems: "center",
  },
  searchSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    height: "40px",
    marginRight: "10%",
    alignItems: "right"
  }
});