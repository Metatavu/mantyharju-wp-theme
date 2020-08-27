import { createStyles } from "@material-ui/core";
import theme from "./theme";

const { breakpoints } = theme;

export default createStyles({
  treeWrapper: {
    flex: 1,
    "& > div": {
      outline: 0
    }
  },
  listRoot: {
    width: "70%",
  },
  parentListItem: {
    display: "flex",
    justifyContent: "space-between",
    margin: 0,
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
    "&:hover a": {
      textDecoration: "underline"
    },
    "&.open a": {
      fontWeight: "bold"
    }
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    margin: 0,
    color: "#000",
    textDecoration: "none",
    "& a": {
      textDecoration: "none",
      color: theme.palette.text.secondary,
    },
    "&:hover a": {
      textDecoration: "underline"
    }
  },
  iconWrapper: {
    cursor: "pointer",
    display: "inline-block",
    marginLeft: 10,
    "& .MuiSvgIcon-root": {
      borderRadius: "50%",
      transition: "background-color 0.2s ease-out"
    },
    "&:hover  .MuiSvgIcon-root": {
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  }
});