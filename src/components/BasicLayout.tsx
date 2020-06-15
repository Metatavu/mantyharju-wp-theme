import * as React from "react";
import classNames from "classnames";
import { AppBar, WithStyles, withStyles, Button, IconButton, Link, Hidden } from "@material-ui/core";
import logo from "../resources/svg/logo.svg";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import SearchIcon from "@material-ui/icons/SearchRounded";
import HamburgerIcon from "@material-ui/icons/MenuSharp";
import { MenuLocationData, MenuItemData } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import SiteMenu from "./SiteMenu";
import SiteSearch from "./SiteSearch";
import styles from "../styles/basic-layout";
import Footer from "./Footer";
import strings from "../localization/strings";
import { DomElement } from "domhandler";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  lang: string
}

/**
 * Interface representing component state
 */
interface State {
  loading: boolean
  mainMenu?: MenuLocationData
  localeMenu?: MenuLocationData
  scrollPosition: number
  siteMenuVisible: boolean
  siteSearchVisible: boolean
}

/**
 * React component for basic application layout
 */
class BasicLayout extends React.Component<Props, State> {

  /**
   * Constructor
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false
    };
  }

  public componentDidMount = async () => {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      loading: true,
    });

    const api = ApiUtils.getApi();

    const [mainMenu, localeMenu] = await Promise.all(
      [
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" })
      ]
    )

    this.setState({
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
    });
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Render basic layout
   */
  public render() {
    const { classes } = this.props;
    let appBarClasses = classNames( classes.appBar );
    let logoClasses = classNames( classes.logo );
    if (this.state.siteMenuVisible) {
      appBarClasses = classNames( classes.appBar, classes.darken );
    } else if (this.state.scrollPosition > 70) {
      appBarClasses = classNames( classes.appBar, classes.smallAppBar );
      logoClasses = classNames( classes.logo, classes.smallLogo );
    }

    return (
      <div
        className={ classes.root }
        // disable scrolling when search and menu dialogs are open
        style={ this.state.siteMenuVisible || this.state.siteSearchVisible ? {overflow: "hidden"} : {overflow: "visible"} }
      >
        <AppBar elevation={ 0 } className={ appBarClasses }>
          <div className={ classes.headerSection }>
            <Link href={ `/?lang=${ this.props.lang }` }>
              <img className={ logoClasses } src={ logo } />
            </Link>
            <Hidden smDown implementation="css">
              <div className={ classes.topNavDesktop }>
                { this.renderMenu() }
              </div>
            </Hidden>
            <IconButton
              className={ classes.menuButton }
              color="primary"
              onClick={ this.showSiteMenu }
            >
              <HamburgerIcon fontSize="large" />
            </IconButton>
          </div>
          <Hidden smDown implementation="css">
            <div className={ classes.headerSection }>
              { this.renderDonateButton() }
              {/* { this.renderSearch() } */}
              { this.renderLocaleMenu() }
            </div>
          </Hidden>
        </AppBar>
        <div className={ classes.content }>
          { this.props.children }
        </div>
        <SiteMenu
          lang={ this.props.lang }
          tinyHeader={ this.state.scrollPosition > 70 }
          onClose={ () => this.setState({ siteMenuVisible: false }) }
          visible={ this.state.siteMenuVisible }
        />
        <SiteSearch
          lang={ this.props.lang }
          tinyHeader={ this.state.scrollPosition > 70 }
          onClose={ () => this.setState({ siteSearchVisible: false }) }
          visible={ this.state.siteSearchVisible }
        />
        <Footer lang={ this.props.lang } logo={ logo }  />
      </div>
    );
  }

  /**
   * Render menu method
   */
  private renderMenu = () => {
    const mainMenu = this.state.mainMenu;
    const { classes } = this.props;

    if (!mainMenu || !mainMenu.items) {
      return null;
    }

    return (
      <div className={ classes.nav }>
        {
          mainMenu.items.map(this.renderMenuItem)
        }
        <Link variant="h6" className={ classes.navLink } onClick={ this.showSiteMenu }>{ strings.morePlus }</Link>
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
   * Render menu method
   */
  private renderLocaleMenu = () => {
    const localeMenu = this.state.localeMenu;
    const { classes } = this.props;

    if (!localeMenu || !localeMenu.items) {
      return null;
    }

    return (
      <div className={ classes.localeMenu }>
        {
          localeMenu.items.map(this.renderLocaleMenuItem)
        }
      </div>
    );
  }

  /**
   * get html element classes
   *
   * @param node DomElement
   */
  private getElementClasses = (node: DomElement): string[] => {
    const classString = node.attribs ? node.attribs.class : "";
    if (node.attribs && node.attribs.class) {
      return classString.split(" ");
    }

    return [];
  }

  /**
   * Get html text content
   */
  private getElementTextContent = (node: DomElement) => {
    return node.children && node.children[0] ? node.children[0].data as string : "";
  }

  /**
   * Transform html source span element content into normal text
   */
  private transformContent = (node: DomElement, index: number) => {
    const styleClassNames = this.getElementClasses(node);
    if (styleClassNames.indexOf("wpml-ls-native") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return this.getElementTextContent(childNode);
      }
    }
    return convertNodeToElement(node, index, this.transformContent);
  }

  /**
   * Render locale menu item method
   */
  private renderLocaleMenuItem = (item: MenuItemData) => {
    const { classes } = this.props;
    if (!this.state.localeMenu) {
      return null;
    }

    const urlParts = (item.url || "").split("/");
    let url = urlParts.pop() || urlParts.pop();
    const langText = ReactHtmlParser(item.title ? item.title || "" : "", { transform: this.transformContent });
    if (!url || !url.startsWith("?")) {
      url = "?lang=fi";
    }
    return (
      <Link
        variant="subtitle1"
        key={ item.db_id }
        href={ url }
        className={ classes.navLink }
        >
          {
            langText
          }
      </Link>
    );
  }

  /**
   * Render donate button method
   */
  private renderDonateButton = () => {
    const { classes } = this.props;
    return (
      <Link href={ `/lahjoita/?lang=${ this.props.lang }` }>
        <Button
          variant="contained"
          className={ classes.donate }
          endIcon={ <ArrowIcon /> }
          >
          { strings.donate }
        </Button>
      </Link>
    );
  }

  /**
   * Render search button method
   */
  private renderSearch = () => {
    return (
      <IconButton onClick={ this.showSiteSearch }>
        <SearchIcon color="primary" />
      </IconButton>
    );
  }

  /**
   * Update scrolling position method
   */
  private handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      scrollPosition: currentScrollPos
    });
  }

  /**
   * Site menu visibility method
   */
  private showSiteMenu = () => {
    return (
      this.setState({
        siteMenuVisible: true
      })
    );
  }

  /**
   * Site search visibility method
   */
  private showSiteSearch = () => {
    return (
      this.setState({
        siteSearchVisible: true
      })
    );
  }
}

export default withStyles(styles)(BasicLayout);