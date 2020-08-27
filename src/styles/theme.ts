import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const { breakpoints } = theme;

export default createMuiTheme({
  palette: {
    primary: {
      main: "#00AAAD",
      dark: "#019698"
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
    // Tell Material-UI what's the font-size on the html element.
    htmlFontSize: 16,
    fontFamily: "Open Sans, sans-serif",
    h1: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal"
    },
    h2: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal"
    },
    h3: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal"
    },
    h4: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal"
    },
    h5: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal"
    },
    body1: {
      fontFamily: "Rubik, sans-serif",
      fontWeight: "normal"
    },
    body2: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal"
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
          color: "#00AAAD"
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
          fontSize: 20,
        }
      },
      text: {
      },
      outlinedPrimary: {
      }
    },
    MuiInputBase: {
    },
    MuiInputLabel: {
    },
    MuiFormLabel: {
    },
    MuiInput: {
    }
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "primary",
    }
  }
});