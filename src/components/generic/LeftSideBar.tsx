import * as React from 'react';
import { MenuLocationData, MenuItemData } from "../../generated/client/src";
import { withStyles, WithStyles, Link, Container } from '@material-ui/core';
import styles from "../../styles/header-styles";

/**
 * Facebook-logo license: https://commons.wikimedia.org/wiki/File:Facebook_William_Aditya_Sarana.png
 */

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  quickLinks? :MenuLocationData
}

/**
 * Component state
 */
interface State {
}

/**
 * A component for basic layout footer contents
 */
class LeftSideBar extends React.Component<Props, State> {

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
  public componentDidMount() {
  }

  /**
   * Component render
   */
  public render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <img className={ classes.logoBar } src={ bar } /> */}
        {/* <div className={classes.searchSection}>
          <div className={classes.localeMenu}>
            {this.renderLocale()}
          </div>
          <div className={classes.searchBar}>
            <input type="text" placeholder="Search.." />
            <button>Go</button>
          </div>
        </div> */}
        <div className={classes.mainMenu}>
          {this.renderMenu()}
        </div>
      </div>
    )
  }

  /**
   * Render main menu method
   */
  private renderMenu = () => {
    const { quickLinks } = this.props;
    const { classes } = this.props;

    if (!quickLinks || !quickLinks.items) {
      return null;
    }

    return (
      <div className={ classes.nav }>
        {
          quickLinks.items.map(this.renderMenuItem)
        }
      </div>
    );
  }

  /**
   * Render locale menu method
   */
  private renderLocale = () => {
    const { quickLinks } = this.props;
    const { classes } = this.props;

    if (!quickLinks || !quickLinks.items) {
      return null;
    }

    return (
      <div className={ classes.nav }>
        {
          quickLinks.items.map(this.renderMenuItem)
        }
      </div>
    );
  }

  /**
   * Render menu item method
   */
  private renderMenuItem = (item: MenuItemData) => {
    const { classes } = this.props;
    return (
      <Link
        variant="h6"
        key={ item.db_id }
        href={ item.url }
        className={ classes.navLink }
      >
        {
          item.title
        }
      </Link>
    );
  }
}

export default withStyles(styles)(LeftSideBar);