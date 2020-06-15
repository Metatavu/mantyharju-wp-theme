import * as React from "react";
import styles from "../styles/footer";
import { WithStyles, withStyles, Container, Typography, Button, Link} from "@material-ui/core";
import { Post, Attachment, MenuLocationData, MenuItemData, Page } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import { DomElement } from "domhandler";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import ArrowIcon from "@material-ui/icons/ArrowForwardSharp";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Fade from '@material-ui/core/Fade';
import theme from "../styles/theme";
import placeholderImg from "../resources/img/muisti-konsepti.png";
import strings from "../localization/strings";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  logo?: string
  lang: string
}

/**
 * Interface representing component state
 */
interface State {
  posts: Post[],
  sponsors: Page[],
  footerDatas: Post[],
  menu?: MenuLocationData,
  sponsorImages: string[],
  carouselImage1: string,
  carouselImage2: string,
  carouselFade1: boolean,
  carouselFade2: boolean,
  featuredMedias: { [ key: number ]: Attachment },
  loading: boolean
}

/**
 * Footer component
 */
class Footer extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      sponsors: [],
      footerDatas: [],
      sponsorImages: [],
      carouselImage1: "",
      carouselImage2: "",
      carouselFade1: true,
      carouselFade2: false,
      featuredMedias: { },
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

    const lang = this.props.lang;
    const api = ApiUtils.getApi();
    const postCategories = await api.getWpV2Categories({ slug: ["footer-posts"] });
    const sponsorsCategories = await api.getWpV2Categories({ slug: ["sponsorit"] });
    const sponsorsPage = await api.getWpV2Pages({ per_page: 1, categories: sponsorsCategories.map((category) => {
      return String(category.id);
    })});
    const contactsCategories = await api.getWpV2Categories({ slug: ["footer-contacts"] });
    const posts = await api.getWpV2Posts({ lang: [ lang ], per_page: 2, categories: postCategories.map((category) => {
      return String(category.id);
    })});
    const footerDatas = await api.getWpV2Posts({ per_page: 1, categories: contactsCategories.map((category) => {
      return String(category.id);
    })});
    const menu = await api.getMenusV1LocationsById({ lang: lang, id: "footer" });

    const featureMediaIds: number[] = footerDatas
      .filter((footerData) => {
        return footerData.featured_media;
      })
      .map((footerData) => {
        return footerData.featured_media;
      })
      .reduce((unique: any, item: any) => unique.includes(item) ? unique : [...unique, item], []);

    const featureMedias = await Promise.all(featureMediaIds.map((featureMediaId) => {
      return api.getWpV2MediaById({ id: featureMediaId.toString() });
    }));

    const featuredMediaMap: { [ key: number ]: Attachment } = { };

    for (let i = 0; i < featureMedias.length; i++) {
      const featureMedia = featureMedias[i];
      featuredMediaMap[featureMedia.id!] = featureMedia;
    }

    if (sponsorsPage.length > 0) {
      ReactHtmlParser(sponsorsPage[0].content ? sponsorsPage[0].content.rendered || "" : "", { transform: this.extractSponsorImages });
    }

    setInterval(() => { this.carouselLoop() }, 10000);

    this.setState({
      posts: posts,
      sponsors: sponsorsPage,
      footerDatas: footerDatas,
      menu: menu,
      featuredMedias: featuredMediaMap,
      loading: false
    });
  }

  /**
   * Component render method
   */
  public render() {
    const { classes } = this.props;
    if (!this.state.footerDatas.length) {
      return null;
    }
    const footerData = this.state.footerDatas[0];
    const featuredMedia = footerData.featured_media ? this.state.featuredMedias[footerData.featured_media] : null;
    const featuredMediaUrl = featuredMedia ? featuredMedia.source_url : null;
    return (
      <div className={ classes.root }>
        <div className={ classes.footerPosts }>
          {
            this.renderPosts()
          }
          { this.state.sponsors.length > 0 &&
            <Container  className={ classes.footerPost }>
              {this.renderSponsors()}
            </Container>
          }
        </div>
        <div className={ classes.footerBackground } style={{ backgroundImage: `url('${( featuredMediaUrl != null ? featuredMediaUrl : placeholderImg )}')` }}>
          <div className={ classes.contentContainer }>
            <Container maxWidth="xl" className={ classes.logoAndSomeContainer }>
              <div className={ classes.logo } >
                <img src={ this.props.logo } />
              </div>
              <div className={ classes.someLinkContainer }>
                <a className={ classes.someLink } href="https://twitter.com/muistimme"><TwitterIcon className={ classes.iconLink } /></a>
                {/* <a className={ classes.someLink } href="https://www.instagram.com/mikkelinseudunmuisti/"><InstagramIcon className={ classes.iconLink } /></a> */}
                <a className={ classes.someLink } href="https://www.facebook.com/muistimme//"><FacebookIcon className={ classes.iconLink } /></a>
                <a className={ classes.someLink } href="https://www.linkedin.com/company/muisti"><LinkedInIcon className={ classes.iconLink } /></a>
              </div>
            </Container>
            <Container className={ classes.contactsMenu } maxWidth="xl">
              <div>
                {
                  this.renderContacts()
                }
              </div>
              <div>
                {
                  this.renderMenu()
                }
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Get source element css classes
   */
  private getElementClasses = (node: DomElement): string[] => {
    const classString = node.attribs ? node.attribs.class : "";
    if (node.attribs && node.attribs.class) {
      return classString.split(" ");
    }

    return [];
  }

  /**
   * Get link href
   */
  private getLinkHref = (node: DomElement) => {
    return node.attribs && node.attribs.href ? node.attribs.href : "";
  }

  /**
   * Get element text content
   */
  private getElementTextContent = (node: DomElement) => {
    return node.children && node.children[0] ? node.children[0].data as string : "";
  }

  /**
   * Get element text content
   */
  private transformContent = (node: DomElement, index: number) => {
    const { classes } = this.props;
    const classNames = this.getElementClasses(node);
    if (classNames.indexOf("wp-block-button") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return (
          <a style={{ textDecoration: "none" }} href={this.getLinkHref(childNode)}>
            <Button
              className={ classes.button }
              style={{ marginTop: theme.spacing(5) }}
              color="primary"
              variant="outlined"
              endIcon={ <ArrowIcon /> }
            >
              {
                this.getElementTextContent(childNode)
              }
            </Button>
          </a>
        );
      }
    }
    return convertNodeToElement(node, index, this.transformContent);
  }

  /**
   * Get element text content
   */
  private extractSponsorImages = (node: DomElement, index: number) => {
    const classNames = this.getElementClasses(node);
    if (classNames.indexOf("sponsori-item") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode && childNode.children && childNode.children.length && childNode.children[0].attribs) {
        if (!(this.state.sponsorImages.indexOf(childNode.children[0].attribs.src) > -1)) {
          this.setState({ sponsorImages: [...this.state.sponsorImages, childNode.children[0].attribs.src] });
        }
        if (this.state.carouselImage1 === "") {
          this.setState({ carouselImage1: childNode.children[0].attribs.src});
        } else if (this.state.carouselImage2 === "") {
          this.setState({ carouselImage2: childNode.children[0].attribs.src});
        }
      }
    }
    return null;
  }

  /**
   * Render footer posts method
   */
  private renderPosts = () => {
    const { classes } = this.props;
    if (!this.state.posts.length) {
      return null;
    } else {
      return (
        this.state.posts.map((post) => {
          return (
            <Container key={ post.id } className={ classes.footerPost }>
              <Typography color="primary" variant="h3"> { post.title ? post.title.rendered : "" } </Typography>
              <div>
                {
                  ReactHtmlParser(post.content ? post.content.rendered || "" : "", { transform: this.transformContent })
                }
              </div>
            </Container>
          );
        })
      );
    }
  }

  /**
   * Render footer sponsors method
   */
  private renderSponsors = () => {
    const { classes } = this.props;
    if (!this.state.sponsors.length) {
      return null;
    }
    return (
      <a style={{ textDecoration: "none" }} href={(this.state.sponsors.length > 0 && this.state.sponsors[0].link) ? this.state.sponsors[0].link : "/"}>
        <Typography color="textSecondary" variant="h3"> { strings.sponsors } </Typography>
        <div className={ classes.carouselWrapper }>
          <div className={ classes.carouselItem }>
            <Fade in={ this.state.carouselFade1 } timeout={ { enter: 2000, exit: 2000 } }>
              <img className={ classes.carouselImg } src={ this.state.carouselImage1 } />
            </Fade>
          </div>
          <div className={ classes.carouselItem }>
            <Fade in={ this.state.carouselFade2 } timeout={ { enter: 2000, exit: 2000 } }>
              <img className={ classes.carouselImg } src={ this.state.carouselImage2 } />
            </Fade>
          </div>
        </div>
      </a>
    );
  }

  /**
   * Render footer contact information method
   */
  private renderContacts = () => {
    const { classes } = this.props;
    if (!this.state.footerDatas.length) {
      return null;
    }
    const footerData = this.state.footerDatas[0];
    return (
      <div key={ footerData.id } className={ classes.footerdata }>
        {
          ReactHtmlParser(footerData.content ? footerData.content.rendered || "" : "", { transform: this.transformContent })
        }
      </div>
    );
  }

  /**
   * Render menu method
   */
  private renderMenu() {
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

  /**
   * Carousel image fading method
   */
  private carouselLoop = () => {
    if (this.state.sponsorImages.length > 1) {
      let image1 = "";
      let image2 = "";
      if (this.state.carouselImage1 === "" && this.state.carouselImage2 === "") {
        image1 = this.state.sponsorImages[0];
        image2 = this.state.sponsorImages[1];
      } else if (this.state.carouselFade1) {
        let index = this.state.sponsorImages.indexOf(this.state.carouselImage1) + 1;
        if (index > this.state.sponsorImages.length - 1) {
          index = 0;
        }
        image1 = this.state.carouselImage1;
        image2 = this.state.sponsorImages[index];
      } else {
        let index = this.state.sponsorImages.indexOf(this.state.carouselImage2) + 1;
        if (index > this.state.sponsorImages.length - 1) {
          index = 0;
        }
        image1 = this.state.sponsorImages[index];
        image2 = this.state.carouselImage2;
      }
      this.setState({
        carouselImage1: image1,
        carouselImage2: image2,
        carouselFade1: !this.state.carouselFade1,
        carouselFade2: !this.state.carouselFade2
      })
    }
  }
}

export default withStyles(styles)(Footer);