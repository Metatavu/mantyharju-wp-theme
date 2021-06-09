import * as React from "react";
import styles from "../../styles/tree-view";
import { withStyles, WithStyles } from "@material-ui/core";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {

}

/**
 * Component state
 */
interface State {

}

/**
 * A component for displaying tree view link structure
 */
class VideoLightBox extends React.Component<Props, State> {

  /**
   * Component constructor
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount() {

  }

  /**
   * Component render
   */
  public render() {

    return (
      <div >
      
      </div>
    );
  }

}

export default withStyles(styles)(VideoLightBox);