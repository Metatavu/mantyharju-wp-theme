import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    flexDirection: "column",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0,
    width: "100vw",
    padding: "0 20px",
    height: "100vh",
    zIndex: 1000,
    backgroundColor: "#fff",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: 80
  },
  menuGroup: {
    display: "flex",
    flexDirection: "column",
    minHeight: 50,
    justifyContent: "center",
    "& > a": {
      marginLeft: 16
    }
  },
  link: {
  },
  subLink: {
    marginBottom: "1rem",
    fontFamily: theme.typography.body1.fontFamily,
    lineHeight: 1.2,
    marginLeft: "1rem"
  },
  subLinkOfSubLink: {
    marginBottom: "1rem",
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: 300,
    lineHeight: 1.2,
    marginLeft: "2rem"
  },
  controlContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: theme.spacing(2),
    position: "fixed",
    right: theme.spacing(1),
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
});