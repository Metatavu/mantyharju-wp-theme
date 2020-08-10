import { createStyles } from "@material-ui/core";
import theme from "./theme";
// import headerImage from "../resources/img/headerImage.png";

export default createStyles({
  logoBar: {
    marginLeft: "10%",
    width: "50%",
  },
  nav: {
    display: "flex",
    flexDirection: "row",
  },
  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    fontFamily: theme.typography.h2.fontFamily,
    color: "#00AAAD",
    cursor: "pointer",
    // [theme.breakpoints.down("sm")]:{
    //   fontSize: "0.75rem",
    // },
    // [theme.breakpoints.down("md")]: {
    //   fontSize: "0.75rem",
    //   marginLeft: 10,
    // },
    // [theme.breakpoints.up("lg")]: {
    //   fontSize: "1rem",
    //   marginLeft: 35,
    // },
    // [theme.breakpoints.up("xl")]: {
    //   marginLeft: 45,
    // }
  },
  menuItems: {
    display: "flex",
    flexDirection: "column",
    marginRight: "2vw",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: theme.typography.h3.fontFamily,
    color: theme.palette.primary.main,
    // [theme.breakpoints.down("sm")]:{
    //   fontSize: "0.75rem",
    // },
    // [theme.breakpoints.down("md")]: {
    //   fontSize: "0.75rem",
    //   marginLeft: 10,
    // },
    // [theme.breakpoints.up("lg")]: {
    //   fontSize: "1rem",
    //   marginLeft: 35,
    // },
    // [theme.breakpoints.up("xl")]: {
    //   marginLeft: 45,
    // }
  },
  mainMenu: {
    display: "flex",
    marginLeft: "8vw",
    paddingBottom: "10px",
  },
  menuExpandedArrow: {
    marginLeft: "2vw",
    fontSize: "larger",
  },
});