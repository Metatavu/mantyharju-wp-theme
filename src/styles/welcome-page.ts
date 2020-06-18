import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  /**
   * Mantyharju-theme
   */
  heroImageDiv: {
    backgroundColor:"000000",
    color: "#fff",
    height:"30vw",
    alignContent:"middle",
    maxHeight:"40vw",
    paddingLeft: "8vw",
    paddingRight: "8vw",
    paddingTop: "8vw",
    width:"100%"
  },
  heroButton: {
    backgroundColor: "red"
  },
  contentImageDiv: {
    display:"flex",
    flexDirection:"row",
    width: "90%",
    marginTop: "1vw",
    marginLeft:"5%",
    marginRight:"5%",
    height:"25vw"
  },
  contentImage: {
    width: "50%",
    backgroundColor:"red",
    height:"25vw"
  },
  contentText: {
    width: "50%",
    backgroundColor:"green",
    height:"25vw"
  },
  
  // Mantyharju-theme ends, rest of the code can be deleted before production

  root: {
    height: "100vh"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  buttonSection: {
    textAlign: "center",
    opacity: 0.8
  },
  menuButtonOne: {
    backgroundColor: "#386dc2",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#386dc2"
    }
  },
  menuButtonTwo: {
    backgroundColor: "#ffdf3d",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#ffdf3d"
    }
  },
  menuButtonThree: {
    backgroundColor: "#59a345",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#59a345"
    }
  },
  menuButtonFour: {
    backgroundColor: "#de782a",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#de782a"
    }
  },
  logoBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "298px",
    marginBottom: 50
  },
  localeMenu: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between"
  },
});