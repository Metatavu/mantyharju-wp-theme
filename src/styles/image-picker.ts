import { createStyles } from "@material-ui/core";

export default createStyles({

  imagePicker: {
    width: "100%"
  },

  imagePickerSelected: {
    opacity: 0.7
  },

  imagePickerSelectedChecked: {
    display: "inline-block",
    transition: ".5s ease",
    position: "absolute",
    bottom: 0,
    right: 0
  },

  imagePickerSelectedClear: {
    clear: "both"
  },

  imagePickerResponsive: {
    position: "relative",
    margin: "0 6px",
    float: "left",
    opacity: 1,
    "&:hover": {
      cursor: "pointer"
    },
  },

  imagePickerResponsiveThumbnail: {
    border: "1px solid #ddd",
    borderRadius: 4,
    padding: 5,
    width: 150,
    opacity: 1,
    margin: 0,
    "&:hover": {
      boxShadow: "0 0 2px 1px rgba(0, 140, 186, 0.7)"
    },
  },

  imagePickerResponsiveChecked: {
    display: "none"
  },

  imagePickerResponsiveSelected: {
    backgroundColor: "#008cba"
  }

});