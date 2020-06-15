import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  slide: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    minHeight: 200,
    color: theme.palette.text.secondary,
  },
  link: {
    color: theme.palette.primary.dark,
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row"
  },
  slideContent: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    height: 80,
    borderBottomWidth: 3,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.dark
  },
  slideText: {
    display: "flex",
    maxWidth: "60%"
  },
  linkBallIndicators: {
    display: "flex",
    justifyContent: "flex-end",
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(3)
  },
  indicator: {
    marginLeft: theme.spacing(1)
  },
  circle: {
    border: "1px solid #000000",
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "50%"
  },
  ball: {
    backgroundColor: "#000000",
    width: 0,
    height: 0,
    margin: "0.625rem",
    borderRadius: "50%",
    transition: "width 0.2s, height 0.2s, margin 0.2s"
  },
  fill: {
    backgroundColor: "#000000",
    width: "0.9rem",
    height: "0.9rem",
    margin: "0.1rem",
    borderRadius: "50%",
    transition: "width 0.2s, height 0.2s, margin 0.2s"
  }
});