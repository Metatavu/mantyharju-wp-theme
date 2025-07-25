import { createStyles } from "@material-ui/core";
import theme from "./theme";

const { breakpoints } = theme;

const sidePaddingSm = "0 2rem";
const sidePaddingMd = "0 4rem";
const sidePaddingLg = "0 6rem";
const sidePaddingXl = "0 8rem";

export default createStyles({
  /**
   * Page styles
   */
  root: {
    height: "100%",
    "& .wp-block-column": {
      "& p": {
        marginBlockStart: "0 !important",
      }
    },
    "& .is-style-stripes": {
      "& table":{
        "& tbody": {
          "& tr:nth-child(odd)": {
            backgroundColor: "#f2f2f2"
          }
        }
      }
    }
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
  card: {
    "&:hover": {
      boxShadow: "7px 8px 12px 0px rgba(0,0,0,0.1)",
    },
  },
  centered: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center"
  },
  statusBar: {
    height: 6,
    width: 120,
    marginBottom: theme.spacing(2)
  },
  loadingIconContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  logoBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    marginBottom: 25,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  },
  hero: {
    paddingTop: 130,
    height: "90vh",
    display: "flex",
    alignItems: "center",
    [breakpoints.up("md")]: {
      height: "90vh",
    },
    "& button": {
      [breakpoints.up("md")]: {
        width: 300
      }
    },
    "& .wp-block-cover": {
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      "&.has-background-dim.hero": {
        "&:before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }
      },
      "& .wp-block-cover__video-background": {
        minWidth: "100%",
        minHeight: "100%",
        [breakpoints.down("sm")]: {
          height: "100%"
        }
      }
    }
  },
  heroContentContainer: {
    marginLeft: "5%",
    marginRight: "5%",
    [breakpoints.up("md")]: {
      width: "70vw",
      marginRight: 0,
    },
    [breakpoints.up("lg")]: {
      width: "75vw",
    },
    [breakpoints.up("xl")]: {
      width: "60vw",
    },
    "& p": {
      fontSize: 16,
      fontFamily: theme.typography.subtitle2.fontFamily,
      margin: 0,
      [breakpoints.up("lg")]: {
        fontSize: 18,
        lineHeight: 1.75
      },
      [breakpoints.up("xl")]: {
        fontSize: 20,
        lineHeight: 1.75
      }
    }
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.dark,
    display: "flex",
    marginTop: 0,
    flexDirection: "column"
  },
  contentWithHero: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.dark,
    marginTop: 0,
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: "normal",
    fontSize: "1.5rem",
    lineHeight: 1,
    [breakpoints.up(360)]: {
      fontSize: "1.75rem"
    },
    [breakpoints.up(413)]: {
      fontSize: "2rem"
    },
    [breakpoints.up("sm")]: {
      fontSize: "3rem"
    },
    [breakpoints.up("md")]: {
      fontSize: "3rem"
    },
    // Media queries require single quotes
    // tslint:disable-next-line: quotemark
    '@media only screen and (max-width:1280px) and (min-width:960px) and (max-height:750px)': {
      fontSize: "1.5rem"
    },
    [breakpoints.up("lg")]: {
      fontSize: "2rem"
    },
    [breakpoints.up(1367)]: {
      fontSize: "2.5rem"
    },
    [breakpoints.up(1600)]: {
      fontSize: "3rem"
    },
    [breakpoints.up("xl")]: {
      fontSize: "4rem",
      lineHeight: "4.75rem",
    },
    [breakpoints.up(2000)]: {
      fontSize: "5rem"
    },
    "&.article": {
      textAlign: "left",
      [breakpoints.up("md")]: {
        fontSize: "2rem",
        lineHeight: "2.5rem"
      },
      [breakpoints.up("lg")]: {
        fontSize: "2.5rem",
        lineHeight: "3rem"
      },
      [breakpoints.up("xl")]: {
        fontSize: "3rem",
        lineHeight: "3.5rem"
      },
    }
  },
  heroTitle: {
    margin: 0,
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: "normal",
    fontSize: "2.5rem",
    lineHeight: 1,
    marginBottom: theme.spacing(2),
    [breakpoints.up(360)]: {
      fontSize: "2.75rem"
    },
    [breakpoints.up(413)]: {
      fontSize: "3rem"
    },
    [breakpoints.up("sm")]: {
      fontSize: "4rem"
    },
    [breakpoints.up("md")]: {
      fontSize: "4rem"
    },
    // Media queries require single quotes
    // tslint:disable-next-line: quotemark
    '@media only screen and (max-width:1280px) and (min-width:960px) and (max-height:750px)': {
      fontSize: "3.5rem"
    },
    [breakpoints.up("lg")]: {
      fontSize: "4rem",
      marginLeft: "-6px"
    },
    [breakpoints.up(1367)]: {
      fontSize: "4.5rem",
      marginLeft: "-7px"
    },
    [breakpoints.up(1600)]: {
      fontSize: "5rem"
    },
    [breakpoints.up("xl")]: {
      fontSize: "6rem",
      lineHeight: "6.75rem",
      marginLeft: "-8px"
    },
    [breakpoints.up(2000)]: {
      fontSize: "7rem",
      marginLeft: "-9px"
    },
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(5),
    [breakpoints.up("md")]: {
      width: "auto",
    }
  },

  eventsContent: {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    backgroundColor: "#f7f7f7",
    [breakpoints.down("md")]: {
      gridTemplateColumns: "50% 50%",
    },
    [breakpoints.down("sm")]: {
      gridTemplateColumns: "100%",
    },
    "& >a": {
    margin: "0.5rem",
    }
  },
  
  eventButtons: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    marginTop: "2rem",
    marginBottom: "2rem"
  },

  previousEventButton: {
    backgroundColor: "#1068B3",
    textTransform: "uppercase",
    color: "#fff",
    width: "fit-content",
    gridColumn: 1,
    justifySelf: "end",
    marginRight: "1rem",
  },

  nextEventButton: {
    backgroundColor: "#1068B3",
    textTransform: "uppercase",
    color: "#fff",
    width: "fit-content",
    gridColumn: 2,
    justifySelf: "start",
    marginLeft: "1rem",
  },

  errorText: {},
  /**
   * Post page hero styles
   */
  heroImageDiv: {
    display: "flex",
    alignItems: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundColor: "#1b1a1a",
    padding: sidePaddingSm,
    width: "100%",
    minHeight: 220,
    position: "relative",
    marginTop: 57,
    [breakpoints.up("sm")]: {
      padding: "0 3rem",
      minHeight: 280,
    },
    [breakpoints.up("md")]: {
      padding: sidePaddingMd,
      minHeight: 300,
      marginTop: 0,
    },
    [breakpoints.up("lg")]: {
      padding: sidePaddingLg,
      minHeight: 335,
    },
    [breakpoints.up("xl")]: {
      padding: sidePaddingXl,
      minHeight: 335,
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
  heroText: {
    fontSize: "2rem",
    fontWeight: "bold",
    zIndex: 2,
    color: "#ffffff",
    textShadow: "0px 0px 4px #000",
    [breakpoints.up("sm")]: {
      marginLeft: 0,
      fontSize: "2rem"
    },
    [breakpoints.up("md")]: {
      marginLeft: 15,
      fontSize: "2.5em",
    },
    [breakpoints.up("lg")]: {
      marginLeft: 0,
      fontSize: "3rem",
    }
  },
  /**
   * HTML Content styles
   */
  date: {
    fontFamily: theme.typography.h1.fontFamily,
    "&:first-letter": {
      textTransform: "uppercase"
    }
  },
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  pageContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    [breakpoints.up("sm")]: {
      padding: "0 2rem 1rem"
    },
    [breakpoints.up("md")]: {
      padding: "0 5rem 2rem"
    },
    [breakpoints.up("lg")]: {
      padding: "0 6rem 2rem"
    },
    [breakpoints.up("xl")]: {
      padding: "0 8rem 2rem"
    },
  },
  breadcrumb: {
    width: "100%",
    padding: "1rem",
    marginBottom: "1rem",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    [breakpoints.up("md")]: {
      padding: "1rem 0",
      marginBottom: "2rem"
    }
  },
  columns: {
    display: "flex",
    flexDirection: "column",
    [breakpoints.up("md")]: {
      flexDirection: "row"
    }
  },
  navigation: {
    padding: "2rem"
  },
  contentarea: {
    [breakpoints.up("md")]: {
      height: "100%",
    },
    display: "flex",
    flexDirection: "column",
    "& .wp-block-group__inner-container": {
      marginTop: "1em",
      marginBottom: "1em",
      "& h3": {
        marginBlockStart: 0,
        marginBlockEnd: 0
      },
      "& p": {
        marginBlockStart: 0,
        marginBlockEnd: 0
      },
    },
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#e4e9f7",
    padding: "2rem",
    "& .wp-block-group__inner-container": {
      marginTop: "1em",
      marginBottom: "1em",
      "& h3": {
        marginBlockStart: 0,
        marginBlockEnd: 0
      },
      "& p": {
        marginBlockStart: 0,
        marginBlockEnd: 0
      },
    },
  },

  // FONTS

  "& h2": {
    fontSize: 35,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 600
  },
  "& h3": {
    fontSize: 23,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 600
  },
  "& a": {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: "normal",
    color: theme.palette.primary.dark
  },

  htmlContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [breakpoints.up("sm")]: {
    },
    [breakpoints.up("md")]: {
    },
    [breakpoints.up("lg")]: {
    },
    [breakpoints.up("xl")]: {
    },

    "& blockquote.wp-block-quote": {
      borderLeft: "4px solid #000",
      paddingLeft: "2rem"
    },

    // Heading
    "& h2": {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 35,
      fontWeight: 600,
      [breakpoints.up(360)]: {
      },
      [breakpoints.up("sm")]: {
      },
      [breakpoints.up("md")]: {
      },
      [breakpoints.up("lg")]: {
      },
      [breakpoints.up("xl")]: {
      },
    },

    // Heading H3
    "& h3": {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 23,
      fontWeight: 600,
      [breakpoints.up(360)]: {
      },
      [breakpoints.up("sm")]: {
      },
      [breakpoints.up("md")]: {
      },
      [breakpoints.up("lg")]: {
      },
      [breakpoints.up("xl")]: {
      },
    },
    // Heading end

    // Paragraph
    "& p": {
      "&:empty": {
        display: "none"
      },
      fontSize: 14,
      "&.has-medium-font-size": {
        fontSize: 20
      },
      "&.has-large-font-size": {
        fontSize: 36
      },
      "&.has-huge-font-size": {
        fontSize: 48
      },
      [breakpoints.up(413)]: {
        fontSize: "0.875rem",
      },
      [breakpoints.up("sm")]: {
        fontSize: 16,
      },
      [breakpoints.up("lg")]: {
        fontSize: 18
      },
      [breakpoints.up("xl")]: {
      }
    },

    // Link
    "& a": {
      color: theme.palette.primary.main,
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      [breakpoints.up("lg")]: {
        fontSize: 18
      },
    },
    // Separator
    "& hr": {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      width: "100%",
    },
    /**
     * Article content styles
     */
    "&.article": {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      [breakpoints.up("md")]: {
        marginBottom: theme.spacing(10),
      },
      [breakpoints.up("lg")]: {
        marginBottom: theme.spacing(12),
      },
      "& h2": {
        width: "100%"
      },
      "& p": {
        width: "100%",
        fontSize: 16,
        [breakpoints.up("lg")]: {
          fontSize: 18,
          lineHeight: 1.6
        },
        "&.has-medium-font-size": {
          fontSize: 20,
          marginBottom: 0,
          [breakpoints.up("md")]: {
            marginBottom: theme.spacing(2)
          },
          [breakpoints.up("lg")]: {
            fontSize: 22,
          }
        },
      },
      "& .wp-block-quote": {
        marginLeft: 0,
        marginRight: 0,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [breakpoints.up("md")]: {
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(5),
        },
        "& p": {
          fontFamily: theme.typography.h1.fontFamily,
          fontSize: "1.6rem",
          color: theme.palette.secondary.main,
          margin: 0,
          [breakpoints.up("md")]: {
            fontSize: "2rem",
          }
        }
      },
      "& .wp-block-media-text": {
        marginTop: theme.spacing(5),
        [breakpoints.up("sm")]: {
          display: "flex",
          flexDirection: "row",
          marginBottom: theme.spacing(5)
        },
        [breakpoints.up("md")]: {
          marginBottom: theme.spacing(5)
        },
        "&.has-media-on-the-right": {
          flexDirection: "row-reverse",
          "& .wp-block-media-text__content": {
            marginLeft: 0,
            [breakpoints.up("sm")]: {
              marginRight: theme.spacing(5)
            }
          }
        },
        "&.is-vertically-aligned-top": {
          alignItems: "flex-start",
        },
        "& .wp-block-media-text__media": {
          margin: 0
        },
        "&.is-image-fill .wp-block-media-text__media": {
          height: "280px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          margin: 0,
          marginBottom: theme.spacing(5),
          [breakpoints.up(360)]: {
            height: "320px",
          },
          [breakpoints.up("sm")]: {
            display: "flex",
            flex: 1,
            alignSelf: "stretch",
            height: "auto",
            marginBottom: 0
          },
          "& img": {
            display: "none"
          }
        }
      },
      "& .wp-block-media-text__media": {
        width: "initial",
        height: "initial",
      },
      "& .wp-block-media-text__content": {
        flex: 2,
        [breakpoints.up("sm")]: {
          marginLeft: theme.spacing(5),
        },
        "& p": {
          "&:first-child": {
            marginTop: 0
          },
          "&:last-child": {
            marginBottom: 0
          }
        }
      },
    },
    /**
     * Fullscreen page styles
     */
    "&.fullscreen": {
      marginTop: 0,
      marginBottom: 0,
      paddingBottom: 0,
      "& h2": {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
      },
      "& p": {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
      },
      "& .wp-block-columns": {
        marginTop: 0,
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        [breakpoints.up("md")]: {
          marginTop: 0,
          marginBottom: 0,
        },
        "&.highlight-columns": {
          "& .wp-block-column": {
            position: "relative",
            [breakpoints.up("md")]: {
              cursor: "pointer",
              flex: 1
            },
            "& .highlight-content": {
              position: "absolute",
              padding: theme.spacing(5),
              [breakpoints.up("md")]: {
                padding: theme.spacing(5),
              },
              [breakpoints.up("lg")]: {
                padding: theme.spacing(8),
              },
              [breakpoints.up("xl")]: {
                padding: theme.spacing(8),
              },
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: 1,
              width: "100%",
              "& h3": {
                margin: 0,
                color: "#fff",
                fontSize: "1.5rem",
                [breakpoints.up("md")]: {
                  fontSize: "2.5rem",
                  lineHeight: 1.2
                },
                fontFamily: "tt_norms_promedium",
                fontWeight: "normal",
                textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
              },
              "& .MuiButton-outlinedPrimary": {
                width: 300,
                borderColor: "rgba(245, 239, 234, 0.8)",
                color: "#F5EFEA",
                "&:hover": {
                  borderColor: "rgba(245, 239, 234, 1)",
                }
              },
              "& ~ figure.wp-block-image": {
                opacity: 0.6,
                margin: 0,
                width: "100%"
              }
            }
          }
        }
      },
      "& .wp-block-column": {
        display: "contents",
        margin: 0,
        "& p": {
          marginBlockStart: 0,
        }
      },
      "& .widget_flex-posts-list": {
        width: "100%",
        [breakpoints.up("md")]: {
          flex: 1
        }
      },
      "& .wp-block-embed__wrapper": {
        marginTop: 0,
      },
    },
    // Fullscreen end

    // Image
    "& .wp-block-image": {
      margin: 0,
      [breakpoints.down("md")]: {
        width: "100%",
        marginBottom: 20
      },
      "& img": {
        width: "100%",
        marginBottom: 20
      },
      "& figure": {
        margin: 0,
        "&.aligncenter": {
          margin: 0
        }
      }
    },
    // Columns
    "& .wp-block-columns": {
      [breakpoints.up("sm")]: {},
      [breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(5),
      },
      "&.has-2-columns": {
        "&.contact-column": {
          marginTop: 0,
          width: "100%",
          "& .wp-block-column": {
            minWidth: "50%"
          },
        }
      }
    },
    // Single column
    "& .wp-block-column": {
      [breakpoints.up("md")]: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
      "&:first-child": {
        [breakpoints.up("md")]: {
          marginLeft: 0,
          marginRight: theme.spacing(2)
        }
      },
      "&:last-child": {
        [breakpoints.up("md")]: {
          marginLeft: theme.spacing(2),
          marginRight: 0
        }
      },
      "& .wp-block-image": {
        "& a": {
          "& img": {
            [breakpoints.up("md")]: {
              opacity: 0.9,
              transition: "transform 300ms ease-out, opacity 300ms ease-out, box-shadow 0.4s ease-out"
            },
            "&:hover": {
              [breakpoints.up("md")]: {
                opacity: 1,
                transform: "scale(1.01)",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"
              }
            }
          }
        }
      }
    },
    // Single column end

    // Media & Text block
    "& .wp-block-media-text": {
      marginTop: theme.spacing(5),
      [breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(5)
      },
      [breakpoints.up("md")]: {
        marginBottom: theme.spacing(5)
      },
      "&.has-media-on-the-right": {
        flexDirection: "row-reverse",
        "& .wp-block-media-text__content": {
          marginLeft: 0,
          [breakpoints.up("sm")]: {
            marginRight: theme.spacing(5)
          },
          "& h3": {
            marginTop: 0
          }
        }
      },
      "&.is-vertically-aligned-top": {
        alignItems: "flex-start",
      },
      "& .wp-block-media-text__media": {
        margin: 0
      },
      "&.is-image-fill .wp-block-media-text__media": {
        height: "280px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        margin: 0,
        marginBottom: theme.spacing(5),
        [breakpoints.up(360)]: {
          height: "320px",
        },
        [breakpoints.up("sm")]: {
          display: "flex",
          flex: 1,
          alignSelf: "stretch",
          height: "auto",
          marginBottom: 0
        },
        "& img": {
          display: "none"
        }
      }
    },
    "& .wp-block-media-text__media": {
      width: "initial",
      height: "initial",
    },
    "& .wp-block-media-text__content": {
      flex: 2,
      [breakpoints.up("sm")]: {
        marginLeft: theme.spacing(5),
      },
      "& p": {
        "&:first-child": {
          marginTop: 0
        },
        "&:last-child": {
          marginBottom: 0
        }
      }
    },
    // Media & Text block end

    "& .wp-block-embed": {
      margin: 0,
      display: "flex",
      justifyContent: "center",
      background: theme.palette.background.default
    },
    "& .wp-block-embed__wrapper": {
      width: "100%",
      "& iframe": {
        width: "100%",
        [breakpoints.up("sm")]: {
          height: 762
        },
        [breakpoints.up("md")]: {
          height: 762
        },
        [breakpoints.up("lg")]: {
          height: 762
        },
        [breakpoints.up("xl")]: {
          height: 762
        }
      }
    }
  },
".TreeView-treeWrapper-71:focus": {
    outline: "2px solid black"
  },
});