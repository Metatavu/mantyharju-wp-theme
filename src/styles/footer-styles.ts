import { createStyles } from "@material-ui/core";
import theme from "./theme";

const sidePaddingLg = "0 8rem";
const maxPageWidthXl = "100%";

export default createStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: sidePaddingLg
    },
    footerContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        color: "#fff",
        height: 300,
        paddingTop: "2rem",
        width: "100%",
        [theme.breakpoints.up("xl")]: {
            maxWidth: maxPageWidthXl
        },
    },
    footerLogo: {
        width: "30%"
    },
    footerAdressInfo: {
        width: "20%"
    },
    footerContactInfo: {
        width: "20%"
    },
    footerSocialInfo: {
        width: "30%"
    },
    footerContentItem: {
        "& p": {
            fontFamily: theme.typography.body1.fontFamily,
            textDecoration: "none",
            margin: 0
        }
    },
    logo: {
    },
    social: {
        marginLeft: 5,
        minWidth: "5%",
        width: "5%"
    },
});