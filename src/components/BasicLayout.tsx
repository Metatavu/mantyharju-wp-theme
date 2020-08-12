import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core";
import { MenuLocationData, Page } from "../generated/client/src";
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
  localeMenu?: MenuLocationData,
  scrollPosition: number,
  pages: Page[],
  parentPage?: number
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
      pages: [],
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

    const [localeMenu, pages, parentPage] = await Promise.all(
      [
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2Pages({ per_page: 50 }),
        api.getWpV2Pages({ slug: [ "sivut" ] }),
      ]
    );

    const parentPageId = (parentPage.length > 0 ? parentPage[0].id || -1 : -1);

    this.setState({
      loading: false,
      localeMenu: localeMenu,
      pages: pages,
      parentPage: parentPageId
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
        localeMenu={ this.state.localeMenu }
        pages={ this.state.pages }
        parentPage={ this.state.parentPage }
        >
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