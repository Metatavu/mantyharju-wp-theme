import { createStyles } from "@material-ui/core";
import theme from "./theme";
import hero from "../resources/img/postHeader.png";

export default createStyles({
  /**
   * Page styles
   */
  root: {
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
    [theme.breakpoints.up("md")]: {
      height: "90vh",
    },
    "& button": {
      [theme.breakpoints.up("md")]: {
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
        [theme.breakpoints.down("sm")]: {
          height: "100%"
        }
      }
    }
  },
  heroContentContainer: {
    marginLeft: "5%",
    marginRight: "5%",
    [theme.breakpoints.up("md")]: {
      width: "70vw",
      marginRight: 0,
    },
    [theme.breakpoints.up("lg")]: {
      width: "75vw",
    },
    [theme.breakpoints.up("xl")]: {
      width: "60vw",
    },
    "& p": {
      fontSize: 16,
      fontFamily: theme.typography.subtitle2.fontFamily,
      margin: 0,
      [theme.breakpoints.up("lg")]: {
        fontSize: 18,
        lineHeight: 1.75
      },
      [theme.breakpoints.up("xl")]: {
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
    [theme.breakpoints.up(360)]: {
      fontSize: "1.75rem"
    },
    [theme.breakpoints.up(413)]: {
      fontSize: "2rem"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem"
    },
    // Media queries require single quotes
    // tslint:disable-next-line: quotemark
    '@media only screen and (max-width:1280px) and (min-width:960px) and (max-height:750px)': {
      fontSize: "1.5rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem"
    },
    [theme.breakpoints.up(1367)]: {
      fontSize: "2.5rem"
    },
    [theme.breakpoints.up(1600)]: {
      fontSize: "3rem"
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "4rem",
      lineHeight: "4.75rem",
    },
    [theme.breakpoints.up(2000)]: {
      fontSize: "5rem"
    },
    "&.article": {
      textAlign: "left",
      [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
        lineHeight: "2.5rem"
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "2.5rem",
        lineHeight: "3rem"
      },
      [theme.breakpoints.up("xl")]: {
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
    [theme.breakpoints.up(360)]: {
      fontSize: "2.75rem"
    },
    [theme.breakpoints.up(413)]: {
      fontSize: "3rem"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "4rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4rem"
    },
    // Media queries require single quotes
    // tslint:disable-next-line: quotemark
    '@media only screen and (max-width:1280px) and (min-width:960px) and (max-height:750px)': {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "4rem",
      marginLeft: "-6px"
    },
    [theme.breakpoints.up(1367)]: {
      fontSize: "4.5rem",
      marginLeft: "-7px"
    },
    [theme.breakpoints.up(1600)]: {
      fontSize: "5rem"
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "6rem",
      lineHeight: "6.75rem",
      marginLeft: "-8px"
    },
    [theme.breakpoints.up(2000)]: {
      fontSize: "7rem",
      marginLeft: "-9px"
    },
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      width: "auto",
    }
  },
  errorText: {},
  /**
   * Post page hero styles
   */
  heroImageDiv: {
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${hero})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundColor: "#1b1a1a",
    paddingLeft: "8rem",
    paddingRight: "8rem",
    width: "100%",
    minHeight: 335,
    position: "relative",
    [theme.breakpoints.down("sm")]:{
    },
    [theme.breakpoints.down("xs")]:{
    }
  },
  heroText: {
    fontSize: "3.5em",
    fontWeight: "bold",
    color: "#ffffff",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.00em"
    },
    [theme.breakpoints.down("sm")]:{
      fontSize: "1.75em",
    },
    [theme.breakpoints.down("xs")]:{
      fontSize: "1.25em",
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
    [theme.breakpoints.up("sm")]: {
      padding: "0 2rem 1rem"
    },
    [theme.breakpoints.up("md")]: {
      padding: "0 4rem 2rem"
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0 6rem 2rem"
    },
    [theme.breakpoints.up("xl")]: {
      padding: "0 8rem 2rem"
    },
  },
  breadcrumb: {
    width: "100%",
    padding: "1rem 0",
    marginBottom: "2rem",
    borderBottom: "1px solid rgba(0,0,0,0.1)"
  },
  columns: {
    display: "flex"
  },
  navigation: {
    flex: 1,
    padding: "2rem"
  },
  contentarea: {
    display: "flex",
    flexDirection: "column",
    flex: 3
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#E6F1F0",
    padding: "2rem"
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
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
    },
    [theme.breakpoints.up("md")]: {
    },
    [theme.breakpoints.up("lg")]: {
    },
    [theme.breakpoints.up("xl")]: {
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
      [theme.breakpoints.up(360)]: {
      },
      [theme.breakpoints.up("sm")]: {
      },
      [theme.breakpoints.up("md")]: {
      },
      [theme.breakpoints.up("lg")]: {
      },
      [theme.breakpoints.up("xl")]: {
      },
    },

    // Heading H3
    "& h3": {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 23,
      fontWeight: 600,
      [theme.breakpoints.up(360)]: {
      },
      [theme.breakpoints.up("sm")]: {
      },
      [theme.breakpoints.up("md")]: {
      },
      [theme.breakpoints.up("lg")]: {
      },
      [theme.breakpoints.up("xl")]: {
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
      [theme.breakpoints.up(413)]: {
        fontSize: "0.875rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 16,
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 18
      },
      [theme.breakpoints.up("xl")]: {
      }
    },

    // Link
    "& a": {
      color: theme.palette.primary.main,
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      [theme.breakpoints.up("lg")]: {
        fontSize: 18
      },
    },
    // Strong
    "& strong": {},
    // Lists
    "& ul": {
      listStyle: "none",
      padding: 0
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
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(10),
      },
      [theme.breakpoints.up("lg")]: {
        marginBottom: theme.spacing(12),
      },
      "& h2": {
        width: "100%"
      },
      "& p": {
        width: "100%",
        fontSize: 16,
        [theme.breakpoints.up("lg")]: {
          fontSize: 18,
          lineHeight: 1.6
        },
        "&.has-medium-font-size": {
          fontSize: 20,
          marginBottom: 0,
          [theme.breakpoints.up("md")]: {
            marginBottom: theme.spacing(2)
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: 22,
          }
        },
      },
      "& .wp-block-quote": {
        marginLeft: 0,
        marginRight: 0,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(5),
        },
        "& p": {
          fontFamily: theme.typography.h1.fontFamily,
          fontSize: "1.6rem",
          color: theme.palette.secondary.main,
          margin: 0,
          [theme.breakpoints.up("md")]: {
            fontSize: "2rem",
          }
        }
      },
      "& .wp-block-media-text": {
        marginTop: theme.spacing(5),
        [theme.breakpoints.up("sm")]: {
          display: "flex",
          flexDirection: "row",
          marginBottom: theme.spacing(5)
        },
        [theme.breakpoints.up("md")]: {
          marginBottom: theme.spacing(5)
        },
        "&.has-media-on-the-right": {
          flexDirection: "row-reverse",
          "& .wp-block-media-text__content": {
            marginLeft: 0,
            [theme.breakpoints.up("sm")]: {
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
          [theme.breakpoints.up(360)]: {
            height: "320px",
          },
          [theme.breakpoints.up("sm")]: {
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
        [theme.breakpoints.up("sm")]: {
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
        [theme.breakpoints.up("md")]: {
          marginTop: 0,
          marginBottom: 0,
        },
        "&.highlight-columns": {
          "& .wp-block-column": {
            position: "relative",
            [theme.breakpoints.up("md")]: {
              cursor: "pointer",
              flex: 1
            },
            "& .highlight-content": {
              position: "absolute",
              padding: theme.spacing(5),
              [theme.breakpoints.up("md")]: {
                padding: theme.spacing(5),
              },
              [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(8),
              },
              [theme.breakpoints.up("xl")]: {
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
                [theme.breakpoints.up("md")]: {
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
        margin: 0
      },
      "& .widget_flex-posts-list": {
        width: "100%",
        [theme.breakpoints.up("md")]: {
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
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginBottom: 20
      },
      "& img": {
        width: "100%",
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
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {
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
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
      "&:first-child": {
        [theme.breakpoints.up("md")]: {
          marginLeft: 0,
          marginRight: theme.spacing(2)
        }
      },
      "&:last-child": {
        [theme.breakpoints.up("md")]: {
          marginLeft: theme.spacing(2),
          marginRight: 0
        }
      },
      "& .wp-block-image": {
        "& a": {
          "& img": {
            [theme.breakpoints.up("md")]: {
              opacity: 0.9,
              transition: "transform 300ms ease-out, opacity 300ms ease-out, box-shadow 0.4s ease-out"
            },
            "&:hover": {
              [theme.breakpoints.up("md")]: {
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
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(5)
      },
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5)
      },
      "&.has-media-on-the-right": {
        flexDirection: "row-reverse",
        "& .wp-block-media-text__content": {
          marginLeft: 0,
          [theme.breakpoints.up("sm")]: {
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
        [theme.breakpoints.up(360)]: {
          height: "320px",
        },
        [theme.breakpoints.up("sm")]: {
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
      [theme.breakpoints.up("sm")]: {
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
        [theme.breakpoints.up("sm")]: {
          height: 762
        },
        [theme.breakpoints.up("md")]: {
          height: 762
        },
        [theme.breakpoints.up("lg")]: {
          height: 762
        },
        [theme.breakpoints.up("xl")]: {
          height: 762
        }
      }
    }
  }
});