import * as React from "react";
import socialIg from "../../resources/img/ig-logo.png";
import socialFb from "../../resources/img/fb-logo.png";
import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/footer-styles";
import logo from "../../resources/img/svg/mantyharju-logo-white.svg";

/**
 * Facebook-logo license: https://commons.wikimedia.org/wiki/File:Facebook_William_Aditya_Sarana.png
 */

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
}

/**
 * Component state
 */
interface State {
}

/**
 * A component for basic layout footer contents
 */
class Footer extends React.Component<Props, State> {

  /**
   * Constructor
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {};
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

    return (
      <footer className={ classes.root }>
        <div className={ classes.footerContent }>
          <div className={ classes.footerLogo}>
            <img alt="Mäntyharju-logo" className={ classes.logo } src={ logo }/>
          </div>

          <div className={ classes.footerAdressInfo}>
            <p className={ classes.footerContentItem }>Mäntyharjun kunta</p>
            <p className={ classes.footerContentItem }>Asematie 3, PL 76</p>
            <p className={ classes.footerContentItem }>52701, Mäntyharju</p>
          </div>

          <div className={ classes.footerContactInfo }>
            <a className={ classes.footerContentItem } href="tel:+358447707346">Puh: +358 (0)44 7707 346</a>
            <a className={ classes.footerContentItem } href="mailto:kirjaamo@mantyharju.fi">Email: kirjaamo@mantyharju.fi</a>
          </div>

          <div className = { classes.footerSocialInfo}>
            <a href = "https://fi-fi.facebook.com/mantyharjunkunta/" target = "_blank">
              <img alt = "Linkki Facebookiin" className={ classes.social } src={ socialFb } />
            </a>
            <a href = "https://www.instagram.com/mantyharjunkunta/" target = "_blank">
                <img alt = "Linkki Instagramiin" className={ classes.social } src={ socialIg } />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);