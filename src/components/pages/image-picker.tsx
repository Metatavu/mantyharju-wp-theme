import React from 'react'
import { Image } from "../../types/image-picker";
import { WithStyles, withStyles } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import styles from "../../styles/image-picker";
import classNames from 'classnames';

interface Props extends WithStyles<typeof styles> {
  images: Image[];
  onPick: (image: Image) => void
}

class ImagePicker extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  private renderImage = (image: Image, onImagePick: () => void) => {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.imagePickerResponsive, image.selected && classes.imagePickerResponsiveSelected)}
        onClick={ onImagePick }>
        <img src={image.src}
          className={classNames(classes.imagePickerResponsiveThumbnail, image.selected && classes.imagePickerSelected)}
          style={{ width: 150, height: 150, objectFit: "cover" }}
        />
      </div>
    );
  }

  public render = () => {
    const { classes, images, onPick } = this.props;

    return (
      <div className={ classes.imagePicker }>
        { images.map(image => this.renderImage(image, () => onPick(image))) }
        <div className={ classes.imagePickerSelectedClear }/>
      </div>
    );
  } 

}

export default withStyles(styles)(ImagePicker)