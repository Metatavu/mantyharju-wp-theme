import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({})

const pendingColor = "#fff";
const waitingColor = "#AA58EA";
const reservedColor = "#EA5858";
const inProgressColor = "#EADB58";
const completeColor = "#86EA58";
const cancelledColor = "#888";


export default createMuiTheme({

  palette: {
    primary: { 
      main: "#dadada",
      light: "#dadada",
      dark: "#888",
    },
    secondary: { 
      main: "#60CFFE"
    },
    success: {
      main: "#86EA58"
    },
    background: {
      default: "#1c1c1c",
      paper: "#2d2d2d",
    },
    text: {
      primary: "#dadada",
      secondary: "#888"
    },
    error: red,
  },

  typography: {
    h2: {
      fontWeight: "bold",
      fontSize: "24px",
      [breakpoints.down( 376 )]: {
        fontSize: "16px"
      },
    },
    h3: {
      fontWeight: "bold",
      fontSize: "20px",
      [breakpoints.down( 376 )]: {
        fontSize: "16px"
      },
    },
    body1: {
      [breakpoints.down( 376 )]: {
        fontSize: 14
      },
    }
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: "#60CFFE",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 4
      }
    },
    MuiToolbar: {
      root: {
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      },
      regular: {
        [ breakpoints.up("sm") ]: {
          minHeight: 50
        }
      }
    },
    MuiInputBase: {
      root: {
        color: "#60CFFE",
      },
      input: {
        "&.Mui-disabled": {
          color: "#666"
        }
      },
    },
    MuiInput: {
      underline: {
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid rgba(255,255,255,0.2)",
        },
        "&:after": {
          borderBottom: "2px solid #60CFFE"
        }
      }
    },
    MuiTable: {
      root: {
        backgroundColor: "#1c1c1c",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }
    },
    MuiTableCell: {
      root: {
        padding: 8,
        borderRight: "1px solid rgba(255,255,255,0.1)",
        borderBottom: 0,
        color:"inherit !important",
      },
      head: {
        backgroundColor: "#1c1c1c",
        color: "#888",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      },
      body: {
        "& .status-indicator": {
          backgroundColor: "#1c1c1c",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 30,
          height: 30,
          borderRadius: "50%",        
          "& .inner": {
            width: 14,
            height: 14,
            borderRadius: "50%",
            "&.pending": {
              backgroundColor: pendingColor
            },
            "&.waiting": {
              backgroundColor: waitingColor
            },
            "&.reserved": {
              backgroundColor: reservedColor
            },
            "&.inprogress": {
              backgroundColor: inProgressColor
            },
            "&.complete": {
              backgroundColor: completeColor
            },
            "&.canceled": {
              backgroundColor: cancelledColor
            }
          }
        }
      }
    },
    MuiTableRow: {
      root: {
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
          cursor: "pointer",
          "&.selected": {
            backgroundColor:"rgba(40,40,40,1)"
          },
        },
        "&.selected": {
          backgroundColor:"rgba(40,40,40,1)",
          color:"#60CFFE",
          "&.my-job": {
            color:"#60CFFE"
          },
          "&.not-my-job": {
            color:"#60CFFE"
          },
          "&.cancelled": {
            color:"#60CFFE",
            backgroundColor:"rgba(0,0,0,0.1)"
          }
        },
        "&.my-job": {
          color:"#fff"
        },
        "&.not-my-job": {
          color:"gray"
        },
        "&.cancelled": {
          color:"gray",
          backgroundColor:"rgba(0,0,0,0.1)"
        }
      },
      head: {
        backgroundColor: "#1c1c1c"
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "rgba(255,255,255,0.1)"
      }
    },
    MuiList: {
      root: {
        backgroundColor: "#1c1c1c",
      }
    },
    MuiListItem: {
      root: {
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        "&.Mui-selected": {
          color: "#60CFFE"
        }
      }
    },
    MuiListItemAvatar: {
      root: {
        minWidth: 25
      }
    },
    MuiButtonGroup: {
      root: {
        alignItems: "center"
      }
    }
  }
});