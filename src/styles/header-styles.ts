import { createStyles } from "@material-ui/core";
import theme from "./theme";

const { breakpoints } = theme;

const hoverHighlight = "rgba(0,0,0,0.1)";

export default createStyles({
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 1rem",
    width: "100%",
    height: 57,
    backgroundColor: "#fff",
    zIndex: 10,
    position: "fixed",
    top: 0,
    [breakpoints.up("sm")]: {
      height: 57,
    },
    [breakpoints.up("md")]: {
      height: "initial",
      padding: "2rem 8rem 0",
      minHeight: 153,
      position: "relative",
    },
  },
  menuButton: {
    [breakpoints.up("md")]: {
      display: "none",
    }
  },
  logoBar: {
    width: 180,
    [breakpoints.up("sm")]: {
      width: 240
    },
    [breakpoints.up("lg")]: {
      width: "initial"
    }
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
    fontFamily: theme.typography.body1.fontFamily,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.body1.fontWeight,
    fontSize: 16,
    cursor: "pointer",
    paddingBottom: "1rem",
    borderBottom: "4px solid rgba(0,0,0,0)",
    transition: "border-bottom-color 0.2s ease-out",
    [breakpoints.up("md")]: {
      marginLeft: 20,
    },
    [breakpoints.up("lg")]: {
      marginLeft: 25
    },
    [breakpoints.up("xl")]: {
      marginLeft: 40,
    },
    "&.highlight": {
      borderBottomColor: theme.palette.primary.main
    }
  },
  menuItems: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: theme.typography.body1.fontFamily,
    color: theme.palette.primary.dark,
    fontWeight: theme.typography.body1.fontWeight,
    [breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
    [breakpoints.down("md")]: {
      fontSize: "0.75rem",
      marginLeft: 10,
    },
    [breakpoints.up("lg")]: {
      fontSize: "1rem",
      marginLeft: 35,
    },
    [breakpoints.up("xl")]: {
      marginLeft: 45,
    }
  },
  menuWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
    borderTop: "1px solid #ddd",
    marginTop: "1rem",
    "&.fixed": {
      marginTop: 0,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      boxShadow: "0 0 20px rgba(0,0,0,0.2)"
    }
  },
  mainMenu: {
    position: "relative",
    display: "flex",
    padding: "1rem 0 0",
    zIndex: 10,
  },
  subMenu: {
    position: "absolute",
    top: "100%",
    width: "100%",
    display: "flex",
    visibility: "hidden",
    paddingBottom: 0,
    paddingTop: "1rem",
    backgroundColor: "#fff",
    opacity: 0,
    transition: "opacity 0.2s ease-out",
    boxShadow: "0 6px 10px rgba(0,0,0,0.2)",
    "&.visible": {
      paddingBottom: "1rem",
      opacity: 1,
      visibility: "visible",
      "&:empty": {
        paddingBottom: "1rem",
        opacity: 0,
        visibility: "hidden",
      }
    }
  },
  subMenuLink: {
    display: "flex",
    padding: theme.spacing(1),
    fontWeight: 600,
    fontSize: 18,
    transition: "background 0.2s ease-out",
    "&:hover": {
      backgroundColor: hoverHighlight
    }
  },
  lowLevelLink: {
    display: "flex",
    padding: theme.spacing(1),
    fontSize: 16,
    transition: "background 0.2s ease-out",
    "&:hover": {
      backgroundColor: hoverHighlight
    }
  },
  mainMenuItem: {
    display: "flex",
    padding: "0 20px 0 20px",
    cursor: "pointer",
    transition: "background 0.2s ease-out",
    "&:hover": {
      backgroundColor: hoverHighlight
    }
  },
  localeMenu: {
    padding: theme.spacing(1),
    display: "inline",
    alignItems: "center",
    transition: "background 0.2s ease-out",
    "&:hover": {
      backgroundColor: hoverHighlight
    }
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between"
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    height: 40,
    marginLeft: "2rem",
    "& input": {
      backgroundColor: "#e4e9f7",
      border: 0,
      height: 40,
      width: 250,
      padding: "0 0.5rem",
      color: theme.palette.primary.main,
      fontFamily: "Rubic, sans-serif",
      fontStyle: "italic",
      "&:focus": {
        borderRadius: 0,
        outlineColor: theme.palette.primary.main
      }
    }
  },
  searchIconWrapper: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main
  },
  autocompleteItem: {
    cursor: "pointer",
    padding: "0.5rem 1rem",
    fontSize: 14,
    fontFamily: theme.typography.body1.fontFamily,
    transition: "background 0.2s ease-out",
    "&:hover": {
      backgroundColor: hoverHighlight
    }
  },
  topMenu: {
    display: "flex"
  },
  topMenuItem: {
    padding: "0.5rem 1rem",
    color: theme.palette.primary.main,
    fontSize: 14,
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: hoverHighlight
    }
  }
});