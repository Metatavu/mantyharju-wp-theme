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
    paddingTop: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: "100vh",
    zIndex: 1000,
    backgroundColor: "#fff",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 60,
    "& input": {
      height: 40
    }
  },
  searchLabel: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2)
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
    fontFamily: theme.typography.body1.fontFamily,
    lineHeight: "1rem",
    fontSize: "1rem",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  subLinkOfSubLink: {
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: 300,
    lineHeight: "1rem",
    fontSize: "1rem",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4)
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
  nav: {
    display: "flex",
    flexDirection: "column"
  },
  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    fontFamily: theme.typography.body1.fontFamily,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.body1.fontWeight,
    fontSize: 16,
    cursor: "pointer",
    paddingBottom: "1rem",
    borderBottom: "4px solid rgba(0,0,0,0)",
    transition: "border-bottom-color 0.2s ease-out",
    margin: "0 5px",
    "&.highlight": {
      borderBottomColor: theme.palette.primary.main
    }
  },
});