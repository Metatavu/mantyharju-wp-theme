import { createStyles } from "@material-ui/core";
import theme from "./theme";

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
  },
  menuItems: {
    display: "flex",
    flexDirection: "column",
    marginRight: "2vw",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: theme.typography.h3.fontFamily,
    color: theme.palette.primary.main,
  },
  mainMenu: {
    display: "flex",
    paddingBottom: "10px",
  },
  menuExpandedArrow: {
    marginLeft: "2vw",
    fontSize: "larger",
  },
});
