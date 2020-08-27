import * as React from "react";
import bar from "../../resources/img/mantyharju-logo-svg.svg";
import styles from "../../styles/header-styles";
import { MenuLocationData, MenuItemData, Page, SearchResult, GetWpV2SearchTypeEnum } from "../../generated/client/src";
import { withStyles, WithStyles, Link, Typography, SvgIcon, Hidden, IconButton } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import ApiUtils from "../../utils/ApiUtils";
import * as Autocomplete from "react-autocomplete";
import * as classNames from "classnames";
import { searchIconVectorPath } from "../../resources/icons/svgIcons";
import HamburgerIcon from "@material-ui/icons/MenuSharp";
import MobileMenu from "./MobileMenu";

/**
 * Facebook-logo license: https://commons.wikimedia.org/wiki/File:Facebook_William_Aditya_Sarana.png
 */

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  lang: string,
  localeMenu?: MenuLocationData
  topMenu?: MenuLocationData
  parentPage?: number
  pages: Page[]
}

/**
 * Component state
 */
interface State {
  menuVisibility: boolean,
  menuItemCurrent?: Page,
  searchString: string,
  results: SearchResult[],
  mobileMenuVisible: boolean
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
      searchString: "",
      results: [],
      mobileMenuVisible: false
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount() {}

  /**
   * Component render
   */
  public render() {
    const { classes } = this.props;
    const { searchString, results, menuVisibility } = this.state;

    const menuStyle: React.CSSProperties = {
      borderRadius: "0",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      position: "absolute",
      overflowY: "auto",
      maxHeight: 320,
      zIndex: 1000,
    };

    return (
      <>
        <div className={ classes.header }>
          <div className={ classes.topSection }>
            <a href="/?lang=fi">
              <img className={ classes.logoBar } src={ bar } />
            </a>
            {/* Hide this part of the header when on small screens */}
            <Hidden smDown implementation="css">
              <div className={ classes.headerRight }>
                <div className={ classes.localeMenu }>
                  { this.renderLocale() }
                </div>
                  { this.renderTopMenu() }
                  <div className={ classes.searchBar }>
                    <Autocomplete
                      getItemValue={ this.getItemValue }
                      items={ results }
                      renderItem={ this.renderItem }
                      value={ searchString }
                      onChange={ this.setSearchString }
                      onSelect={ this.selectItem }
                      menuStyle={ menuStyle }
                      />
                    <div className={ classes.searchIconWrapper }>
                      <SvgIcon color="secondary" >
                        { searchIconVectorPath }
                      </SvgIcon>
                    </div>
                  </div>
              </div>
            </Hidden>
            <IconButton
              className={ classes.menuButton }
              color="primary"
              onClick={ this.showMobileMenu }
            >
              <HamburgerIcon fontSize="default" />
            </IconButton>
          </div>
          <Hidden smDown implementation="css">
            <div className={ classes.menuWrapper } onMouseLeave={() => { this.onMouseLeave(); }}>
              <div className={ classes.mainMenu }>
                { this.renderMenu() }
              </div>
              <div className={ classNames(classes.subMenu, menuVisibility ? "visible" : "" ) }>
                { this.renderSubmenu() }
              </div>
            </div>
          </Hidden>
        </div>
        <MobileMenu
          lang={ this.props.lang }
          onClose={ () => this.setState({ mobileMenuVisible: false }) }
          visible={ this.state.mobileMenuVisible }
        />
      </>
    );
  }

  /**
   * Render locale menu method
   */
  private renderLocale = () => {
    const { localeMenu, classes } = this.props;

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
   * Render top menu method
   */
  private renderTopMenu = () => {
    const { topMenu, classes } = this.props;

    if (!topMenu || !topMenu.items) {
      return null;
    }

    return (
      <div className={ classes.topMenu }>
        {
          topMenu.items.map(this.renderTopMenuItem)
        }
      </div>
    );
  }

  /**
   * Render top menu item method
   */
  private renderTopMenuItem = (item: MenuItemData) => {
    const { classes } = this.props;
    return (
      <Link
        variant="h6"
        key={ item.db_id }
        href={ item.url }
        className={ classes.topMenuItem }
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
        <div className={ classes.nav }>
          {
            menuHeaderItems.map(this.renderMenuItems)
          }
        </div>
      );
    }
  }

  /**
   * Render submenu headers
   * @param page Page
   */
  private renderMenuItems = (page: Page) => {
    const { classes } = this.props;
    const { menuItemCurrent } = this.state;
    const highlightThisMenuItem = menuItemCurrent === page;
    return (
      <Typography
        variant="subtitle1"
        color="textSecondary"
        onMouseEnter={() => { this.onMouseEnter(page); }}
        onClick={() => { this.onPageClick(page); }}
        className={ classNames( classes.navLink, highlightThisMenuItem ? "highlight" : "" )}
      >
        {
          ReactHtmlParser(page.title ? page.title.rendered || "" : "")
        }
      </Typography>
    );
  }

  /**
   * Render submenu headers
   */
  private renderSubmenu = () => {
    const { classes } = this.props;
    const { menuVisibility, menuItemCurrent } = this.state;
    if (menuItemCurrent && menuVisibility) {
      const childMenuPages = this.getChildMenuPages(menuItemCurrent.id ? menuItemCurrent.id : -1);
      return (
        (childMenuPages ? childMenuPages : new Array()).map((childPage: Page) => {
          return (
            <div className={ classes.menuItems }>
              <Typography
                variant="body1"
                color="primary"
                className={ classes.subMenuLink }
                onClick={() => { this.onPageClick(childPage); }}
              >
                { ReactHtmlParser(childPage.title ? childPage.title.rendered || "" : "") }
              </Typography>
              { this.renderLowLevelMenuPages(childPage) }
            </div>
          );
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
    const { classes } = this.props;
    let childPages = this.getChildMenuPages(parentPage.id ? parentPage.id : -1);
    if (childPages == null) {
      return null;
    } else {
      return (
        childPages.map(childPage => {
          return (
            <Typography
              variant="body1"
              color="textSecondary"
              className={ classes.lowLevelLink }
              onClick={() => { this.onPageClick(childPage); }}
            >
              { ReactHtmlParser(childPage.title ? childPage.title.rendered || "" : "") }
            </Typography>
          );
        })
      );
    }
  }

  /**
   * Method for rendering list item
   *
   * @param item item
   * @param isHighlighted boolean
   */
  private renderItem = (item: any, isHighlighted: boolean) => {
    const { classes } = this.props;
    return (
      <div className={ classNames( classes.autocompleteItem, isHighlighted ? "" : "" )}>
        { item.title }
      </div>
    );
  }

  /**
   * Method for getting item value
   *
   * @param item item
   * @returns string
   */
  private getItemValue = (item: any) => {
    return item.title;
  }

  /**
   * Method for selecting item
   *
   * @param value item value
   * @param item item
   */
  private selectItem = (value: string, item: any) => {
    window.location.href = item.url;
  }

  /**
   * Method for setting search string
   *
   * @param event event object
   */
  private setSearchString = async (event: any) => {
    const { value } = event.target;
    const api = ApiUtils.getApi();
    this.setState({
      searchString: value
    });
    if (value) {
      const results = await api.getWpV2Search({ search: value, type: GetWpV2SearchTypeEnum.Post, subtype: "post" });
      this.setState({
        results: results
      });
    } else {
      this.setState({
        results: []
      });
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

    if (currentPage !== page) {

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
      menuItemCurrent: undefined
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
        if (page.parent === parentPageId) {
          menuPagesArray.push(page);
        }
      });
      return menuPagesArray;
    }
  }

  /**
   * Mobile menu visibility method
   */
  private showMobileMenu = () => {
    return (
      this.setState({
        mobileMenuVisible: true
      })
    );
  }
}

export default withStyles(styles)(Header);