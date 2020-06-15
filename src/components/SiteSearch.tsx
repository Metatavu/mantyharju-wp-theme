import * as React from "react";
import { WithStyles, withStyles, Container, Fade, TextField, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseSharp";
import classNames from "classnames";
import styles from "../styles/dialogue-styles";
import theme from "../styles/theme";
import strings from "../localization/strings";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  tinyHeader: boolean
  visible: boolean
  lang: string
  onClose(): void
}

/**
 * Interface representing component state
 */
interface State {
  loading: boolean
}

/**
 * SiteSearch component
 */
class SiteSearch extends React.Component<Props, State> {

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

    this.setState({
      loading: false
    });
  }

  /**
   * Component render method
   */
  public render() {
    const { classes } = this.props;

    let siteMenuRootClasses = classNames( classes.root );

    if (this.props.tinyHeader) {
      siteMenuRootClasses = classNames( classes.root, classes.tinyHeader );
    }

    // TODO: Do the search
    return (
      <Fade in={ this.props.visible }>
        <Container maxWidth={false} className={ siteMenuRootClasses }>
          <Container maxWidth="xl" className={ classes.controlContainer }>
            <IconButton
              className={ classes.close }
              color="primary"
              onClick={ () => this.props.onClose() }
            >
              <CloseIcon className={ classes.closeIcon } fontSize="large" />
            </IconButton>
          </Container>
          <Container maxWidth="sm" className={ classes.searchContainer }>
            <TextField inputProps={{ style: { color: theme.palette.primary.main } }} fullWidth={ true } label={ strings.searchSite }></TextField>
          </Container>
        </Container>
      </Fade>
    );
  }
}

export default withStyles(styles)(SiteSearch);