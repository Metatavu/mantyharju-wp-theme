import * as React from "react";
import { WithStyles, withStyles, Link, Container } from "@material-ui/core";
import bar from "../resources/img/headerimage.png";
import { MenuLocationData, MenuItemData } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/basic-layout";
import Footer from "./generic/Footer";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  lang: string,
  title?: string
}

/**
 * Interface representing component state
 */
interface State {
  loading: boolean
  mainMenu?: MenuLocationData
  localeMenu?: MenuLocationData
  scrollPosition: number
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
    };
  }

  /**
   * Component did mount life-cycle handler
   */
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

  /**
   * Component will unmount life-cycle handler
   */
  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Render header layout
   */
  public render() {
    const { classes } = this.props;
    
    return (
      <div>
        <div>
          {/* <img className={ classes.logoBar } src={ bar } /> */}
          <div className={ classes.searchSection }>
            <a href="/?lang=fi">
              <img className={ classes.logoBar } src={ bar } />
            </a>
            <div className={ classes.localeMenu }>
              { this.renderLocale() }
            </div>
            <div className={ classes.searchBar }>
              <input type="text" placeholder="Search.." />
              <button>Go</button>
            </div>
          </div>
          <div className={ classes.mainMenu }>
            { this.renderMenu() }
          </div>
        </div>
        { this.props.children }
        <Footer></Footer>
      </div> 
    );
  }

  /**
   * Render main menu method
   */
  private renderMenu = () => {
    const { mainMenu } = this.state;
    const { classes } = this.props;

    if (!mainMenu || !mainMenu.items) {
      return null;
    }

    return (
      <div className={ classes.nav }>
        {
          mainMenu.items.map(this.renderMenuItem)
        }
      </div>
    );
  }

  /**
   * Render locale menu method
   */
  private renderLocale = () => {
    const { localeMenu } = this.state;
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
   * Update scrolling position method
   */
  private handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      scrollPosition: currentScrollPos
    });
  }
}

export default withStyles(styles)(BasicLayout);