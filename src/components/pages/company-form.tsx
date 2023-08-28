import * as React from "react";
import BasicLayout from "../BasicLayout";
import { WithStyles, withStyles, Button, Breadcrumbs, Link, Grid, FormControl, Select, MenuItem, Input, InputLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import styles from "../../styles/page-content";
import { Page, Post, PostTitle, CustomPage, CompanyCategory } from "../../../src/generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";
import strings from "../../localization/strings";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import TreeView from "../generic/TreeView";
import RightSideBar from "../generic/RightSideBar";
import hero from "../../resources/img/postHeader.jpg";
import ReadSpeaker from "../generic/ReadSpeaker";
import Movies from "../movies/movies";
import Premiers from "../movies/premiers";
import { Add } from "@material-ui/icons";
import ApiUtils from "../../utils/ApiUtils";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  slug: string
  lang: string
  mainPageSlug: string
  locationPath: string
}

/**
 * Interface representing component state
 */
interface State {
  currentPage?: Page;
  post?: Post;
  title: string;
  loading: boolean;
  isArticle: boolean;
  pageTitle?: PostTitle;
  breadcrumb: Breadcrumb[];
  mainContent?: React.ReactElement;
  sideContent?: React.ReactElement;
  pages: CustomPage[];
  postThumbnail: string;
  postThumbnailLoading: boolean;
  isMoviePage?: boolean;
  categories: CompanyCategory[];
  companyName: string;
  companyCategory: string;
  companyInformation: string;
  companyContactPersonName: string;
  companyContactPersonEmail: string;
  companyAddress: string;
  companyPostalCode: string;
  companyCity: string;
  companyPhoneNumbers: string;
  companyEmail: string;
  companyWebsite: string;
  updatedInfo: boolean;
}


/**
 * Interface for breadcrumb items
 */
interface Breadcrumb {
  label?: string;
  link?: string;
}

/**
 * PostPage component
 */
class CompanyForm extends React.Component<Props, State> {

  private contentParsed: boolean;

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      isArticle: false,
      loading: false,
      breadcrumb: [],
      title: "",
      pages: [],
      postThumbnail: "",
      postThumbnailLoading: false,
      categories: [],
      companyName: "",
      companyCategory: "",
      companyInformation: "",
      companyContactPersonName: "",
      companyContactPersonEmail: "",
      companyAddress: "",
      companyPostalCode: "",
      companyCity: "",
      companyPhoneNumbers: "",
      companyEmail: "",
      companyWebsite: "",
      updatedInfo: false
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ loading: true });
    const foundCategories = await ApiUtils.getApi().getWPV2CompanyCategories();
    this.hidePageLoader();
    this.setState({ loading: false, categories: foundCategories });
  }

/**
 * Save a company
 */
private submitCompany = async () => {
  const {
    companyName,
    companyInformation,
    companyCategory,
    companyContactPersonName,
    companyContactPersonEmail,
    companyAddress,
    companyPostalCode,
    companyCity,
    companyPhoneNumbers,
    companyEmail,
    companyWebsite,
    updatedInfo
  } = this.state;

  if (!companyName || !companyInformation || !companyCategory || !companyPhoneNumbers || !companyPostalCode || !companyAddress || !companyCity) {
    return;
  }

  this.setState({ loading: true });

  await ApiUtils.getApi().postWpV2Company({
    company: {
      company_category: Number.parseInt(companyCategory),
      company_information: companyInformation,
      company_name: !updatedInfo ? companyName : companyName + " - uudet tiedot",
      company_contact_person_name: companyContactPersonName,
      company_contact_person_email: companyContactPersonEmail,
      company_address: companyAddress,
      company_postal_code: companyPostalCode,
      company_city: companyCity,
      company_phone_numbers: companyPhoneNumbers,
      company_email: companyEmail,
      company_website: companyWebsite
    }
  });

  this.setState({
    loading: false,
    companyName: "",
    companyCategory: "",
    companyInformation: "",
    companyContactPersonName: "",
    companyContactPersonEmail: "",
    companyAddress: "",
    companyPostalCode: "",
    companyCity: "",
    companyPhoneNumbers: "",
    companyEmail: "",
    companyWebsite: ""
  });
}


  /**
   * Component render method
   */
  public render() {
    const { classes, lang, slug, locationPath } = this.props;
    const { sideContent, currentPage, postThumbnail, postThumbnailLoading } = this.state;
    const checkContent = React.Children.map(sideContent, child => child ? child.props.children.length : 0);
    const isContent = (checkContent ? (checkContent[0] === 0 ? false : true) : false);
    const heroDivStyle = postThumbnailLoading ? { background: "#eee"  } : { backgroundImage: `url(${ postThumbnail ? postThumbnail : hero })` };
    return (
      <BasicLayout
        lang={ lang }
        slug={ slug }
        title={ this.setTitleSource() }
      >
        <div className={ classes.heroImageDiv } style={ heroDivStyle }>
          <h1 className={ classes.heroText }>
            { currentPage ? ReactHtmlParser(currentPage.title ? currentPage.title.rendered || "" : "") : "..." }
          </h1>
        </div>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
              <Grid container spacing={ 0 }>
                <Grid item xs={ 12 } md={ 8 } key={ "123" }>
                  <Breadcrumbs separator=">">
                    { this.state.breadcrumb && this.renderBreadcrumb() }
                  </Breadcrumbs>
                </Grid>
                <Grid item xs={ 12 } md={ 4 } key={ "456" }>
                  <ReadSpeaker />
                </Grid>
              </Grid>
            </div>
            <div id="readthis" className={ classes.columns }>
              <Grid container spacing={ 0 }>
                <Grid item xs={ 12 } md={ 3 } lg={ 2 } key={ "123" }>
                  <div className="rs_skip">
                    <TreeView slug={ slug }/>
                  </div>
                </Grid>
                <Grid item xs={ 12 } md={ 6 } lg={ 7 } key={ "456" }>
                <div className={ classes.contentarea }>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={this.state.updatedInfo.toString()}
                      onChange={event => this.setState({ updatedInfo: event.target.value === "true" })}
                      defaultValue={"false"}
                    >
                      <FormControlLabel
                        value={"false"}
                        control={<Radio color="primary"/>}
                        label="Uusi yritys"
                      />
                      <FormControlLabel
                        value={"true"}
                        control={<Radio color="primary"/>}
                        label="Muuttuneet tiedot"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyName}</InputLabel>
                    <Input
                      value={this.state.companyName}
                      onChange={event => this.setState({ companyName: event.target.value })}
                    />
                  </FormControl>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyCategory}</InputLabel>
                    <Select
                      name="selectedCategory"
                      value={this.state.companyCategory}
                      onChange={event => this.setState({ companyCategory: event.target.value as string })}
                    >
                      {this.state.categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyContactPersonName}</InputLabel>
                    <Input
                      value={this.state.companyContactPersonName}
                      onChange={event => this.setState({ companyContactPersonName: event.target.value })}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyContactPersonEmail}</InputLabel>
                    <Input
                      value={this.state.companyContactPersonEmail}
                      onChange={event => this.setState({ companyContactPersonEmail: event.target.value })}
                    />
                  </FormControl>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyAddress}</InputLabel>
                    <Input
                      value={this.state.companyAddress}
                      onChange={event => this.setState({ companyAddress: event.target.value })}
                    />
                  </FormControl>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyPostalCode}</InputLabel>
                    <Input
                      value={this.state.companyPostalCode}
                      onChange={event => this.setState({ companyPostalCode: event.target.value })}
                    />
                  </FormControl>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyCity}</InputLabel>
                    <Input
                      value={this.state.companyCity}
                      onChange={event => this.setState({ companyCity: event.target.value })}
                    />
                  </FormControl>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyPhoneNumbers}</InputLabel>
                    <Input
                      value={this.state.companyPhoneNumbers}
                      onChange={event => this.setState({ companyPhoneNumbers: event.target.value })}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyEmail}</InputLabel>
                    <Input
                      value={this.state.companyEmail}
                      onChange={event => this.setState({ companyEmail: event.target.value })}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyWebsite}</InputLabel>
                    <Input
                      value={this.state.companyWebsite}
                      onChange={event => this.setState({ companyWebsite: event.target.value })}
                    />
                  </FormControl>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel>{strings.companies.companyInformation}</InputLabel>
                    <Input
                      rows={5}
                      value={this.state.companyInformation}
                      onChange={event => this.setState({ companyInformation: event.target.value })}
                      multiline
                    />
                  </FormControl>
                  <Button onClick={ this.submitCompany } type="submit" variant="contained" color="primary">
                    {strings.companies.companySubmit}
                  </Button>
                </div>
                </Grid>
                <Grid item xs={ 12 } md={ 3 } lg={ 3 } key={ "789" }>
                  { sideContent &&
                  <div
                    className={ classes.sidebar }
                    style={ isContent ? { display: "block" } : { display: "none" } }
                  >
                    <RightSideBar content={ sideContent } />
                  </div>
                  }
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </BasicLayout>
    );
  }


  /**
   * Renders breadcrumb
   */
  private renderBreadcrumb = () => {
    const { breadcrumb } = this.state;
    return breadcrumb.map((crumb) => {
      return (
        <Link color="inherit" href={ crumb.link } onClick={() => {}}>
          { ReactHtmlParser(crumb.label ? crumb.label || "" : "") }
        </Link>
      );
    });
  }
  /**
   * Recursively builds breadcrumb
   * 
   * @param children child pages array
   * @param pages all pages array
   * @param path collected breadcumbs
   */
  private buildPath = (children: CustomPage[], pages: CustomPage[], path?: Breadcrumb[]) => {
    const { currentPage } = this.state;
    children.forEach(childPage => {
      const childPages = pages.filter(item => item.post_parent === childPage.ID);
      if (currentPage && (currentPage.id === childPage.ID) && childPage.post_title) {
        this.setState({
          title: childPage.post_title || "",
          breadcrumb: path ? [...path, { label: childPage.post_title || "", link: childPage.link || "" }] : [{ label: childPage.post_title || "", link: childPage.link || "" }]
        });
      } else if (childPages && childPage.post_title) {
        this.buildPath(childPages, pages, path ? [...path, { label: childPage.post_title || "", link: childPage.link || "" }] : [{ label: childPage.post_title || "", link: childPage.link || "" }]);
      }
    });
  }

  /**
   * get html element classes
   *
   * @param node DomElement
   */
  private getElementClasses = (node: DomElement): string[] => {
    const classString = node.attribs ? node.attribs.class : "";
    if (node.attribs && node.attribs.class) {
      return classString.split(" ");
    }

    return [];
  }

  /**
   * Get html link href
   */
  private getLinkHref = (node: DomElement) => {
    return node.attribs && node.attribs.href ? node.attribs.href : "";
  }

  /**
   * Get html text content
   */
  private getElementTextContent = (node: DomElement) => {
    return node.children && node.children[0] ? node.children[0].data as string : "";
  }

  /**
   * Set html source for page content
   */
  private setTitleSource = () => {
    const { pageTitle, loading } = this.state;
    const noContentError = `${ strings.whoops }`;
    const undefinedContentError = `${ strings.error }`;

    if (pageTitle) {
      return pageTitle.rendered || undefinedContentError;
    } else if (!loading) {
      return noContentError;
    } else {
      return "";
    }
  }

  /**
   * Hide page loader
   */
  private hidePageLoader() {
    const loaderElement = document.getElementById("pageLoader");
    if (loaderElement) {
      loaderElement.style.opacity = "0";
      setTimeout(() => {
        loaderElement.style.display = "none";
      }, 500);
    }
  }

  /**
   * transform without changes
   *
   * @param node DomElement
   * @param index DomElement index
   */
  private transform = (node: DomElement, index: number) => {
    const content = this.getElementTextContent(node);

    if (content && content.indexOf("[movies]") > -1) {
      this.setState({ isMoviePage: true });
      return <Movies/>;
    }

    if (content && content.indexOf("[premiers]") > -1) {
      this.setState({ isMoviePage: true });
      return <Premiers/>;
    }

    return convertNodeToElement(node, index, this.transform);
  }

  /**
   * transform html source content before it is rendered
   *
   * @param node DomElement
   * @param index DomElement index
   */
  private transformContent = (node: DomElement, index: number) => {
    const { classes } = this.props;
    const classNames = this.getElementClasses(node);

    if (classNames.indexOf("wp-block-columns") > -1 && node.children && node.children.length > 3 && !this.contentParsed) {
      this.contentParsed = true;
      const mainContent = convertNodeToElement(node.children[1], index, this.transform);
      const sideContent = convertNodeToElement(node.children[3], index, this.transform);
      this.setState({
        mainContent: mainContent,
        sideContent: sideContent
      });
    }

    // Find any add new event buttons and make them trigger add event dialog
    // TODO: move add event dialog into separate component from WelcomePage.tsx that can be launched from anywhere
    if (classNames.indexOf("new-event-button") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return (
          <Button
            onClick={ this.addEvent }
            className={ classes.button }
            color="primary"
            variant="outlined"
            startIcon={ <Add /> }
          >
            { this.getElementTextContent(childNode) }
          </Button>
        );
      }  // Find any buttons and replace them with Material UI button
    }  else if (classNames.indexOf("wp-block-button") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return (
          <a href={ this.getLinkHref(childNode) } style={{ textDecoration: "none" }}>
            <Button className={ classes.button } color="primary" variant="outlined" endIcon={ <ArrowIcon /> }>
              { this.getElementTextContent(childNode) }
            </Button>
          </a>
        );
      }
    }

    return convertNodeToElement(node, index, this.transformContent);
  }

  /**
   * Open add event dialog method
   * TODO: open add event dialog when it has been separated from the WelcomePage.tsx
   */
  private addEvent = () => {
    alert("Open add event dialog!")
  }
}
export default withStyles(styles)(CompanyForm);