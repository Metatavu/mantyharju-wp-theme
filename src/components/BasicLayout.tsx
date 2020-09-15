import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core";
import { MenuLocationData, Page, CustomPage } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/basic-layout";
import Header from "./generic/Header";
import Footer from "./generic/Footer";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  slug: string;
  lang: string;
  title?: string;
}

/**
 * Interface representing component state
 */
interface State {
  topMenu?: MenuLocationData,
  localeMenu?: MenuLocationData,
  pages: CustomPage[],
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
      pages: [],
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {

    const api = ApiUtils.getApi();
    const [localeMenu, topMenu, allPages, parentPage] = await Promise.all(
      [
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "topmenu" }),
        api.getCustomPages({ parent_slug: "sivut" }),
        api.getWpV2Pages({ slug: [ "sivut" ] })
      ]
    );

    const parentPageId = (parentPage.length > 0 ? parentPage[0].id || -1 : -1);

    this.setState({
      topMenu: topMenu,
      localeMenu: localeMenu,
      pages: allPages,
      parentPage: parentPageId
    });
  }

  /**
   * Render header layout
   */
  public render() {
    const { classes } = this.props;

    return (
      <div className={ classes.root }>
        <Header
          slug={ this.props.slug }
          lang={ this.props.lang }
          topMenu={ this.state.topMenu }
          localeMenu={ this.state.localeMenu }
          pages={ this.state.pages }
          parentPage={ this.state.parentPage }
        >
        </Header>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(BasicLayout);