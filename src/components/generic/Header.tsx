import * as React from 'react';
import bar from "../../resources/img/headerImage.png";
import { MenuLocationData, MenuItemData, Category } from "../../generated/client/src";
import { withStyles, WithStyles, Link, Container } from '@material-ui/core';
import styles from "../../styles/header-styles";

/**
 * Facebook-logo license: https://commons.wikimedia.org/wiki/File:Facebook_William_Aditya_Sarana.png
 */

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  mainMenu?: MenuLocationData
  localeMenu?: MenuLocationData
  categories: Category[]
  topMenuCategoryId?: number
}

/**
 * Component state
 */
interface State {
  menuVisibility: boolean,
  menuItemCurrent?: MenuItemData
}

/**
 * A component for basic layout footer contents
 */
class Header extends React.Component<Props, State> {

  /**
   * Constructor
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      menuVisibility: false
    };
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
        <div className={classes.searchSection}>
          <a href="/?lang=fi">
            <img className={classes.logoBar} src={bar} />
          </a>
          <div className={classes.localeMenu}>
            {this.renderLocale()}
          </div>
          <div className={classes.searchBar}>
            <input type="text" placeholder="Search.." />
            <button>Go</button>
          </div>
        </div>
        <div className={classes.mainMenu}>
          { this.renderMenu() }
        </div>
        <div className={classes.mainMenu}>
          { this.renderSubmenu() }
        </div>
      </div>
    )
  }

  /**
   * Render Top Menu bar
   */
  private renderTopMenuBar = () => {
    const { classes } = this.props;
    const { categories, topMenuCategoryId } = this.props;
    if (!categories) {
      return null;
    } else {
      return categories.map(category => {
        if (category.parent == topMenuCategoryId) {
          return (
            <h3 className={classes.mainMenuItem} onClick={() => { this.onMenuItemClick(category) }}>{ category.name ? category.name || "" : "" }</h3>
          );
        } else {
          return null;
        }
      });
    }
    
  }

  private onMenuItemClick = (category: Category) => {
    
  }

  /**
   * Render Main top menu method
   */
  private renderTopMenu = () => {
    const { mainMenu } = this.props;
    const { classes } = this.props;

    if (!mainMenu || !mainMenu.items) {
      return null;
    }

    mainMenu.items.map(item => {
      item.child_items
    })

    return (
      mainMenu.items.map(item => {
        if (item.child_items && this.state.menuVisibility) {
          
        }
      })
    );
  }

  /**
   * Render main menu method
   */
  private renderMenu = () => {
    const { mainMenu } = this.props;
    const { classes } = this.props;

    if (!mainMenu || !mainMenu.items) {
      return null;
    }

    return (
      <div className={ classes.nav }>
        {
          mainMenu.items.map(this.renderSubmenuHeaders)
        }
      </div>
    );
  }

  /**
   * Render locale menu method
   */
  private renderLocale = () => {
    const { localeMenu } = this.props;
    const { classes } = this.props;

    if (!localeMenu || !localeMenu.items) {
      return null;
    }

    return (
      <div className={ classes.nav }>
        {
          localeMenu.items.map(this.renderMenuItem)
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

  /**
   * Render submenu headers
   */
  private renderSubmenuHeaders = (item: MenuItemData) => {
    const { classes } = this.props;
    return (
      <div>
        <h2 onClick={() => { this.onClick(item) }} className={ classes.navLink }>{ item.title }</h2>
      </div>
    );
  }

  /**
   * Render submenu headers
   */
  private renderSubmenu = () => {
    const { classes } = this.props;
    const { menuVisibility, menuItemCurrent } = this.state;
    if (menuItemCurrent && menuVisibility) {
      console.log("Menu item current: ", menuItemCurrent);
      return (
        (menuItemCurrent.child_items ? menuItemCurrent.child_items : new Array()).map((childItem: MenuItemData) => {
          console.log("Child child: ", childItem);
          return (
            <div className={ classes.navLink }>
              <h3>{ childItem.title }</h3>
              { this.renderPostLinks(childItem) }
            </div>
          )
        })
      );
    } else {
      return null;
    }
  }

  /**
   * Render topmenu post links
   */
  private renderPostLinks = (childItem: MenuItemData) => {
    const { classes } = this.props;
    const { menuVisibility, menuItemCurrent } = this.state;
      return (
        (childItem.child_items ? childItem.child_items : new Array()).map(childItem => {
          return (
            <h5>{ childItem.title }</h5>
          )
        })
      )
  }

  /**
   * Render submenu
   */
  private onClick = (item: MenuItemData) => {
    const { classes } = this.props;
    let visibility = this.state.menuVisibility ? false : true;
    this.setState({
      menuItemCurrent: item,
      menuVisibility: visibility,
    });
    console.log("States: ", this.state.menuItemCurrent, " and ", this.state.menuVisibility);
    // return (
    //   (item.child_items ? item.child_items : new Array()).map(childItem => {
    //     console.log("CHILD ITEM IS: ", childItem);
    //     return (
    //       <div>
    //         <h3 className={ classes.navLink }>{ childItem.title }</h3>
    //       </div>
    //     )
    //   })
    // );
  }
}

export default withStyles(styles)(Header);