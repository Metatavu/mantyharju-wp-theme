import { createStyles } from "@material-ui/core";
import theme from "./theme";
// import headerImage from "../resources/img/headerImage.png";

const hoverHighlight = "rgba(0,0,0,0.1)";

export default createStyles({
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "1rem 2rem 0",
    [theme.breakpoints.up("sm")]: {
      padding: "2rem 8rem 0",
    },
  },
  logoBar: {
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
      marginLeft: 10,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
      marginLeft: 35,
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 45,
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
      marginLeft: 10,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
      marginLeft: 35,
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 45,
    }
  },
  menuWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
    borderTop: "1px solid #ddd",
    marginTop: "1rem"
  },
  mainMenu: {
    display: "flex",
    padding: "1rem 0 0",
  },
  subMenu: {
    position: "absolute",
    top: "100%",
    width: "100%",
    display: "flex",
    visibility: "hidden",
    marginLeft: "2rem",
    paddingBottom: 0,
    paddingTop: "1rem",
    backgroundColor: "#fff",
    opacity: 0,
    transition: "opacity 0.2s ease-out",
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
      backgroundColor: "#E6F1F0",
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