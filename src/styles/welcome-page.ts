import { createStyles } from "@material-ui/core";
import theme from "./theme";

const { breakpoints } = theme;

const sidePaddingSm = "0 2rem";
const sidePaddingMd = "0 4rem";
const sidePaddingLg = "0 6rem";
const sidePaddingXl = "0 8rem";
const maxPageWidthXl = 2000;

export default createStyles({
  /**
   * Mantyharju-theme front page styles
   */

  /**
   * TODO:
   * - Improve responsive design for buttons (small screens)
   * - Post columns styling
   */
  "button:focus": {
    border: "1px solid black"
  },

  loadingIconContainer: {
    display: "flex",
    margin: "5rem",
    justifyContent: "center"
  },

  /**
   * Hero-image as background
   */
  heroImageDiv: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff",
    height:" 40vh",
    padding: sidePaddingSm,
    paddingTop: "2rem",
    width:"100%",
    position: "relative",
    overflow: "hidden",
    marginTop: 57,
    [breakpoints.up("sm")]: {
      padding: sidePaddingMd,
      paddingTop: "4rem",
      height: "50vh",
      fontSize: "1.25em",
    },
    [breakpoints.up("md")]: {
      padding: sidePaddingLg,
      paddingTop: "6rem",
      marginTop: 0,
    },
    [breakpoints.up("lg")]: {
      padding: sidePaddingXl,
      paddingTop: "8rem",
    },
    [breakpoints.up("xl")]: {

    },
    "&:after": {
      zIndex: 1,
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  },
  heroLogo: {
    position: "relative",
    zIndex: 2,
    [breakpoints.up("lg")]: {
      width: 500
    },
  },
  heroText: {
    position: "relative",
    zIndex: 2,
    fontSize: 20,
    margin: "2rem 0",
    fontWeight: "bold",
    textShadow: "0px 0px 2px #000",
    [breakpoints.up("sm")]: {
      fontSize: 30,
    }
  },
  heroButton: {
    zIndex: 2,
    color: "black",
    fontSize: "1em",
    backgroundColor: "#FFFFFF",
    textTransform: "uppercase",
    [breakpoints.up("sm")]: {
    }
  },
  heroButtonPopularPages: {
    zIndex: 2,
    color: "#fff",
    backgroundColor: "#1068B3",
    cursor: "pointer",
    textTransform: "uppercase",
    fontSize: "4rem",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    justifyContent: "space-between",
    "& .MuiButton-label": {
      fontSize: 16
    },
      [breakpoints.up("lg")]: {
        right: "8rem",
        width: "initial",
        left: "initial",
        "& .MuiButton-label": {
          fontSize: 20
        }
      }
    },

  /**
   * Add events -div
   */
  addEventDiv: {
    display: "flex",
    flexDirection: "column-reverse",
    alignSelf: "center",
    color: "#fff",
    width: "100%",
    minHeight: 300,
    marginTop: "2rem",
    [breakpoints.up("md")]: {
      marginTop: 0,
      padding: "2rem 8rem",
      display: "grid",
      flexDirection: "row",
      gridTemplateColumns: "50% 50%",
      maxWidth: maxPageWidthXl
    }
  },
  addEventImageDiv: {
    gridColumnStart: "1",
    gridColumnEnd: "1",
    width: "100%",
    minHeight: 200,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  },
  addEventTextDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem",
    gridColumnStart: "2",
    gridColumnEnd: "2",
    width: "100%",
    backgroundColor: "#1068B3",
    [breakpoints.up("sm")]: {
      padding: "2rem",
    }
  },
  addEventTextDivParagraph: {
    fontSize: "1rem"
  },
  addEventTextDivHeading: {
    fontSize: "36px",
    margin: "0",
    textDecoration: "none"
  },
  addEventImage: {
    width: "100%",
    height: "auto"
  },
  addEventButton: {
    display: "flex",
    alignSelf: "flex-start",
    color: "#000",
    backgroundColor: "#FFFFFF",
    textTransform: "uppercase"
  },

  /**
   * Posts section styles
   */
  postsContainer: {
    marginTop: "4rem",
    padding: sidePaddingSm,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    [breakpoints.up("sm")]: {
      flexDirection: "row",
      padding: sidePaddingSm,
    },
    [breakpoints.up("md")]: {
      padding: sidePaddingLg,
    },
    [breakpoints.up("lg")]: {
      padding: sidePaddingXl,
    },
    [breakpoints.up("xl")]: {
      maxWidth: maxPageWidthXl,
    },
    "& a, a:link, a:visited, a:focus, a:hover, a:active": {
      color: "#000",
    }
  },
  postsColumn: {
    display: "flex",
    maxWidth: "100%",
    flexDirection: "column",
    marginBottom: "2rem",
    [breakpoints.up("sm")]: {
      width: "25%",
      margin: "0 1rem"
    },
    [breakpoints.up("md")]: {
      width: "25%",
      margin: "0 2rem"
    },
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      margin: "0 4rem"
    },
    "& .linkedevents-event": {
      backgroundColor: "black",
    },
  },
  event_link: {
    display: "flex",
    flex: 1,
    textDecoration: "none",
    "&:link": {
      color: "#000"
    },
    "&:visited": {
      color: "#000"
    },
    "&:hover": {
      color: "#000"
    },
    "&:active": {
      color: "#000"
    },
    [breakpoints.down("lg")]: {
      marginBottom: theme.spacing(2)
    }
  },
  postsHeading: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
    alignSelf: "center",
    "& h1": {
      marginLeft: "1rem",
      fontSize: 26,
      fontWeight: 600,
      [breakpoints.up("sm")]: {
        fontSize: 26,
      },
      [breakpoints.up("lg")]: {
        fontSize: 36,
      }
    }
  },
  allPosts: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },

  /**
   * Nested paragraph comes from wordpress
   */
  singlePost: {
    "& p": {
      margin: 4,
      padding: 0,
      fontFamily: theme.typography.body1.fontFamily
    },
    "& hr": {
      color: "black",
      opacity: "20%",
      marginTop: "1rem",
    },
    marginBottom: "2rem"
  },
  postDate: {
    color: "#1068B3",
    fontSize: "0.8rem",
    margin: "0"
  },
  postContent: {
    width: "100%",
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: "1rem",
    padding: 0,
    whiteSpace: "break-spaces"
  },
  postColumnButton: {
    color: "#fff",
    backgroundColor: "#1068B3",
    marginTop: "1rem",
    textTransform: "uppercase",
    maxWidth: 270,
    alignSelf: "center",
    [breakpoints.up("sm")]: {
      marginTop: "2rem",
    }
  },

  /**
   * LinkedEvents section styles
   */

  linkedEventsContainer: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    marginTop: "2rem",
    padding: "2rem",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    [breakpoints.up("sm")]: {
      marginTop: "3rem",
      padding: sidePaddingMd,
      paddingTop: "2rem"
    },
    [breakpoints.up("md")]: {
      marginTop: "5rem",
      padding: sidePaddingLg,
      paddingTop: "2rem"
    },
    [breakpoints.up("lg")]: {
      padding: "3rem 4rem 3rem 4rem",
      paddingTop: "3rem"
    },
    [breakpoints.up("xl")]: {
      padding: "3rem 10rem 3rem 10rem",
      maxWidth: maxPageWidthXl
    },
    "& h1": {
      fontSize: 32,
      fontWeight: 600,
      alignSelf: "center",
      marginBottom: "2rem",
      [breakpoints.up("xl")]: {
        fontSize: 50,
        marginBottom: "4rem"
      }
    }
  },
  legendWrapper: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
    [breakpoints.up("xl")]: {
      marginBottom: "4rem"
    },
    [breakpoints.down("md")]: {
      display: "block",
    }
  },
  legend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 1rem"
  },
  legendColor: {
    height: 8,
    width: 25,
    marginRight: "1rem"
  },

  eventsButtonRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0",
    [breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },

  eventsTopRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "middle",
  },
  eventsBottomRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "middle",
    marginInline: "10px",
  },
  singleEvent: {
    color: "red",
    width: "100%",
    objectFit: "cover",
  },

  allEventsButton: {
    backgroundColor: "#1068B3",
    textTransform: "uppercase",
    marginTop: "2rem",
    marginRight: theme.spacing(2),
    color: "#fff",
    width: 270,
    [breakpoints.down("sm")]: {
      marginRight: 0
    }
  },

  addLinkedEventButton: {
    backgroundColor: "#1068B3",
    textTransform: "uppercase",
    marginLeft: theme.spacing(2),
    color: "#fff",
    marginTop: "2rem",
    width: 270,
    [breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },

  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    [breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridGap: theme.spacing(2),
    },
    [breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    },
    [breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    },
    [breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    }
  },
  events_item_universal: {
    backgroundColor: "#FFFFFF",
    padding: "1rem 1rem 2rem 1rem",
    textAlign: "center",
    margin: 0,
    cursor: "pointer",
    marginBottom: "1rem",
    transition: "box-shadow 0.2s ease-out",
    [breakpoints.up("sm")]: {
      marginBottom: 0,
      padding: "2rem 2rem 4rem 2rem",
    },
    "& p": {
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    "& hr": {
      display: "none"
    },
    "& a": {
      margin: 0,
      padding: 0,
      color: "#000",
      textDecoration: "blink",
    },
    "& img": {
      width: "33.33%",
      height: "6px",
      marginBottom: "2rem",
      transition: "width 0.2s ease-out"
    },
    "&:hover": {
      boxShadow: "0 0 20px rgba(0,0,0,0.2)"
    },
    "&:hover img": {
      width: "50%"
    },
  },
  bottom_section: {
    display: "flex",
    flexDirection: "column",
    gridGap: "2rem",
    padding: sidePaddingSm,
    margin: "2rem 0",
    [breakpoints.up("sm")]: {
      display: "grid",
      padding: sidePaddingMd,
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(3, 1fr)",
    },
    [breakpoints.up("md")]: {
      padding: sidePaddingLg,
      paddingTop: "4rem",
      paddingBottom: "4rem",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
    },
    [breakpoints.up("lg")]: {
      padding: sidePaddingXl,
    },
  },
  bottom_section_item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 250,
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backgroundBlendMode: "soft-light",
    backgroundSize: "cover",
    [breakpoints.down("sm")]: {
      marginBottom: "5px"
    },
    [breakpoints.up("md")]: {
      transition: "background-color 0.2s ease-out, box-shadow 0.2s ease-out",
      "&:hover": {
        backgroundColor: "#2a465e",
        boxShadow: "0px 0px 30px rgba(0,0,0,0.2)",
      },
    },
    "& p":{
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFFFFF",
      textAlign: "center",
      margin: "2rem",
      textShadow: "0 0 20px rgba(0,0,0,0.5)",
      [breakpoints.up("lg")]: {
        fontSize: 28,
      },
      [breakpoints.up("xl")]: {
        fontSize: 34,
      },
    }
  },
  
  dialog: {
    display: 'flex',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  metaformWrapper: {
    width: "100%",
    [breakpoints.down("sm")]: {
      padding: 0,
    },
    [breakpoints.up("sm")]: {
      padding: 0,
    },
    [breakpoints.up("md")]: {
      maxWidth: 1500,
    },
    backgroundColor: "#fff",
    padding: theme.spacing(2, 4, 3),
    "& .metaform": {
      "& input[type='text']": {
        width: "100%",
        height: 40,
      },
      "& input[type='url']": {
        width: "100%",
        height: 40,
      },
      "& input[type='email']": {
        width: "100%",
        height: 40,
      },
      "& .react-datepicker-wrapper": {
        width: "100%",
      },
      "& input[type='checkbox']": {
        width: 26,
        height: 26,
      },
      "& input[type='submit']": {
        marginTop: 10,
        midWidth: 100,
        width: "100%",
        height: 40,
      },
      "&  input[type='button']": {
        width: 100,
        height: 40,
      },
      "& .metaform-section": {
        "& fieldset": {
          border: 0,
        },
        "& .metaform-field": {
          alignContent: "center",
          "& textarea": {
            width: "100%",
            height: 100
          },
          "& input[type='button']": {
            cursor: "pointer",
            fontSize: 18,
            width: 210
          },
          "& input[type='checkbox']": {
            cursor: "pointer"
          },
          "& input[type='submit']": {
            color: "#fff",
            fontSize: 24,
            background: "#0f67b2",
            cursor: "pointer",
            height: 50,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
          },
          "& input[type='submit']:hover": {
            background: "#1076cc"
          }
        },
        "& .metaform-autocomplete-field": {
          width: "100%"
        },
        "& .help-container": {
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
          marginLeft: 0,
          marginRight: 0,
          backgroundColor: "rgba(0,0,0,0.1)",
          color: "#000",
          padding: theme.spacing(2),
          borderRadius: 5,
          boxShadow: "inset 0 0 4px rgba(0,0,0,0.2)",
          "& p": {
            fontSize: 16,
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5)
          }
        }
      },
      "& .metaform-field-missing-error": {
        color: "#FF0000"
      }
    }
  },

  reactAddLocationWrapper: {
    width: "100%",
  },

  centered: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center"
  },

  imageUploadWrapper: {
    marginTop: 10,
    marginBottom: 10,
    "& .MuiButton-outlinedSecondary": {
    color: "#1068B3",
    border: "1px solid #000",
    }
  },

  statusBar: {
    height: 6,
    width: 120,
    marginBottom: theme.spacing(2)
  },

  card: {
    "&:hover": {
      boxShadow: "7px 8px 12px 0px rgba(0,0,0,0.1)",
    },
  }
});