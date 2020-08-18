import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default createMuiTheme({
  palette: {
    primary: {
      main: "#082b45",
      dark: "#26201E"
    },
    secondary: { main: "#C24A49" },
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
      fontWeight: "normal"
    },
    subtitle2: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0
      },
      label: {
        fontSize: 20,
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 600
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
  }
});