import * as React from "react";
import BasicLayout from "../BasicLayout";
import ReactHtmlParser from "react-html-parser";
import ApiUtils from "../../utils/ApiUtils";
import { WithStyles, withStyles, Button, CircularProgress, Typography, SvgIcon, Icon, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import * as moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import { Post, MenuLocationData, CustomizeField, Attachment, Page, CustomPost } from "../../generated/client/src";
import { MetaformComponent, IconName, FieldValue, Metaform } from "metaform-react";
import { jobsIconSvgPath, announcementIconSvgPath, currentNewsIconSvgPath } from "../../resources/icons/svgIcons";
import DatePicker, { registerLocale } from "react-datepicker";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import fi from "date-fns/esm/locale/fi";
import ImageUpload from "./image-upload";

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
  formValues: Dictionary<string | number | null>
  placeFormValues: Dictionary<string | number | null>
  media: Attachment[],
  linkedEventsPost?: Post,
  loading: boolean,
  popularPages: Page[],
  mainMenu?: MenuLocationData,
  localeMenu?: MenuLocationData,
  scrollPosition: number,
  siteMenuVisible: boolean,
  siteSearchVisible: boolean,
  announcementsCategoryId: number,
  newsCategoryId: number,
  linkedEventsCategoryId: number,
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
  announcements?: PostItem[]
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
      media: [],
      form: {},
      placeForm: {},
      formValues: {},
      placeFormValues: {},
      loading: false,
      popularPages: [],
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false,
      announcementsCategoryId: 4,
      newsCategoryId: 5,
      linkedEventsCategoryId: 8,
      linkedEventsLimitingNumber: 4,
      customizeFields: [],
      modalOpen: false,
      defaultImageUrl: "",
      showDefaultImages: false,
      addPlaceVisibility: false,
      imageUrl: ""
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

    const [posts, mainMenu, localeMenu, popularCategory, media] = await Promise.all(
      [
        api.getCustomPosts({}),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2Categories({ slug: ["suosittu"] }),
        api.getWpV2Media({}),
        api.getWpV2Customize()
      ]
    );

    const categoryIdArray = [(popularCategory.length > 0 ? popularCategory[0].id || -1 : -1)];

    const popularPages = await api.getWpV2Pages({ categories: categoryIdArray, per_page: 6});
    const placeForm: Metaform = require("../../metaform-json/create-place.json");
    const form: Metaform = require("../../metaform-json/create-event.json");
    const keywordRes = await fetch("https://mantyharju-test.linkedevents.fi/v1/keyword/?page_size=1000&data_source=mantyharju");
    const data = await keywordRes.json();

    const sections = (form.sections || []).map((section) => {
      if (section.title === "Tapahtumaluokat") {
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
      popularPages: popularPages,
      media: media
    });

    this.hidePageLoader();

    this.getNews();
    this.getAnnouncements();
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
    const { announcementsPageLink, newsPageLink } = this.state;
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
          <img className={ classes.heroLogo } src={ heroLogoImage } />
          <h2 className={ classes.heroText }>{ heroTitle }</h2>
          <Button color="secondary" className= { classes.heroButton } href={ heroButtonLink }>{ heroButtonText }</Button>
          <Button
            className={ `${ classes.heroButtonPopularPages }`}
            onClick={ this.scrollDownToPopularPages }
            title="Suosituimmat sivut"
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
              <Button onClick={ this.navigateTo(showcaseButtonLink || window.location.href) } className={ classes.addEventButton }>
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
              <Typography variant="h1">Ajankohtaista</Typography>
            </div>
            { !this.state.news &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            { this.state.news &&
              <div>
                { this.renderNews() }
              </div>
            }
            <Button className={ classes.postColumnButton } onClick={ this.navigateTo(newsPageLink || window.location.href) }>katso kaikki</Button>
          </div>
          <div className= { classes.postsColumn }>
            <div className={ classes.postsHeading }>
              <SvgIcon color="primary" fontSize="large">
                { announcementIconSvgPath }
              </SvgIcon>
              <Typography variant="h1">Kuulutukset</Typography>
            </div>
            { !this.state.announcements &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            { this.state.announcements &&
              <div className={ classes.allPosts }>
                { this.renderAnnouncements() }
              </div>
            }
            <Button className={ classes.postColumnButton } onClick={ this.navigateTo(announcementsPageLink || window.location.href) }>katso kaikki</Button>
          </div>
          <div className={ classes.postsColumn }>
            <div className={ classes.postsHeading }>
              <SvgIcon color="primary" fontSize="large">
                { jobsIconSvgPath }
              </SvgIcon>
              <Typography variant="h1">Työpaikat</Typography>
            </div>
            { !this.state.announcements &&
              <div className={ classes.loadingIconContainer }>
                <CircularProgress />
              </div>
            }
            { this.state.announcements &&
              <div className={ classes.allPosts }>
                { this.renderAnnouncements() }
              </div>
            }
            <Button className={ classes.postColumnButton } onClick={ this.navigateTo(`${ window.location.origin }/jobs/"` || window.location.href) }>katso kaikki</Button>
          </div>
        </div>

        <div className = { classes.linkedEventsContainer }>
          <Typography variant="h1">Tapahtumat</Typography>
          <div className={ classes.legendWrapper }>
            <div className={ classes.legend }>
              <div className={ classes.legendColor } style={{ backgroundColor: "#e43e3e" }} />
              <Typography variant="subtitle1">Menneet</Typography>
            </div>
            <div className={ classes.legend }>
              <div className={ classes.legendColor } style={{ backgroundColor: "#FFCF4E" }} />
              <Typography variant="subtitle1">Menossa</Typography>
            </div>
            <div className={ classes.legend }>
              <div className={ classes.legendColor } style={{ backgroundColor: "#00AAAD" }} />
              <Typography variant="subtitle1">Tulossa</Typography>
            </div>
          </div>
          <div className={ classes.wrapper }>
            { this.renderLinkedEvents(this.state.linkedEventsCategoryId) }
          </div>
          <div className={ classes.eventsButtonRow }>
            <Button
              className={ classes.allEventsButton }
              title= "Näytä lisää tapahtumia"
              onClick={this.expandLinkedEvents}
              >
                Näytä lisää
            </Button>
            <Button
              onClick={ this.openModal }
              className={ classes.addLinkedEventButton }
              title= "Lisää tapahtuma"
              >
                Lisää tapahtuma
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
              <Typography variant="h1" className={ classes.heroText } style={{ margin: 0 }}>Uusi tapahtuma</Typography>
              <Button onClick={ this.closeModal } style={{ color: "#fff", alignItems: "right" }}>Sulje</Button>
            </Grid>
          </DialogTitle>
          <DialogContent>
            {
              this.renderForm(this.state.form)
            }
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={ this.closeModal } variant="text" color="primary">
              Peruuta
            </Button>
          </DialogActions>
        </Dialog>
      </BasicLayout>
    );
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
    return (
      <div className={ classes.metaformWrapper }>
        <MetaformComponent
          form={ form }
          renderBeforeField={ this.renderBeforeField }
          formReadOnly={ false }
          getFieldValue={ this.getFieldValue }
          setFieldValue={ this.setFieldValue }
          datePicker={ this.datePicker }
          datetimePicker={ this.datetimePicker }
          uploadFile={ this.uploadFile }
          setAutocompleteOptions={ this.setAutocompleteOptions }
          renderIcon={ this.renderIcon }
          onSubmit={ this.onSubmit }
        />
      </div>
    );
  }

  private renderBeforeField = (fieldName?: string) => {
    const { classes } = this.props;
    const imageTextLabel = "Lisää kuva raahamalla tai klikkaamalla aluetta";
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
            <Typography variant="body2">Olet tuonut oman kuvan, mikäli haluat käyttää oletuskuvia, poista ensin lisätty kuva.</Typography>
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
          <input type="button" value={this.state.addPlaceVisibility ? "Sulje paikan lisääminen" : "Lisää paikka"} onClick={this.addPlaceVisibility}/>
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
        dateFormat="dd.MM.yyyy"
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
  private setAutocompleteOptions = async (path: string, input: string) => {

    // Handle place autocomplete
    if (path === "/linkedevents/places/search") {
      if (input.length < 3) {
        return [];
      }
      const res = await fetch(`https://mantyharju-test.linkedevents.fi/v1/search/?type=place&input=${ input }`);
      const data = await res.json();
      return data.data.map((place: any) => {
        return {
          name: place.name && place.name.fi ? place.name.fi : place.id,
          value: place.id
        };
      });
    }
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
      const start = moment(formValues["start-date-time"] as number);
      const end = moment(formValues["end-date-time"] as number);

      formValues["image-url"] = this.state.imageUrl ? this.state.imageUrl : this.state.defaultImageUrl;

      const hasStartTime = !(start.hour() == 0 && start.minute() == 0);
      const hasEndTime = !(end.hour() == 0 && end.minute() == 0);

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

      formValues["keywords"] = keywords.join(",");

      try {
        const api = ApiUtils.getApi();
        await api.postWpV2Event({ event: formValues });
        this.setState({formValues: {}});

      } catch (error) {
          alert("Virhe tapahtuman lisäämisessä, tarkista pakolliset kentät ja yritä uudelleen")
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
          alert("Virhe paikan lisäämisessä, tarkista pakolliset kentät ja yritä uudelleen");
      }
    }
  }

  /**
   * Render News posts
   */
  private renderNews = () => {
    const { classes } = this.props;
    const { news } = this.state;

    if (!news) {
      return;
    }

    return news.map((newsItem: PostItem) => (
      <div className={ classes.singlePost }>
        <p className={ classes.postDate }>{ newsItem.date ? newsItem.date.format("DD.MM.YYYY") : "" }</p>
        <div className={ classes.postContent }>
          <a href={ newsItem.link }>
            <p>
              { newsItem.title }
            </p>
          </a>
        </div>
        <hr />
      </div>
    ));
  }

  /**
   * Render Announcements posts
   */
  private renderAnnouncements = () => {
    const { classes } = this.props;
    const { announcements } = this.state;

    if (!announcements) {
      return null;
    }

    return announcements.map((announcement: PostItem) => (
      <div className={ classes.singlePost }>
        <p className={ classes.postDate }>{ announcement.date ? announcement.date.format("DD.MM.YYYY") : "" }</p>
        <div className={ classes.postContent }>
          <a href={ announcement.link }>
            <p>
              { announcement.title }
            </p>
          </a>
        </div>
        <hr />
      </div>
    ));
  }

  /**
   * Render LinkedEvents posts
   *
   * TODO: Get linkedEventsPost not by the hardcoded post ID
   */
  private renderLinkedEvents = (categoryId: number) => {
    const { classes } = this.props;
    const linkedEventsPost = this.getLimitedPosts(categoryId, 1)[0];
    if (!linkedEventsPost) {
      return null;
    } else {
      const parsedContent = ReactHtmlParser(linkedEventsPost.post_content || "");
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
    return popularPages.map((page) => {
      return (
        <div
          onClick={ this.navigateTo(page.link || window.location.href) }
          style={{ backgroundImage: `url(${ this.getAttachmentForPage(page) })` }}
          className={ classes.bottom_section_item }
        >
          <p>{ page.title ? page.title.rendered || "" : "" }</p>
        </div>
      );
    });
  }

  /**
   * Returns page featured image URL
   */
  private getAttachmentForPage = (page: Page) => {
    let attachmentUrl = "";
    if (this.state.media) {
      this.state.media.map((attachment) => {
        if (attachment.id === page.featured_media) {
          attachmentUrl = attachment.source_url || "";
        }
      });
    }

    return attachmentUrl;
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
