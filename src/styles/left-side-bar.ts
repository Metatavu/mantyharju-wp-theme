import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    display: "flex",
    flex: 1,
    paddingBottom: "10px",
  },
  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    fontFamily: theme.typography.h2.fontFamily,
    color: "#1068B3",
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
  menuExpandedArrow: {
    marginLeft: "2vw",
    fontSize: "larger",
  },
});
