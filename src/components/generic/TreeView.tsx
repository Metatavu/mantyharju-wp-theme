import * as React from "react";
import styles from "../../styles/tree-view";
import ApiUtils from "../../../src/utils/ApiUtils";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeMenu, {  TreeMenuItem } from "react-simple-tree-menu";
import { withStyles, WithStyles, ListItem, List, CircularProgress } from "@material-ui/core";
import theme from "../../styles/theme";
import * as classNames from "classnames";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  slug: string;
}

/**
 * Component state
 */
interface State {
  treeData: any[];
  initialOpenNodes?: string[];
}

/**
 * A component for displaying tree view link structure
 */
class TreeView extends React.Component<Props, State> {

  /**
   * Component constructor
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      treeData: []
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount() {
    this.loadTree();
  }

  /**
   * Component render
   */
  public render() {
    const { classes } = this.props;
    const { treeData, initialOpenNodes } = this.state;
    return (
      <div className={ classes.treeWrapper }>
        { initialOpenNodes !== undefined &&
          <TreeMenu data={ treeData } initialOpenNodes={ initialOpenNodes } hasSearch={ false }>
            {({ search, items }) => (
              <List disablePadding={ true } className={ classes.listRoot } >
                { items.map((item: any) => this.renderTreeMenuItem(item)) }
              </List>
            )}
          </TreeMenu>
        }
        { initialOpenNodes === undefined &&
          <CircularProgress />
        }
      </div>
    );
  }

  /**
   * Loads the link tree structure
   */
  private loadTree = async () => {
    const { slug } = this.props;
    const api = ApiUtils.getApi();
    const [ treeMenu ] = await Promise.all([
      api.getTreeMenu({ slug: slug })
    ]);
    this.setState({
      treeData: treeMenu.tree_data || [],
      initialOpenNodes: treeMenu.initial_open_nodes || []
    });
  }

  /**
   * Renders tree menu item
   *
   * @param item tree menu item
   */
  private renderTreeMenuItem = (item: TreeMenuItem) => {
    const { classes } = this.props;
    const toggleIcon = (on: boolean) => on ?
      <ExpandLessIcon htmlColor={ focused ? "#000" : theme.palette.primary.main } /> :
      <ExpandMoreIcon htmlColor={ focused ? "#000" : theme.palette.primary.main }  />;
    const { level, focused, hasNodes, toggleNode, isOpen, label, link, key, current } = item;
    return (
      <ListItem
        disableGutters={ true }
        selected={ current }
        className={ classNames(level === 0 ? classes.parentListItem : classes.listItem, isOpen ? "open" : "") }
        style={{ paddingLeft: level * 10 }}
        { ...item }
      >
        <a href={ link }>{ label }</a>
        <div className={ classes.iconWrapper } onClick={ this.onNodeClick(key, hasNodes, toggleNode) }>
          { hasNodes && toggleIcon(isOpen) }
        </div>
      </ListItem>
    );
  }

  /**
   * Handler for on node click event
   * @param hasNodes has nodes
   * @param toggleNode handler method for toggle node
   */
  private onNodeClick = (key: string, hasNodes: boolean, toggleNode: (() => void) | undefined) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hasNodes && toggleNode) {
      toggleNode();
    }
    event.stopPropagation();
  }
}

export default withStyles(styles)(TreeView);
