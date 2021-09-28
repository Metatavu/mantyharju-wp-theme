import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const { breakpoints } = theme;

export default createMuiTheme({
  palette: {
    primary: {
      main: "#1068B3",
      dark: "#1076cc"
    },
    secondary: { 
      main: "#fff",
      dark: "#eee"
    },
    background: {
      default: "#ffffff",
      paper: "#F5EFEA"
    },
    text: {
      primary: "#000000",
      secondary: "#26201E",
      disabled: "#ddd",
      hint: "#eee"
    }
  },
  typography: {
    // Tells Material UI the font-size on the html element.
    htmlFontSize: 16,
    fontFamily: "Open Sans, sans-serif",
    h1: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 900
    },
    h2: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600
    },
    h3: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600
    },
    h4: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600
    },
    h5: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600
    },
    h6: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600
    },
    body1: {
      fontFamily: "Rubik, sans-serif",
      fontWeight: "normal"
    },
    body2: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal",
      fontSize: 16,
      lineHeight: "1.8rem"
    },
    subtitle1: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal",
      textTransform: "uppercase",
      fontSize: "14px",
      [breakpoints.up("sm")]: {
        fontSize: "16px",
      },
    },
    subtitle2: {
      fontFamily: "Rubik, sans-serif",
      fontWeight: 600
    }
  },
  overrides: {
    MuiBreadcrumbs: {
      li: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: 14,
        color: "#717171",
        "&:last-child": {
          color: "#1068B3"
        }
      },
      separator: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: 14,
        color: "#717171"
      }
    },
    MuiButton: {
      root: {
        borderRadius: 0,
        paddingLeft: "2rem",
        paddingRight: "2rem",
        "&:hover": {
          backgroundColor: "rgba(0, 170, 173, 0.9)"
        }
      },
      label: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        [breakpoints.up("sm")]: {
          fontSize: 16,
        },
        [breakpoints.up("md")]: {
          fontSize: 16,
        }
      },
      text: {
      },
      outlinedPrimary: {
      }
    },
    MuiListItem: {
      root: {
        "&.Mui-selected": {
          backgroundColor: "transparent",
          textDecoration: "underline",
          fontWeight: "bold"
        },
        "&.Mui-selected:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
          fontWeight: "bold"
        }
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: "#fff"
      }
    },
    MuiInputBase: {
    },
    MuiInputLabel: {
    },
    MuiFormLabel: {
    },
    MuiInput: {
    },
    MuiAccordion: {
      rounded: {
        borderRadius: 0,
        "&:last-child": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
        "&:first-child": {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }
      }
    },
    MuiAccordionDetails: {
      root: {
        flexDirection: "column"
      }
    }
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "primary",
    },
    MuiAccordion: {
      elevation: 0
    }
  }
});
