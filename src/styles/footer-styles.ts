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
    footerContent1: {
        width: "30%"
    },
    footerContent2: {
        width: "20%"
    },
    footerContent3: {
        width: "20%"
    },
    footerContent4: {
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