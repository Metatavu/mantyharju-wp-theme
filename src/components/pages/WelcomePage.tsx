import * as React from "react";
import BasicLayout from "../BasicLayout";
import ReactHtmlParser from "react-html-parser";
import ApiUtils from "../../utils/ApiUtils";
import { WithStyles, withStyles, Button, CircularProgress, Typography, SvgIcon, Icon, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import * as moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import { Post, MenuLocationData, CustomizeField, Page, CustomPost } from "../../generated/client/src";
import { jobsIconSvgPath, announcementIconSvgPath, currentNewsIconSvgPath } from "../../resources/icons/svgIcons";
import DatePicker, { registerLocale } from "react-datepicker";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import fi from "date-fns/esm/locale/fi";
import ImageUpload from "./image-upload";
import { MetaformComponent, IconName, FieldValue, Metaform } from "metaform-react";
import strings from "../../localization/strings";
import defaultimage from "../../resources/img/postHeader.png";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  lang: string;
  slug: string;
}

/**
 * Interface representing component state
 */
interface State {
  posts: CustomPost[],
  form: Metaform,
  placeForm: Metaform,
  requiredFieldsMissing: boolean,
  formValues: Dictionary<string | number | null>
  placeFormValues: Dictionary<string | number | null>
  linkedEventsPost?: Post,
  loading: boolean,
  popularPages: PageWithImgUrl[],
  mainMenu?: MenuLocationData,
  localeMenu?: MenuLocationData,
  scrollPosition: number,
  siteMenuVisible: boolean,
  siteSearchVisible: boolean,
  announcementsCategoryId: number,
  newsCategoryId: number,
  linkedEventsLimitingNumber: number,
  customizeFields: CustomizeField[],
  modalOpen: boolean,
  defaultImageUrl: string,
  showDefaultImages: boolean,
  addPlaceVisibility: boolean,
  imageUrl: string,
  newsPageLink?: string,
  news?: PostItem[],
  announcementsPageLink?: string,
  announcements?: PostItem[],
  jobsLink?: string,
  jobs?: PostItem[],
  fetchData: Place[]
  fethingData: boolean
}

interface Dictionary<T> {
  [Key: string]: T;
}

interface PostItem {
  title: string;
  link: string;
  content?: any;
  date?: moment.Moment;
}

interface Place {
  id: string;
  name: {
    fi: string;
    en: string;
    sv: string;
  }
}

interface PageWithImgUrl extends Page {
  featureImageUrl?: string;
}

const imageList = [
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage1.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage2.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage3.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage4.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage5.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage6.jpg"
];

/**
 * WelcomePage component
 */
class WelcomePage extends React.Component<Props, State> {

  public popularPagesSection: React.RefObject<HTMLDivElement>;

  /**
   * Constructor
   *
   * @param props component properties
   * Check announcementsCategoryId from wp post categories
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      form: {},
      placeForm: {},
      formValues: {},
      placeFormValues: {},
      loading: false,
      popularPages: [],
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false,
      requiredFieldsMissing: false,
      announcementsCategoryId: 4,
      newsCategoryId: 5,
      linkedEventsLimitingNumber: 4,
      customizeFields: [],
      modalOpen: false,
      defaultImageUrl: "",
      showDefaultImages: false,
      addPlaceVisibility: false,
      imageUrl: "",
      fetchData: [],
      fethingData: false
    };

    this.onPick = this.onPick.bind(this);

    this.popularPagesSection = React.createRef();
    registerLocale("fi", fi);
  }

  /**
   * Image picking method
   */
  public onPick(image: any) {
    this.setState({defaultImageUrl: image.src});
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {

    this.setState({
      loading: true
    });

    const api = ApiUtils.getApi();
    const customizeFields = await api.getWpV2Customize();

    this.setState({
      customizeFields: customizeFields,
      loading: false
    });

    const [posts, mainMenu, localeMenu, popularCategory] = await Promise.all(
      [
        api.getCustomPosts({}),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2Categories({ slug: ["suosittu"] })
      ]
    );

    const categoryIdArray = [(popularCategory.length > 0 ? popularCategory[0].id || -1 : -1)];

    const popularPages = await api.getWpV2Pages({ categories: categoryIdArray, per_page: 6});
    const placeForm: Metaform = require("../../metaform-json/create-place.json");
    const form: Metaform = require("../../metaform-json/create-event.json");
    const keywordRes = await fetch("https://mantyharju.linkedevents.fi/v1/keyword/?page_size=1000&data_source=mantyharju");
    const data = await keywordRes.json();

    const sections = (form.sections || []).map((section: any) => {
      if (section.name === "keywords") {
        section.fields = data.data.map((keyword: any) => {
          return {
            name: `keyword__${ keyword.id }`,
            type: "boolean",
            title: keyword.name && keyword.name.fi ? keyword.name.fi : keyword.id
          };
        });
      }
      return section;
    });

    form.sections = sections;

    this.setState({
      posts: posts,
      form: form,
      placeForm: placeForm,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
      popularPages: popularPages
    });

    this.hidePageLoader();

    this.getNews();
    this.getJobs();
    this.getAnnouncements();
    this.getLinkedEvents();
    this.getPopularPagesImageUrl();
  }

  /**
   * Component will unmount life-cycle handler
   */
  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Component render method
   */
  public render() {
    const { lang, slug, classes } = this.props;
    const { announcementsPageLink, newsPageLink, jobsLink, linkedEventsPost, news, announcements, jobs } = this.state;
    const showcaseImage = this.getCustomizerValue("showcase_image");
    const showcaseTitle = this.getCustomizerValue("showcase_title");
    const showcaseText = this.getCustomizerValue("showcase_text");
    const showcaseButtonLink = this.getCustomizerValue("showcase_button_link");
    const showcaseButtonText = this.getCustomizerValue("showcase_button_text");
    const heroImage = this.getCustomizerValue("hero_image");
    const heroLogoImage = this.getCustomizerValue("hero_logo_image");
    const heroTitle = this.getCustomizerValue("hero_title");
    const heroButtonLink = this.getCustomizerValue("hero_button_link");
    const heroButtonText = this.getCustomizerValue("hero_button_text");

    const heroBackgroundImage = {backgroundImage: `url(${ heroImage })`};
    const addEventImageStyle = {backgroundImage: `url(${ showcaseImage })`};

    return (
      <BasicLayout lang={ lang } slug={ slug }>
        <div className={ classes.heroImageDiv } style={ heroBackgroundImage }>
          <img className={ classes.heroLogo } src={ heroLogoImage } alt="Mäntyharju" />
          <h2 className={ classes.heroText }>{ heroTitle }</h2>
          <Button color="secondary" className= { classes.heroButton } href={ heroButtonLink }>{ heroButtonText }</Button>
          <Button
            className={ `${ classes.heroButtonPopularPages }`}
            onClick={ this.scrollDownToPopularPages }
            title={strings.popularPages}
            endIcon={ <AddIcon/> }
          >
            Suosituimmat sivut
          </Button>
        </div>
          <div className= { classes.addEventDiv }>
            <div className= { classes.addEventImageDiv } style={addEventImageStyle}>
            </div>
            <div className= { classes.addEventTextDiv }>
              <h3 className= { classes.addEventTextDivHeading }>{ showcaseTitle }</h3>
              <p className= { classes.addEventTextDivParagraph }>
                { showcaseText }
              </p>
              <Button color="secondary" onClick={ this.navigateTo(showcaseButtonLink || window.location.href) } className={ classes.addEventButton }>
                { showcaseButtonText }
              </Button>
            </div>
          </div>
        <div className={ classes.postsContainer }>
          <div className= { classes.postsColumn }>
            <div className={ classes.postsHeading }>
              <SvgIcon color="primary" fontSize="large">
                { currentNewsIconSvgPath }
              </SvgIcon>
              <Typography variant="h1">{strings.currentNews}</Typography>
            </div>
            { !news &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            { news &&
              <div>
                { this.renderPostItems(news) }
              </div>
            }
            <Button className={ classes.postColumnButton } onClick={ this.navigateTo(newsPageLink || window.location.href) }>katso kaikki</Button>
          </div>
          <div className= { classes.postsColumn }>
            <div className={ classes.postsHeading }>
              <SvgIcon color="primary" fontSize="large">
                { announcementIconSvgPath }
              </SvgIcon>
              <Typography variant="h1">{strings.announcements}</Typography>
            </div>
            { !announcements &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            { announcements &&
              <div className={ classes.allPosts }>
                { this.renderPostItems(announcements) }
              </div>
            }
            <Button className={ classes.postColumnButton } onClick={ this.navigateTo(announcementsPageLink || window.location.href) }>katso kaikki</Button>
          </div>
          <div className={ classes.postsColumn }>
            <div className={ classes.postsHeading }>
              <SvgIcon color="primary" fontSize="large">
                { jobsIconSvgPath }
              </SvgIcon>
              <Typography variant="h1">{strings.jobs}</Typography>
            </div>
            { !jobs &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            { jobs &&
              <div className={ classes.allPosts }>
                { this.renderPostItems(jobs) }
              </div>
            }
            <Button className={ classes.postColumnButton } onClick={ this.navigateTo(jobsLink || window.location.href) }>katso kaikki</Button>
          </div>
        </div>

        <div className = { classes.linkedEventsContainer }>
          <Typography variant="h1">{strings.events}</Typography>
          <div className={ classes.legendWrapper }>
            <div className={ classes.legend }>
              <div className={ classes.legendColor } style={{ backgroundColor: "#e43e3e" }} />
              <Typography variant="subtitle1">{strings.past}</Typography>
            </div>
            <div className={ classes.legend }>
              <div className={ classes.legendColor } style={{ backgroundColor: "#FFCF4E" }} />
              <Typography variant="subtitle1">{strings.ongoing}</Typography>
            </div>
            <div className={ classes.legend }>
              <div className={ classes.legendColor } style={{ backgroundColor: "#1068B3" }} />
              <Typography variant="subtitle1">{strings.coming}</Typography>
            </div>
          </div>
          { linkedEventsPost &&
            <div className={ classes.wrapper }>
              { this.renderLinkedEvents() }
            </div>
          }
          { !linkedEventsPost &&
            <div style={{ display: "flex" }}>
                <CircularProgress style={{ margin: "auto" }} />
            </div>
          }
          <div className={ classes.eventsButtonRow }>
            <Button
              className={ classes.allEventsButton }
              title= {strings.showMoreEvents}
              onClick={this.expandLinkedEvents}
            >
              {strings.showMore}
            </Button>
            <Button
              onClick={ this.openModal }
              className={ classes.addLinkedEventButton }
              title= {strings.addEvent}
            >
              {strings.addEvent}
            </Button>
          </div>
        </div>
        <div ref={ this.popularPagesSection } className={ classes.bottom_section }>
          {
            this.renderBottomSectionPosts()
          }
        </div>
        <Dialog
          fullScreen
          className={ classes.dialog }
          onClose={ this.closeModal }
          open={ this.state.modalOpen }
          scroll={ "paper" }
        >
          <DialogTitle>
            <Grid container alignItems="flex-start" justify="space-between" direction="row">
              <Typography variant="h1" className={ classes.heroText } style={{ margin: 0 }}>{strings.newEvent}</Typography>
              <Button onClick={ this.closeModal } style={{ color: "#fff", alignItems: "right" }}>{strings.close}</Button>
            </Grid>
          </DialogTitle>
          <DialogContent>
            {
              this.renderForm(this.state.form)
            }
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={ this.closeModal } variant="text" color="primary">
              {strings.cancel}
            </Button>
          </DialogActions>
        </Dialog>
      </BasicLayout>
    );
  }

  /**
   * Fetch PopularPages featured image URL
   */
  private getPopularPagesImageUrl = () => {
    const { popularPages } = this.state;
    const api = ApiUtils.getApi();
    const result : PageWithImgUrl[] = [];

    popularPages.forEach(async (page) => {
      const pageId = page.id ? page.id.toString() : "";
      const popularImageUrl = await api.getPostThumbnail({ id: pageId });
      const pageAndUrl = { ...page, featureImageUrl: popularImageUrl ? popularImageUrl : "" };

      return result.push(pageAndUrl);
    });

    this.setState({
      popularPages: result
    });

  }

  /**
   * Method for getting news
   */
  private getNews = () => {
    const api = ApiUtils.getApi();
    api.getWpV2Posts({ slug: [ "news" ], per_page: 1 }).then((postArray) => {
      const post = postArray.length ? postArray[0] : undefined;
      if (post) {
        const postContent = post.content ? post.content.rendered : undefined;
        if (postContent) {
          const news = this.parsePostItems(postContent);
          this.setState({
            newsPageLink: post.link,
            news: news
          });
        }
      }
    });
  }

  /**
   * Method for getting announcements
   */
  private getAnnouncements = () => {
    const api = ApiUtils.getApi();
    api.getWpV2Posts({ slug: [ "announcements" ], per_page: 1 }).then((postArray) => {
      const post = postArray.length ? postArray[0] : undefined;
      if (post) {
        const postContent = post.content ? post.content.rendered : undefined;
        if (postContent) {
          const announcements = this.parsePostItems(postContent);
          this.setState({
            announcementsPageLink: post.link,
            announcements: announcements
          });
        }
      }
    });
  }

  /**
   * Method for getting jobs
   */
  private getJobs = () => {
    const api = ApiUtils.getApi();
    api.getWpV2Posts({ slug: [ "jobs" ], per_page: 1 }).then((postArray) => {
      const post = postArray.length ? postArray[0] : undefined;
      if (post) {
        const postContent = post.content ? post.content.rendered : undefined;
        if (postContent) {
          const jobs = this.parseJobs(postContent);
          this.setState({
            jobsLink: post.link,
            jobs: jobs
          });
        }
      }
    });
  }

  /**
   * Method for getting linked events
   */
  private getLinkedEvents = () => {
    const api = ApiUtils.getApi();
    api.getWpV2Posts({ slug: [ "linked-events" ], per_page: 1 }).then((linkedEventsPostArray) => {
      const linkedEventsPost = linkedEventsPostArray.length ? linkedEventsPostArray[0] : undefined;
      this.setState({
        linkedEventsPost: linkedEventsPost
      });
    });
  }

  /**
   * Method for parsing post items
   *
   * @param postContent post content
   */
  private parsePostItems = (postContent: string): PostItem[] => {
    const listTags = postContent.match(/<li.*?>.*?<\/li>/g); // Matches all <li> tags and their children
    if (listTags) {
      const listChildren = listTags.map(tag => {
        const match = tag.match(/<a.*?>.*?<\/a>(<time.*?>.*?<\/time>)?(<div.*?>.*?<\/div>)?/g); // Matches all <a>, <time> and <div> tags along with their children
        if (match) {
          return match[0];
        }
        return "";
      });
      const postItems = listChildren.map((child) => {
        const title = child.replace(/^.*?<a.*?>|<\/a>.*$/g, ""); // Filters everything but <a> tag text
        const link = child.replace(/^.*?<a.*?href="|".*?>.*$/g, ""); // Filters everything but <a> tag href text
        const content = child.replace(/^.*?<div.*?>|<\/div.*$|<a.*?<\/a>|<time.*?>.*?<\/time>/g, ""); // Filters everything but <div> tag children
        const dateString = child.replace(/^.*?<time.*?datetime="|<a.*?<\/a>|<div.*?>.*?<\/div>|".*$/g, ""); // Filters everything but <time> tag datetime attribute value
        const postItem: PostItem = {
          title: title,
          link: link,
          content: content ? ReactHtmlParser(content) : undefined,
          date: dateString ? moment(dateString) : undefined
        };
        return postItem;
      });
      return postItems;
    }
    return [];
  }

  /**
   * Method for parsing jobs
   *
   * @param postContent post content
   * @returns post item array
   */
  parseJobs = (postContent: string): PostItem[] => {
    const articles = postContent.match(/<article.*?>.*?<\/article>/g); // Match <article> tags and their content
    if (articles) {
      const postItems = articles.map(article => {
        const title = article.replace(/^.*?<strong.*?>|<\/strong>.*$/g, ""); // Replace everything but <strong> tag content
        const link = article.replace(/^.*?<a.*?href="|".*$/g, ""); // Replace everything but <a> tag link
        const dateMatch = article.match(/\d?\d.\d?\d.\d\d\d\d(?!.*\d?\d.\d?\d.\d\d\d\d)/g); // Matches latest DD.MM.YYYY or D.M.YYYY formated date
        const date = dateMatch ? new Date(this.convertToISO(dateMatch[0])) : undefined;
        const postItem = {
          title: title,
          link: link,
          date: date ? moment(date) : undefined
        }
        return postItem;
      });
      return postItems;
    }
    return [];
  }

  /**
   * Sets modal state to open
   */
  private openModal = () => {
    this.setState({
      modalOpen: true
    });
  }

  /**
   * Sets modal state to closed
   */
  private closeModal = () => {
    this.setState({
      modalOpen: false
    });
  }

  /**
   * Method for getting customizer field value
   *
   * @param key field key
   * @returns string
   */
  private getCustomizerValue = (key: string) => {
    const { customizeFields } = this.state;
    const field = customizeFields.find((field) => field.key === key);
    const value = field ? field.value : "";
    return value;
  }

  /**
   * Render single form
   */
  private renderForm = (form: Metaform) => {
    const { classes } = this.props;
    const { requiredFieldsMissing } = this.state;
    return (
      <div className={ classes.metaformWrapper }>
        <MetaformComponent
          form={ form }
          formReadOnly={ false }
          onSubmit={ this.onSubmit }
          datePicker={ this.datePicker }
          uploadFile={ this.uploadFile }
          renderIcon={ this.renderIcon }
          getFieldValue={ this.getFieldValue }
          setFieldValue={ this.setFieldValue }
          datetimePicker={ this.datetimePicker }
          renderBeforeField={ this.renderBeforeField }
          setAutocompleteOptions={ this.setAutocompleteOptions }
          showRequiredFieldsMissingError={ requiredFieldsMissing }
          requiredFieldsMissingError={ strings.requiredFieldMissing }
        />
      </div>
    );
  }

  private renderBeforeField = (fieldName?: string) => {
    const { classes } = this.props;
    const imageTextLabel = strings.eventAdd.addImage;
    if (fieldName === "default-image-url") {
      return (
        <div>
          <input type="checkbox" onChange={this.showDefaultImages}/>
          <div  className={classes.reactAddLocationWrapper} style={this.state.showDefaultImages && !this.state.imageUrl ? {display:"block"} : {display:"none"}}>
            <ImagePicker
              images={imageList.map((image, i) => ({src: image, value: i}))}
              onPick={this.onPick}
            />
          </div>
          <div style={this.state.showDefaultImages && this.state.imageUrl ? {display: "block"} : {display: "none"}}>
            <Typography variant="body2">{strings.eventAdd.deleteOwnPicture}</Typography>
          </div>
          <div className={classes.imageUploadWrapper}>
            <ImageUpload userId="staging" onSave={ (url) => {this.setState({imageUrl: url})} } label={ imageTextLabel }  />
          </div>
        </div>
      )
    }
    if (fieldName === "add-location") {
      return (
        <div className={ classes.reactAddLocationWrapper }>
          <input type="button" value={this.state.addPlaceVisibility ? strings.eventAdd.closeAddingPlace : strings.eventAdd.addPlace} onClick={this.addPlaceVisibility}/>
          <div style={this.state.addPlaceVisibility ? { display:"block" } : { display:"none" }}>
            <div className={ classes.metaformWrapper }>
              <MetaformComponent
                form={ this.state.placeForm }
                formReadOnly={ false }
                getFieldValue={ this.getPlaceFieldValue }
                setFieldValue={ this.setPlaceFieldValue }
                datePicker={ this.datePicker }
                datetimePicker={ this.datetimePicker }
                uploadFile={ this.uploadFile }
                setAutocompleteOptions={ this.setAutocompleteOptions }
                renderIcon={ this.renderIcon }
                onSubmit={ this.onSubmit }
              />
            </div>
          </div>
        </div>
      );
    }
    return;
  }

  /**
   * Setting showDefaultImages to true or false
   *
   * @param null
   */
  private addPlaceVisibility = () => {
    this.setState({addPlaceVisibility: this.state.addPlaceVisibility ? false : true});
  }

  /**
   * Setting showDefaultImages to true or false
   *
   * @param null
   */
  private showDefaultImages = () => {
    this.setState({showDefaultImages: this.state.showDefaultImages ? false : true});
  }

  /**
   * Method for getting field value
   *
   * @param fieldName field name
   */
  private getFieldValue = (fieldName: string): FieldValue => {
    return this.state.formValues[fieldName];
  }

  /**
   * Method for getting field value
   *
   * @param fieldName field name
   */
  private getPlaceFieldValue = (fieldName: string): FieldValue => {
    return this.state.placeFormValues[fieldName];
  }

  /**
   * Method for setting field value
   *
   * @param fieldName field name
   * @param fieldValue field value
   */
  private setFieldValue = (fieldName: string, fieldValue: FieldValue) => {
    const { formValues } = this.state;
    formValues[fieldName] = fieldValue;
    this.setState({
      formValues: formValues
    });
  }

  /**
   * Method for setting field value
   *
   * @param fieldName field name
   * @param fieldValue field value
   */
  private setPlaceFieldValue = (fieldName: string, fieldValue: FieldValue) => {
    const { placeFormValues } = this.state;
    placeFormValues[fieldName] = fieldValue;
    this.setState({ placeFormValues });
  }

  /**
   * Method for setting date
   *
   * @param onChange on change callback for setting date
   */
  private datePicker = (fieldName: string, onChange: (date: Date) => void) => {
    const value = this.getFieldValue(fieldName);
    return (
      <DatePicker
        selected={ value ? new Date(value) : null }
        onChange={ onChange }
        dateFormat="dd.MM.yyyy"
        locale="fi"
      />
    );
  }

  /**
   * Method for setting datetime
   *
   * @param onChange on change callback for setting datetime
   */
  private datetimePicker = (fieldName: string, onChange: (date: Date) => void) => {
    const value = this.getFieldValue(fieldName);
    return (
      <DatePicker
        selected={ value ? new Date(value) : null }
        onChange={ onChange }
        dateFormat="dd.MM.yyyy HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={ 15 }
        locale="fi"
      />
    );
  }

  /**
   * Method for uploading a file
   *
   * @param file file
   * @param path path
   */
  private uploadFile = (fieldName: string, files: FileList | File, path: string) => {};

  /**
   * Method for setting autocomplete options
   *
   * @param path path
   */
  private setAutocompleteOptions = async (input: string) => {

    const { fethingData, fetchData } = this.state;
    // Handle place autocomplete
    if (!input) {
      return [];
    }

    if (Object.keys(fetchData).length === 0 && !fethingData) {
      this.setState({
        fethingData: true
      })
      const data = await this.fetchPlaces();
      this.setState({
        fetchData: data,
        fethingData: false
      })
      await this.returnPlaces();
    }
    return this.returnPlaces();
  }

  /**
   * Return list of places
   */
  private returnPlaces = async () => {
    const { fetchData } = this.state;

    return await fetchData.map(place => {
      return {
        name: place.name && place.name.fi ? place.name.fi : place.id,
        value: place.id
      };
    });
  }

  /**
   * Fetching data if not having any
   */
  private fetchPlaces = async () => {
    let data: Place[] = [];
    let i;
    let fetchAddress = `https://mantyharju.linkedevents.fi/v1/place/?&data_source=mantyharju`;
    for (i=0; i < 1; i++) {
      const fetchResponse = await fetch(fetchAddress);
      const res = await fetchResponse.json();
      data.push(...res.data);

      const meta = res.meta;
      if (meta.next) {
        fetchAddress = res.meta.next;
        i -= 1;
      }
    }

    return data;
  }

  /**
   * Method for rendering form icons
   *
   * @param icon icon name
   * @param key key
   */
  private renderIcon = (icon: IconName, key: string): React.ReactNode => {
    return <Icon className={ icon } />;
  }

  /**
   * Method for submitting form
   *
   * @param source submit input info
   */
  private onSubmit = async (source: Metaform) =>  {

    const submitButtonName = source["name"];

    if (submitButtonName === "submit-event") {
      const { formValues } = this.state;
      if (!this.isFormValid()) {
        this.setState({
          requiredFieldsMissing: true
        });
        return;
      } else {
        this.setState({
          requiredFieldsMissing: false
        });
      }
      const start = moment(formValues["start-date-time"] as number);
      const end = moment(formValues["end-date-time"] as number);

      if (this.state.defaultImageUrl || this.state.imageUrl) {
      formValues["image-url"] = this.state.imageUrl ? this.state.imageUrl : this.state.defaultImageUrl;
      } else {
        return alert(strings.eventAdd.notificationAddImage);
      }

      const hasStartTime = !(start.hour() === 0 && start.minute() === 0);
      const hasEndTime = !(end.hour() === 0 && end.minute() === 0);

      formValues["has-start-time"] = hasStartTime ? "true" : "false";
      formValues["has-end-time"] = hasEndTime ? "true" : "false";

      formValues["start-time-string"] = start.format();
      formValues["end-time-string"] = end.format();

      formValues["submit"] = "event";

      const keywords: string[] = [];
      const formKeys = Object.keys(formValues);
      formKeys.forEach((formKey) => {
        if (formKey.startsWith("keyword__") && formValues[formKey] == "checked") {
          keywords.push(formKey.replace("keyword__", ""));
        }
      });

      if (keywords.length < 1) {
        return alert(strings.eventAdd.notificationAddKeyword);
      }

      formValues["keywords"] = keywords.join(",");

      try {
        const api = ApiUtils.getApi();
        await api.postWpV2Event({ event: formValues });
        this.setState({formValues: {}});
        alert(strings.eventAdd.successfullyAdded);
      } catch (error) {
        alert(strings.eventAdd.errorWhenAddingEvent);
      }
    }
    if (submitButtonName === "submit-place") {

      const { placeFormValues } = this.state;

      try {
        const api = ApiUtils.getApi();

        placeFormValues["submit"] = "place";

        api.postWpV2Event({ event: placeFormValues });
        this.setState({placeFormValues: {}});
      } catch (error) {
          alert(strings.eventAdd.errorWhenAddingPlace);
      }
    }
  }

  /**
   * Validates form
   *
   * @returns boolean
   */
  private isFormValid = (): boolean => {
    const { form, formValues } = this.state;

    if (!form.sections) {
      return false;
    }

    let formvalid = true;
    form.sections.forEach((section: any) => {

      if (!section.fields) {
        return;
      }

      section.fields.forEach((field: any) => {

        if (!field.name) {
          return;
        }

        if (
          field.required &&
          (formValues[field.name] === "" ||
          formValues[field.name] === null ||
          formValues[field.name] === undefined)
        ) {
          formvalid = false;
        }
      });
    });
    return formvalid;
  }

  /**
   * Render News posts
   *
   * @param postItems post items
   */
  private renderPostItems = (postItems: PostItem[]) => {
    const { classes } = this.props;
    return postItems.slice(0, 5).map((postItem: PostItem) => (
      <div className={ classes.singlePost }>
        <p className={ classes.postDate }>{ postItem.date ? postItem.date.format("DD.MM.YYYY") : "" }</p>
        <div className={ classes.postContent }>
          <a href={ postItem.link }>
            <p>
              { postItem.title }
            </p>
          </a>
        </div>
        <hr />
      </div>
    ));
  }

  /**
   * Render LinkedEvents posts
   */
  private renderLinkedEvents = () => {
    const { classes } = this.props;
    const { linkedEventsPost } = this.state;
    if (!linkedEventsPost) {
      return null;
    } else {
      const parsedContent = ReactHtmlParser(linkedEventsPost.content ? linkedEventsPost.content.rendered || "" : "");
      return (
        parsedContent.splice(0, this.state.linkedEventsLimitingNumber).map((contentItem) => {
          const link = this.getEventLink(contentItem);
          return (
            <>
              { link &&
                <a className={ classes.event_link } href={ link ? link : "#" }>
                  <figure className={ classes.events_item_universal }>
                    { contentItem }
                  </figure>
                </a>
              }
            </>
          );
        })
      );
    }
  }

  /**
   * Render Bottom section posts
   */
  private renderBottomSectionPosts = () => {
    const { classes } = this.props;
    const { popularPages } = this.state;
    return popularPages.map((page, index) => {
      return (
        <div
          onClick={ this.navigateTo(page.link || window.location.href) }
          style={{ backgroundImage: `url(${ page.featureImageUrl ? page.featureImageUrl : defaultimage })`, backgroundPosition: "center" }}
          className={ classes.bottom_section_item }
          key={ index }
        >
          <p>{ ReactHtmlParser(page.title ? page.title.rendered || "" : "")}</p>
        </div>
      );
    });
  }

  /**
   * Recursive search for event link
   *
   * @param element react element
   * @returns link of the event or undefined
   */
  private getEventLink = (element: React.ReactElement): string | void => {
    const { props } = element;
    if (props) {
      const { href } = props;
      if (href) {
        return href;
      }
      const { children } = props;
      if (children) {
        const match = children.find((child: React.ReactElement) => typeof this.getEventLink(child) === "string");
        if (match) {
          return this.getEventLink(match);
        }
      }
    }
  }

  /**
   * Navigates to the url
   *
   * @param url url
   */
  private navigateTo = (url: string) => () => {
    window.location.href = url;
  }

  /**
   * Method for converting dd.mm.yyyy to yyyy-mm-dd
   *
   * @param str string
   */
  private convertToISO = (str: string) => {
    const [day, month, year] = str.split(".");
    return `${year}-${month.length > 1 ? month : `0${month}`}-${day.length > 1 ? day : `0${day}`}`;
  }

  /**
   * Scrolls down to popular pages
   */
  private scrollDownToPopularPages = () => {
    const { current } = this.popularPagesSection;
    if (current) {
      current.scrollIntoView();
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
   * Update scrolling position method
   */
  private handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      scrollPosition: currentScrollPos
    });
  }

  /**
   * Action handler for "Show more" Linked events button
   */
  private expandLinkedEvents = () => {
    let newLimitingNumber: number;
    if (this.state.linkedEventsLimitingNumber === 8) {
      newLimitingNumber = 16;
    } else {
      newLimitingNumber = 8;
    }

    this.setState({
      linkedEventsLimitingNumber: newLimitingNumber
    });
  }

  /**
   * Gets limited posts array
   */
  private getLimitedPosts = (categoryId: number, delimiter: number) => {
    const postsArray: CustomPost[] = new Array();
    this.state.posts.map((post) => {
      if ((post.categories ? post.categories : new Array()).includes(categoryId)) {
        postsArray.push(post);
      }
    });

    return postsArray.splice(0, delimiter);
  }
}

export default withStyles(styles)(WelcomePage);
