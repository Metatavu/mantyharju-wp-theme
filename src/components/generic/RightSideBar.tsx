import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '../../styles/right-side-bar';

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
 * A component for post page right side bar content
 */
class RightSideBar extends React.Component<Props, State> {

  /**
   * Component constructor
   * 
   * @param props 
   */
  constructor(props: Props) {
    super(props);
    this.state = {};
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
      <div>
        <h2>Malliotsikko</h2>
        <p>Eija Kling markkinointipäällikkö Puh. 040 744 1477</p>
        <a>Lorem ipsum</a>
        <a>Lorem ipsum</a>
        <a>Lorem ipsum</a>
      </div>
    )
  }
}

export default withStyles(styles)(RightSideBar);