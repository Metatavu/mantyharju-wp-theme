import * as React from 'react';
import bar from "../../resources/img/headerImage.png";
import styles from "../../styles/header-styles";
import { MenuLocationData, MenuItemData, Page } from "../../generated/client/src";
import { withStyles, WithStyles, Link } from '@material-ui/core';
import ReactHtmlParser from "react-html-parser";

/**
 * Facebook-logo license: https://commons.wikimedia.org/wiki/File:Facebook_William_Aditya_Sarana.png
 */

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  localeMenu?: MenuLocationData
  parentPage?: number
  pages: Page[]
}

/**
 * Component state
 */
interface State {
  menuVisibility: boolean,
  menuItemCurrent?: Page,
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
      menuVisibility: false,
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
        <div onMouseLeave={() => { this.onMouseLeave() }}>
          <div className={classes.mainMenu}>
            {this.renderMenu()}
          </div>
          <div className={classes.mainMenu}>
            {this.renderSubmenu()}
          </div>
        </div>
      </div>
    )
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
          localeMenu.items.map(this.renderLocaleMenuItem)
        }
      </div>
    );
  }

  /**
   * Render menu item method
   */
  private renderLocaleMenuItem = (item: MenuItemData) => {
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
   * Render main menu method
   */
  private renderMenu = () => {
    const { classes } = this.props;
    let menuHeaderItems = this.getChildMenuPages(this.props.parentPage || -1);
    if (!menuHeaderItems) {
      return null;
    } else {
      return (
        <div className={classes.nav}>
          {
            menuHeaderItems.map(this.renderSubmenuHeaders)
          }
        </div>
      );
    }
  }

  /**
   * Render submenu headers
   * @param page Page
   */
  private renderSubmenuHeaders = (page: Page) => {
    const { classes } = this.props;
    return (
      <div>
        <h2
          onMouseEnter={() => { this.onMouseEnter(page) }}
          onClick={() => { this.onPageClick(page) }}
          className={ classes.navLink }
        >
          {
            ReactHtmlParser(page.title ? page.title.rendered || "" : "")
          }
        </h2>
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
      let childMenuPages = this.getChildMenuPages(menuItemCurrent.id ? menuItemCurrent.id : -1);
      return (
        (childMenuPages ? childMenuPages : new Array()).map((childPage: Page) => {
          return (
            <div className={ classes.menuItems }>
              <h3 onClick={() => { this.onPageClick(childPage) }}>{ ReactHtmlParser(childPage.title ? childPage.title.rendered || "" : "") }</h3>
              { this.renderLowLevelMenuPages(childPage) }
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
   * @param page Page
   */
  private renderLowLevelMenuPages = (parentPage: Page) => {
    let childPages = this.getChildMenuPages(parentPage.id ? parentPage.id : -1);
    if (childPages == null) {
      return null;
    } else {
      return (
        childPages.map(childPage => {
          return (
            <h5 onClick={() => { this.onPageClick(childPage) }}>{ ReactHtmlParser(childPage.title ? childPage.title.rendered || "" : "") }</h5>
          )
        })
      )
    } 
  }

  /**
   * Redirects to page URL
   * @param page Page
   */
  private onPageClick = (page: Page) => {
    window.location.href = page.link || "";
  }

  /**
   * Mouse enter event handler
   * @param page Page
   */
  private onMouseEnter = (page: Page) => {
    let currentPage = this.state.menuItemCurrent;

    this.setState({
      menuVisibility: true,
    });

    if (currentPage != page) {

      this.setState({
        menuItemCurrent: page,
      });
    }
  }

  /**
   * Mouse enter event handler
   */
  private onMouseLeave = () => {

    this.setState({
      menuVisibility: false,
    });
  }

  /**
   * Return array of page's child pages
   * @param parentPageId number
   * @returns Page[]
   */
  private getChildMenuPages = (parentPageId: number) => {
    const { pages } = this.props;
    let menuPagesArray: Page[] = new Array();
    if (!pages) {
      return null;
    } else {
      pages.map(page => {
        if (page.parent == parentPageId) {
          menuPagesArray.push(page);
        }
      })
      return menuPagesArray;
    }
  }
}

export default withStyles(styles)(Header);