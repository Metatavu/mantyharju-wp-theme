import * as React from 'react';
import { Page } from "../../generated/client/src";
import { withStyles, WithStyles } from '@material-ui/core';
import styles from "../../styles/left-side-bar";
import ReactHtmlParser from "react-html-parser";

/**
 * Facebook-logo license: https://commons.wikimedia.org/wiki/File:Facebook_William_Aditya_Sarana.png
 */

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  currentPage?: Page
  parentPage?: Page
  pages: Page[]
  locationPathArray: string[]
  leftMenuCurrentTopPage?: Page
}

/**
 * Component state
 */
interface State {
  menuVisibility: boolean,
  menuItemCurrent?: Page,
  parentPageObtained?: Page,
  expandedMenuFor?: Page,
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
    const { parentPage } = this.props;
    let menuItemsArray = this.menuItemsArrayProvider();
    let menuHeaderItems = this.getChildMenuPages(parentPage ? parentPage.id || -1 : -1);
    if (!menuHeaderItems && this.menuItemsArrayProvider() == null) {
      return null;
    } else {
      return (
        <div>
          {
            (menuItemsArray ? menuItemsArray : new Array()).map(this.renderMenuHeaders)
          }
        </div>
      );
    }
  }

  /**
   * Render menu headers
   * @param page Page
   */
  private renderMenuHeaders = (page: Page) => {
    const { classes } = this.props;
    console.log("Recieved page is: ", page);
    return (
      <div>
        <h2
          onClick={() => { this.onPageClick(page) }}
          className={ classes.navLink }
        >
          {
            ReactHtmlParser(page.title ? page.title.rendered || "" : "")
          }
        <a>{ this.renderArrowSymbol(page) }</a>
        </h2>
        { this.renderExpandedLinks(page) }
      </div>
    );
  }

  /**
   * Render arrow menu symbol
   * @param page Page
   */
  private renderArrowSymbol = (parentPage: Page) => {
    const { classes } = this.props;
    if (this.renderExpandedLinks(parentPage) == null) {
        return null;
    } else {
        return (
            <a className={ classes.menuExpandedArrow }>∨</a>
        )
    }
  }

  /**
   * Render expanded menu links
   * @param page Page
   */
  private renderExpandedLinks = (parentPage: Page) => {
    const { locationPathArray, leftMenuCurrentTopPage, currentPage } = this.props;
    const currentPageSlug = currentPage ? currentPage.slug || "" : "";
    const parentPageSlug = parentPage ? parentPage.slug || "" : "";
    let childPages = this.getChildMenuPages(parentPage.id ? parentPage.id : -1);
    if (!locationPathArray.length && !leftMenuCurrentTopPage && !currentPage) {
      return null;
    } else if (locationPathArray.includes(currentPageSlug) && locationPathArray.includes(parentPageSlug)) {
        return (
            (childPages ? childPages : new Array()).map(childPage => {
                return (
                    <h5 onClick={() => { this.onPageClick(childPage) }}>{ReactHtmlParser(childPage.title ? childPage.title.rendered || "" : "")}</h5>
                )
            })
        )
    } else {
        return null;
    }
  }

  /**
   * Redirects to page URL
   * @param page Page
   */
  private onPageClick = (page: Page) => {
    console.log("Clicked, page is: ", page.title);
    window.location.href = page.link || "";
  }

  /**
   * Returns menu items array based on the current page level
   * @returns Page[]
   */
  private menuItemsArrayProvider = () => {
    const { parentPage, leftMenuCurrentTopPage } = this.props;
    let parentPageId = parentPage ? parentPage.id || -2 : -2;
    let leftMenuCurrentTopPageParent = leftMenuCurrentTopPage ? leftMenuCurrentTopPage.parent || -1 : -1;
    let leftMenuCurrentTopPageId = leftMenuCurrentTopPage ? leftMenuCurrentTopPage.id || -1 : -1;

    if (leftMenuCurrentTopPageParent == parentPageId) {
        return (
            this.getChildMenuPages(leftMenuCurrentTopPageId)
        )
    } else {
        return null;
    }
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

export default withStyles(styles)(LeftSideBar);