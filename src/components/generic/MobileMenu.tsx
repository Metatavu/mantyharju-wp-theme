import * as React from "react";
import { Divider, Link, WithStyles, withStyles, Fade, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ApiUtils from "../../utils/ApiUtils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/CloseSharp";
import styles from "../../styles/mobile-menu";
import theme from "../../styles/theme";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  visible: boolean;
  slug: string;
  searchBar: JSX.Element;
  topMenu: JSX.Element | null;
  onClose(): void;
}

/**
 * Interface representing component state
 */
interface State {
  menu?: Menu[];
  loading: boolean;
}

interface Menu {
  key: string;
  menu_order: number;
  label: string;
  link: string;
  current: boolean;
  post_status: string;
  nodes: Menu[];
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
    const { slug } = this.props;

    this.setState({
      loading: true
    });

    const api = ApiUtils.getApi();

    const menu = await api.getTreeMenu({ slug: "sivut" });

    this.setState({
      menu: menu.tree_data as Menu[],
      loading: false
    });
  }

  /**
   * Component render method
   */
  public render() {
    const { classes, searchBar, topMenu } = this.props;
    const { menu } = this.state;
    if (!menu) {
      return null;
    }

    /**
     * Split into two item arrays to render the menu correctly
     *
     * menu items with and without children
     */
    const itemsWithChildren: Menu[] = [];
    const itemsWithoutChildren: Menu[] = [];

    menu.forEach((item) => {
      if (item.nodes && item.nodes.length > 0) {
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
              color="primary"
              onClick={ () => this.props.onClose() }
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
          <div className={ classes.searchBar }>
            { searchBar }
          </div>
          <div className={ classes.menuContent }>
            {
              itemsWithChildren.map(item => this.renderMenuItem(item))
            }
            {
              this.renderMenuItemsGroupWithoutChildren(itemsWithoutChildren)
            }
          </div>
          <Divider style={{ marginBottom: theme.spacing(2) }}/>
          { topMenu }
        </div>
      </Fade>
    );
  }

  /**
   * Menu group without submenu items render method
   *
   * @param items menu array
   */
  private renderMenuItemsGroupWithoutChildren = (items: Menu[]) => {
    const { classes } = this.props;
    return (
      <div className={ classes.menuGroup }>
        {
          items.map(item =>
            <Link
              className={ classes.link }
              variant="h5"
              key={ item.key }
              href={ item.link }
            >
              { item.label }
            </Link>
          )
        }
      </div>
    );
  }

  /**
   * Menu item render method
   *
   * @param item menu
   */
  private renderMenuItem = (item: Menu) => {
    const { classes } = this.props;
    if (!item || item.post_status !== "publish") {
      return null;
    }

    return (
      <div className={ classes.menuGroup } key={ item.key }>
        <Accordion elevation={ 0 }>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
          >
            <Link
              className={ classes.link }
              href={ item.link }
              variant="h5"
            >
              { item.label }
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            {
              (item.nodes || []).map((node: Menu) => this.renderMenuSubItem(node))
            }
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  /**
   * Menu sub item render method
   *
   * @param item menu
   */
  private renderMenuSubItem = (item?: Menu) => {
    if (!item || item.post_status !== "publish") {
      return null;
    }
    const { classes } = this.props;
    return (
      <>
        <Link
          className={ classes.subLink }
          key={ item.key }
          href={ item.link }
          variant="subtitle2"
        >
          { item.label }
        </Link>
        { this.renderMenuSubItemSubItems(item.nodes) }
      </>
    );
  }

  /**
   * Menu sub item sub items render method
   *
   * @param items menu array
   */
  private renderMenuSubItemSubItems = (items?: Menu[]) => {
    const { classes } = this.props;

    if (!items || (items && items.length === 0)) {
      return;
    }

    return items.map((item: Menu) => {
      if (item.post_status === "publish") {
        return (
          <Link
            className={ classes.subLinkOfSubLink }
            key={ item.key }
            href={ item.link }
            variant="subtitle2"
          >
            { item.label }
          </Link>
        );
      } else {
        return null;
      }
    });
  }
}

export default withStyles(styles)(MobileMenu);
