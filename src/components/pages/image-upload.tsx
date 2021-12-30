import React from "react";
import { DropzoneDialog } from 'material-ui-dropzone';
import { Button, IconButton, GridListTileBar} from "@material-ui/core";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import AddIcon from '@material-ui/icons/AddAPhoto';

import DeleteIcon from '@material-ui/icons/DeleteForever';
import theme from "../../styles/image-upload";

interface Props {
  userId?: string
  initialImageUrl?: string | null
  label: string;
  onDelete: () => void;
  onSave: (url: string) => void;
}

/**
 * Interface representing component state
 */
interface State {
  uploadInProgress: boolean;
  dialogOpen: boolean;
  uploadedImage?: File;
  uploadedImageUrl?: string;
}

export default class ImageUpload extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      uploadInProgress: false,
      dialogOpen: false
    }
  }

  public componentDidUpdate = (prevProps:Props) => {

    if(prevProps.initialImageUrl !== this.props.initialImageUrl){
      this.setState({
        uploadedImageUrl: undefined,
        uploadedImage: undefined
      })
    }
  }

  public render() {
    const { label } = this.props;

    if(!this.state.uploadInProgress){
      return <>
      <Button fullWidth={ true } startIcon={ <AddIcon /> } variant="outlined" color="secondary" onClick={ this.openDialog }>
        Lisää kuva
      </Button>
      <DropzoneDialog
        open={ this.state.dialogOpen }
        onClose={ this.closeDialog }
        onSave={ this.onFileSave }
        onDrop={ this.onFileDropped }
        cancelButtonText="Peruuta"
        submitButtonText="Lähetä"
        filesLimit={ 1 }
        maxFileSize={ 20000000 }
        dropzoneText={ label } />
      { (this.props.initialImageUrl || this.state.uploadedImage) &&
        this.renderImage()
      }
    </>
    } else {
      return <div></div>
    }
  }

  /**
   * Render image if either initialImageUrl or uploadedImageUrl can be found exists
   */
  private renderImage = () => {

    const { uploadedImageUrl } = this.state;
    const { initialImageUrl } = this.props;

    let imageToUse = "";
    if (uploadedImageUrl) {
      imageToUse = uploadedImageUrl;
    } else if(initialImageUrl) {
      imageToUse = initialImageUrl;
    }
    return (
      <div style={{ marginTop: theme.spacing(2) }}>
        <GridList cellHeight={ 280 } cols={ 1 }>
          <GridListTile key={ imageToUse }>
            <img src={ imageToUse } alt="" />
            <GridListTileBar
              title={ "Poista kuva" }
              actionIcon= {
                <IconButton onClick={ this.removeImage }>
                <DeleteIcon />
              </IconButton>
              }
            />
          </GridListTile>
        </GridList>
      </div>
    );
  }

  /**
   * Open upload image dialog
   */
  private openDialog = () => {
    this.setState({
      dialogOpen: true
    })
  }

  /**
   * Close upload image dialog
   */
  private closeDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }

  /**
   * Remove uploaded image
   */
  private removeImage = () => {
    const { onDelete } = this.props;

    onDelete();
    this.setState({
      uploadedImageUrl: undefined,
      uploadedImage: undefined
    });
    this.props.onSave("");
  }

  /**
   * Retrieve pre-signed POST data from a dedicated API endpoint.
   * @param selectedFile
   * @returns {Promise<any>}
   */
  private getPresignedPostData = (selectedFile: File): any => {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      const url = "https://h972s5vutd.execute-api.eu-central-1.amazonaws.com/default/mantyharjuimageupload";
      
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          userId: "eventimages",
          name: selectedFile.name,
          type: selectedFile.type
        })
      );
      xhr.onload = function() {
        resolve(JSON.parse(this.responseText));
      };
    });
  };

  /**
   * Upload file to S3 with previously received pre-signed POST data.
   * @param presignedPostData
   * @param file
   * @returns {Promise<any>}
   */
  private uploadFileToS3 = (presignedPostData: any, file: File) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      Object.keys(presignedPostData.fields).forEach(key => {
        formData.append(key, presignedPostData.fields[key]);
      });

      formData.append("file", file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", presignedPostData.url, true);
      xhr.send(formData);
      xhr.onload = function() {
        this.status === 204 ? resolve() : reject(this.responseText);
      };
    });
  };

  /**
   * On save click handler
   */
  private onFileSave = async () => {
    const uploadFile = this.state.uploadedImage;

    if (!uploadFile) {
      return;
    }
    this.setState({uploadInProgress: true})
    try {
      const res = await this.getPresignedPostData(uploadFile);
      await this.uploadFileToS3(res.data, uploadFile);
      const imageUrl = `${res.basePath}/${res.data.fields.key}`;
      this.props.onSave(imageUrl);
      this.setState({uploadedImageUrl: imageUrl})
      this.closeDialog()
    } catch (e) {
      //TODO: show error
    }

    this.setState({uploadInProgress: false})

  }

  /**
   * On file upload handler
   */
  private onFileDropped = async (files: File[]) => {
    const file = files[0];
    if (!file) {
      return;
    }
    
    try {
      const fileName = file.name.replace(/ /g, "_");
      const uploadFile = new File([file as Blob], fileName, { type: file.type });
      this.setState({
        uploadedImage: uploadFile
      })
    } catch (e) {
      //TODO: show error
    }
  }
}