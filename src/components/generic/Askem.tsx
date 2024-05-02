import * as React from "react";
import styles from "../../styles/askem-styles";
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
 * A component for basic layout footer contents
 */
class Askem extends React.Component<Props, State> {

  /**
   * Constructor
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    if ((window as any).askem) {
      try {
        (window as any).askem.reset();
      } catch (e) {
        console.error("Askem reset failed", e);
      }
    }
  }

  /**
   * Component render
   */
  public render() {
    const { classes } = this.props;

    return (
      <div className="askem"></div>
    );
  }
}

export default withStyles(styles)(Askem);