import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
    
    footer: {
        color: "#fff",
        backgroundColor: "#15B1B3",
        display: "flex",
        flexDirection: "row",
        height: "10vw",
        justifyContent: "center",
        paddingTop: "2vw",
        width: "100%"
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
        textDecoration: "none",
        margin: 0
    },
    logo: {
        display: "flex",
        marginLeft: 60,
        width: 200
    },
    social: {
        marginLeft:5,
        minWidth: "5%",
        width: "5%"
    },
});