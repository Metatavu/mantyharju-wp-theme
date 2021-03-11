import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core";
import { MenuLocationData, CustomPage } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/basic-layout";
import Header from "./generic/Header";
import Footer from "./generic/Footer";
import CookieConsent from "react-cookie-consent";

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
    ApiUtils.cachedGetMenusV1LocationsById(api, this.props.lang, "locale")
      .then((localeMenu) => this.setState({ localeMenu }));
    
    ApiUtils.cachedGetMenusV1LocationsById(api, this.props.lang, "topmenu")
      .then((topMenu) => this.setState({topMenu}));

    ApiUtils.cachedGetCustomPages(api, "sivut")
      .then((pages) => this.setState({ pages }));

    ApiUtils.cachedGetWpV2Pages(api, "sivut")
      .then((parentPage) => {
        const parentPageId = (parentPage.length > 0 ? parentPage[0].id || -1 : -1);
        this.setState({ parentPage: parentPageId });
      })
  }

  /**
   * Render header layout
   */
  public render() {
    const { classes } = this.props;

    return (
      <div className={ classes.root }>
        <CookieConsent
        location="bottom"
        buttonText="Sulje"
        cookieName="GDPRcookie"
        style={{ background: "#1068B3" }}
        buttonStyle={{ background: "#fff",  color: "#000", fontSize: "16px" }}
        expires={150}
        >
          Käytämme sivustollamme evästeitä. Jatkamalla sivuston käyttöä, hyväksyt evästeiden tallentamisen laitteellesi. Lisätietoja evästeiden käytöstä löydät <a href="/sivut/asiointi-paatoksenteko/asiointi/evasteet" style={{color:"white"}}>täältä</a>
        </CookieConsent>
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