import { createStyles } from "@material-ui/core";
import theme from "./theme";

const sidePaddingSm = "0 2rem";
const sidePaddingMd = "0 4rem";
const sidePaddingLg = "0 6rem";
const sidePaddingXl = "0 8rem";
const maxPageWidthXl = "100%";

export default createStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: sidePaddingSm,
        [theme.breakpoints.up("sm")]: {
            padding: sidePaddingMd
        },
        [theme.breakpoints.up("md")]: {
            padding: sidePaddingLg
        },
        [theme.breakpoints.up("lg")]: {
            padding: sidePaddingXl
        },
    },
    footerContent: {
        display: "flex",
        flexDirection: "column",
        minHeight: 300,
        paddingTop: "2rem",
        width: "100%",
        paddingBottom: "8rem",
        [theme.breakpoints.up("md")]: {
            display: "grid",
            gridAutoFlow: "column",
            gridGap: "4rem"
        },
        [theme.breakpoints.up("xl")]: {
            maxWidth: maxPageWidthXl
        },
    },
    footerLogo: {
        width: "100%",
        marginBottom: "2rem",
        [theme.breakpoints.up("md")]: {
            marginBottom: 0,
        }
    },
    footerAdressInfo: {
        color: "#fff",
        width: "100%",
    },
    footerContactInfo: {
        color: "#fff",
        width: "100%",
    },
    footerSocialInfo: {
        width: "100%",
    },
    footerContentItem: {
        "& p": {
            color: "#fff",
            fontFamily: theme.typography.body1.fontFamily,
            textDecoration: "none",
            margin: 0
        }
    },
    logo: {
    },
    social: {
        marginTop: "2rem",
        width: 30,
        height: 30,
        [theme.breakpoints.up("md")]: {
            marginTop: 0,
            marginLeft: "2rem"
        }
    },
});