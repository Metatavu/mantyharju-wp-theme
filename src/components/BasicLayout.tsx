import * as React from "react";
import { WithStyles, withStyles, Link, Container } from "@material-ui/core";
import bar from "../resources/img/headerimage.png";
import { MenuLocationData, MenuItemData, Category } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/basic-layout";
import Header from "./generic/Header";
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
  loading: boolean,
  mainMenu?: MenuLocationData,
  localeMenu?: MenuLocationData,
  scrollPosition: number,
  categories: Category[],
  topMenuCategoryId?: number
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
      categories: [],
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

    const [mainMenu, localeMenu, categories, topMenuCategory] = await Promise.all(
      [
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2Categories({ per_page: 30 }),
        api.getWpV2Categories({ slug: [ "top-menu" ] })
      ]
    );

    const topMenuCategoryId = (topMenuCategory.length > 0 ? topMenuCategory[0].id || -1 : -1);

    this.setState({
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
      categories: categories,
      topMenuCategoryId: topMenuCategoryId
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
        <Header
        mainMenu={ this.state.mainMenu }
        localeMenu={ this.state.localeMenu }
        categories={ this.state.categories }
        topMenuCategoryId={ this.state.topMenuCategoryId }>
        </Header>
        { this.props.children }
        <Footer></Footer>
      </div> 
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