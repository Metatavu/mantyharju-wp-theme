import * as React from "react";
import { Link, WithStyles, withStyles, Fade, IconButton } from "@material-ui/core";
import { MenuLocationData, MenuItemData } from "../../generated/client/src";
import ApiUtils from "../../utils/ApiUtils";
import CloseIcon from "@material-ui/icons/CloseSharp";
import styles from "../../styles/mobile-menu";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  visible: boolean
  lang: string
  onClose(): void
}

/**
 * Interface representing component state
 */
interface State {
  menu?: MenuLocationData
  loading: boolean
}

/**
 * Mobile menu component
 */
class MobileMenu extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
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

    const menu = await api.getMenusV1LocationsById({ lang: this.props.lang, id: "topmenu" });

    this.setState({
      menu: menu,
      loading: false
    });
  }

  /**
   * Component render method
   */
  public render() {
    const { classes } = this.props;
    if (!this.state.menu || !this.state.menu.items) {
      return null;
    }

    /**
     * Split into two item arrays to render the menu correctly
     *
     * menu items with and without children
     */
    const itemsWithChildren: MenuItemData[] = [];
    const itemsWithoutChildren: MenuItemData[] = [];

    this.state.menu.items.forEach((item) => {
      if (item.child_items && item.child_items.length > 0) {
        itemsWithChildren.push(item);
      } else {
        itemsWithoutChildren.push(item);
      }
    });

    return (
      <Fade in={ this.props.visible }>
        <div className={ classes.root }>
          <div className={ classes.controlContainer }>
            <IconButton
              className={ classes.close }
              color="primary"
              onClick={ () => this.props.onClose() }
            >
              <CloseIcon className={ classes.closeIcon } fontSize="large" />
            </IconButton>
          </div>
          <div className={ classes.menuContent }>
            {
              itemsWithChildren.map((item) => {
                return this.renderMenuItem(item);
              })
            }
            {
              this.renderMenuItemsGroupWithoutChildren(itemsWithoutChildren)
            }
          </div>
        </div>
      </Fade>
    );
  }

  /**
   * Menu group without submenu items render method
   */
  private renderMenuItemsGroupWithoutChildren = (items: MenuItemData[]) => {
    const { classes } = this.props;
    return (
      <div className={ classes.menuGroup }>
        {items.map((item) =>
          <Link
            className={ classes.link }
            variant="h5"
            key={item.db_id}
            href={ item.url }
          >
            {
              item.title
            }
          </Link>)}
      </div>
    );
  }

  /**
   * Menu item render method
   */
  private renderMenuItem = (item: MenuItemData) => {
    const { classes } = this.props;
    if (!item) {
      return null;
    }

    return (
      <div className={ classes.menuGroup } key={ item.db_id }>
        <Link
          className={ classes.link }
          href={ item.url }
          variant="h5"
        >
          {
            item.title
          }
        </Link>
        {
          (item.child_items || [] ).map((childItems) => {
            return this.renderMenuSubItem(childItems);
          })
        }
      </div>
    );
  }

  /**
   * Menu sub item render method
   */
  private renderMenuSubItem = (item?: MenuItemData) => {
    if (!item) {
      return null;
    }
    const { classes } = this.props;
    return (
      <Link
        className={ classes.subLink }
        key={ item.db_id }
        href={ item.url }
        variant="subtitle2"
      >
        {
          item.title
        }
      </Link>
    );
  }
}

export default withStyles(styles)(MobileMenu);