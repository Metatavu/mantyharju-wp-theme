import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
    },
    [theme.breakpoints.up("xl")]: {
      marginTop: theme.spacing(20),
      marginBottom: theme.spacing(20),
    },
    color: theme.palette.primary.dark,
    "& a": {
      fontFamily: theme.typography.h1.fontFamily,
      fontWeight: "normal",
      color: theme.palette.primary.dark
    }
  },
  content: {
    [theme.breakpoints.up("lg")]: {
      width: "80%"
    },
  },
  button: {}
});