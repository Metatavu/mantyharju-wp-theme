import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    flexDirection: "column",
    position: "fixed",
    overflow: "auto",
    top: 50,
    width: "100vw",
    padding: "0 20px",
    height: "calc(100% - 50px)",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: 100
  },
  menuGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(4)
  },
  link: {
    marginBottom: "2rem"
  },
  subLink: {
    marginBottom: "1rem",
    fontFamily: theme.typography.body1.fontFamily,
    lineHeight: 1.2,
    marginLeft: "0.8rem"
  },
  controlContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: theme.spacing(2),
    position: "fixed",
    right: 18
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  close: {
    fontSize: 12,
    textTransform: "initial"
  },
  closeIcon: {
    fontSize: 40
  }
});