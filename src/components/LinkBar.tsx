import * as React from "react";
import { WithStyles, withStyles, Hidden, Typography, Link, Container } from "@material-ui/core";
import styles from "../styles/link-bar";
import SwipeableViews from "react-swipeable-views";
import ArrowIcon from "@material-ui/icons/ArrowForwardSharp";
import { MenuLocationData, MenuItemData } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";

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
  menu?: MenuLocationData
  loading: boolean,
  linkBallIndex: number
}

/**
 * LinkBar component
 */
class LinkBar extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      linkBallIndex: 0
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    this.setState({
      loading: true
    });

    const api = ApiUtils.getApi();

    const menu = await api.getMenusV1LocationsById({ lang: this.props.lang, id: "quick" });

    this.setState({
      menu: menu,
      loading: false
    });
  }

  /**
   * Component render method
   */
  public render() {
    const menu = this.state.menu;
    const { classes } = this.props;

    if (!menu || !menu.items) {
      return null;
    }

    return (
      <div>
        <Hidden mdUp implementation="css">
          <SwipeableViews onChangeIndex={ (index) => { this.ChangeSwipeIndex(index) } } enableMouseEvents={ true } >
            {
              menu.items.map(this.renderLinkItem)
            }
          </SwipeableViews>
          {
            this.renderLinkBallIndicators()
          }
        </Hidden>
        <Hidden smDown implementation="css">
          <div className={ classes.linkContainer }>
            {
              menu.items.map(this.renderLinkItem)
            }
          </div>
        </Hidden>
      </div>
    );
  }

  /**
   * Render link item method
   */
  private renderLinkItem = (item: MenuItemData) => {
    const { classes } = this.props;
    return (
      <div key={ item.db_id } className={ classes.slide }>
        <Link className={ classes.link } href={ item.url }>
          <div className={ classes.slideContent }>
            <div className={ classes.slideText }>
              <Typography variant="h5">{ item.title }</Typography>
            </div>
            <ArrowIcon fontSize="large" />
          </div>
        </Link>
      </div>
    );
  }

  /**
   * Render Link ball indicators
   */
  private renderLinkBallIndicators = () => {
    if (this.state.menu && this.state.menu.items && this.state.menu.items.length > 0) {
      const { classes } = this.props;
      return (
        <Container className={ classes.linkBallIndicators }>
          {
            this.state.menu.items.map((item, index) => {
              return (index !== this.state.linkBallIndex)
              ?
                <div className={ `${classes.indicator} ${classes.circle}` } ><div className={ classes.ball }></div></div>
              :
                <div className={ `${classes.indicator} ${classes.circle}` } ><div className={ classes.fill }></div></div>
            })
          }
        </Container>
      );
    }
    return <></>;
  }

  /**
   * Change active indicator ball
   */
  private ChangeSwipeIndex = (index: number) => {
    this.setState({ linkBallIndex: index });
  }
}

export default withStyles(styles)(LinkBar);