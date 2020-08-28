import * as React from "react";
import BasicLayout from "../BasicLayout";
import contentImage from "../../resources/img/mantyharju-images/mantyharju-images/hero-front-1600x1080.jpg";
import ReactHtmlParser from "react-html-parser";
import ApiUtils from "../../utils/ApiUtils";
import { WithStyles, withStyles, Button, CircularProgress, Icon, Dialog } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import * as moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import CurrenEventsIcon from '@material-ui/icons/QuestionAnswerOutlined';
import AnnouncementsIcon from '@material-ui/icons/VolumeUp';
import JobsIcon from '@material-ui/icons/ThumbsUpDown';
import { Post, MenuLocationData, Attachment, GetWpV2PostsOrderbyEnum, GetWpV2PostsOrderEnum, CustomizeField } from "../../generated/client/src";
import { MetaformComponent, IconName, FieldValue, Metaform, MetaformField } from "metaform-react";
import DatePicker, { registerLocale } from "react-datepicker";
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import "react-datepicker/dist/react-datepicker.css";
import fi from "date-fns/esm/locale/fi";
import ImageUpload from "./image-upload";
import theme from "../../styles/image-upload";

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
  posts: Post[],
  form: Metaform,
  placeForm: Metaform,
  formValues: Dictionary<string | number | null>
  placeFormValues: Dictionary<string | number | null>
  media: Attachment[],
  linkedEventsPost?: Post,
  loading: boolean,
  popularPosts: Post[],
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
  imageUrl: string
}

interface Dictionary<T> {
  [Key: string]: T;
}

const imageList= [
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage1.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage2.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage3.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage4.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage5.jpg",
  "https://static.metatavu.io/mantyharju/linkedevents/images/defaultimage6.jpg"
]

/**
 * WelcomePage component
 */
class WelcomePage extends React.Component<Props, State> {

  private popularPagesSection: React.RefObject<HTMLDivElement>;

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
      popularPosts: [],
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false,
      announcementsCategoryId: 5,
      newsCategoryId: 15,
      linkedEventsLimitingNumber: 8,
      customizeFields: [],
      modalOpen: false,
      defaultImageUrl: "",
      showDefaultImages: false,
      addPlaceVisibility: false,
      imageUrl: ""
    }

    this.onPick = this.onPick.bind(this)

    this.popularPagesSection = React.createRef();
    registerLocale('fi', fi);
  }

  onPick(image: any) {
    this.setState({defaultImageUrl: image.src})
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      loading: true
    });

    const api = ApiUtils.getApi();
    const [posts, mainMenu, localeMenu, popularCategory, eventsPost, media, customizeFields] = await Promise.all(
      [
        api.getWpV2Posts({per_page: 100}),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2Categories({ slug: ["popular"] }),
        api.getWpV2PostsById({ id: "57" }),
        api.getWpV2Media({}),
        api.getWpV2Customize()
      ]
    );

    const categoryIdArray = [(popularCategory.length > 0 ? popularCategory[0].id || -1 : -1).toString()];

    const popularPosts = await api.getWpV2Posts({ categories: categoryIdArray, per_page: 6, orderby: GetWpV2PostsOrderbyEnum.Date, order: GetWpV2PostsOrderEnum.Desc });
    const placeForm: Metaform = require("../../metaform-json/create-place.json");
    const form: Metaform = require("../../metaform-json/create-event.json");
    const keywordRes = await fetch("https://mantyharju-test.linkedevents.fi/v1/keyword/?page_size=1000&data_source=mantyharju");
    const data = await keywordRes.json();

    const sections = (form.sections || []).map(section => {
      if (section.title == "Tapahtumaluokat") {
        section.fields = data.data.map((keyword: any) => {
          return {
            "name": `keyword__${keyword.id}`,
            "type": "boolean",
            "title": keyword.name && keyword.name.fi ? keyword.name.fi : keyword.id
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
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
      popularPosts: popularPosts,
      linkedEventsPost: eventsPost,
      media: media,
      customizeFields: customizeFields
    });

    this.hidePageLoader();
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
    const { lang, classes } = this.props;
    const showcaseText = this.getCustomizerFieldValue("showcase_text");
    const showcaseImage = this.getCustomizerFieldValue("showcase_image");
    const showcaseTitle = this.getCustomizerFieldValue("showcase_title");
    const showcaseButtonText = this.getCustomizerFieldValue("showcase_button_text");
    const showcaseButtonLink = this.getCustomizerFieldValue("showcase_button_link");

    return (
      <BasicLayout lang={ lang }>
        <div className={ classes.heroImageDiv }>
          <h1 className={ classes.heroText }>Mäntyharju. -logo</h1>
          <h2 className={ classes.heroText }>Luontoa, kulttuuria ja elämää!</h2>
          <Button title="Lorem Ipsum" className= { `${classes.generalButtonStyle} ${classes.heroButton}`}>Lorem Ipsum</Button>
          <Button onClick={ this.scrollDownToPopularPages } title="Suosituimmat sivut" className={ `${classes.heroButtonPopularPages}`} endIcon={ <AddIcon/> }>Suosituimmat sivut</Button>
        </div>
        { this.state.loading &&
          <div className={ classes.loadingIconContainer }>
            <CircularProgress />
          </div>
        }
        { !this.state.loading &&
          <div className= { classes.addEventDiv }>
            <div className= { classes.addEventImageDiv }>
              <img className= { classes.addEventImage } alt="Lisää tapahtuma: kuvituskuva" src={ showcaseImage || contentImage } />
            </div>
            <div className= { classes.addEventTextDiv }>
              <h3 className= { classes.addEventTextDivHeading }>{ showcaseTitle }</h3>
              <p className= { classes.addEventTextDivParagraph }>
                { showcaseText }
              </p>
              <Button onClick={ this.navigateTo(showcaseButtonLink || window.location.href) } className={ `${classes.generalButtonStyle} ${classes.addEventButton}`}>
                { showcaseButtonText }
              </Button>
            </div>
          </div>
        }
        <div className={ classes.postsContainer }>
          <div className= { classes.postsColumn }>
            <h1>{ <CurrenEventsIcon/> } Ajankohtaista</h1>
            { this.renderNews(this.state.newsCategoryId) }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
          <div className= { classes.postsColumn }>
            <h1>{ <AnnouncementsIcon/> } Kuulutukset</h1>
            { this.renderAnnouncements(this.state.announcementsCategoryId) }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
          <div className= { classes.postsColumn }>
            <h1>{ <JobsIcon/> } Työpaikat</h1>
            { this.renderAnnouncements(this.state.announcementsCategoryId) }
            <Button className={ classes.postColumnButton }>katso kaikki</Button>
          </div>
        </div>
        <div className = { classes.linkedEventsContainer }>
          <h1>Tapahtumat</h1>
          <div className={ classes.wrapper }>
            { this.renderLinkedEvents(27) }
          </div>
          <Button title= "Kaikki tapahtumat" onClick={this.expandLinkedEvents} className={ `${classes.generalButtonStyle} ${classes.allEventsButton}` }>Kaikki tapahtumat</Button>
          <Button title= "Lisää tapahtuma" onClick={ this.openModal } className={ `${classes.generalButtonStyle} ${classes.addLinkedEventButton}` }>Lisää tapahtuma</Button>
        </div>
        <div ref={ this.popularPagesSection } className={ classes.bottom_section }>
          {
            this.renderBottomSectionPosts()
          }
        </div>
        <Dialog
          className={ classes.dialog }
          onClose={ this.closeModal }
          open={ this.state.modalOpen }
          scroll={ 'paper' }
        >
          {
            this.renderForm(this.state.form)
          }
        </Dialog>
      </BasicLayout>
    );
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
   * Returns found customizer field value or undefined
   *
   * @param key key of the customizer field
   */
  private getCustomizerFieldValue = (key: string) => {
    const { customizeFields } = this.state;
    const field = customizeFields.find(field => field.key === key);
    if (field) {
      return field.value;
    }
    return undefined;
  }

  /**
   * Render single form
   */
  private renderForm = (form: Metaform) => {
    const { classes } = this.props;
    return (
      <div className={ classes.paper }>
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
    if (fieldName == "default-image-url") {
      return (
        <div>
          <input type="checkbox" onChange={this.showDefaultImages}/>
          <div style={this.state.showDefaultImages && !this.state.imageUrl ? {display:"block"} : {display:"none"}}>
            <ImagePicker 
              images={imageList.map((image, i) => ({src: image, value: i}))}
              onPick={this.onPick}
            />
          </div>
          <div style={this.state.showDefaultImages && this.state.imageUrl ? {display:"block"} : {display:"none"}}>
            Olet tuonut oman kuvan, mikäli haluat käyttää oletuskuvia, poista ensin lisätty kuva.
          </div>
          <div style={{ marginBottom: theme.spacing(3)}}>
            <ImageUpload userId="staging" onSave={ (url) => {this.setState({imageUrl: url})} } label={ imageTextLabel }  />
          </div>
        </div>
      )
    }
    if (fieldName == "add-location") {
      return (
        <div>
          <input type="button" value={this.state.addPlaceVisibility ? "Sulje paikan lisääminen" : "Lisää paikka"} onClick={this.addPlaceVisibility}/>

          <div style={this.state.addPlaceVisibility ? {display:"block"} : {display:"none"}}>
            <div className={ classes.paper }>
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
      )
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
  private uploadFile = (fieldName: string, files: FileList | File, path: string) => {
    console.log("uploadFile: ", fieldName, files, path);
  }

  /**
   * Method for setting autocomplete options
   *
   * @param path path
   */
  private setAutocompleteOptions = async (path: string, input: string) => {

    //Handle place autocomplete
    if (path == "/linkedevents/places/search") {
      if (input.length < 3) {
        return [];
      }
      const res = await fetch(`https://mantyharju-test.linkedevents.fi/v1/search/?type=place&input=${input}`);
      const data = await res.json();
      return data.data.map((place: any) => {
        return {
          name: place.name && place.name.fi ? place.name.fi : place.id,
          value: place.id
        }
      });
    }
    return new Promise<string[]>((resolve, reject) => {
      resolve([ "moi", "hei" ]);
    });
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

    if(submitButtonName === "submit-event") {
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
      })

      formValues["keywords"] = keywords.join(",");

      try {
        const api = ApiUtils.getApi();
        await api.postWpV2Event({ event: formValues });
        this.setState({formValues: {}});

      } catch (error) {
          console.log("Error: ",error);

      }
    }
    if(submitButtonName === "submit-place") {

      const { placeFormValues } = this.state;

      try {
        const api = ApiUtils.getApi();

        placeFormValues["submit"] = "place";

        api.postWpV2Event({ event: placeFormValues });
        this.setState({placeFormValues: {}})
      } catch (error) {
          alert("Virhe tapahtuman lisäämisessä, tarkista pakolliset kentät ja yritä uudelleen")
          console.log("Error: ",error);
      }
    }
  }

  /**
   * Returns boolean depending on wether form is valid or not
   */
  private validateForm = () => {
    const { formValues } = this.state;
    if (
      (
        (
          formValues["language-fi"] &&
          (formValues["name-fi"] && ((formValues["has-price"] && formValues["price-fi"]) || !formValues["has-price"]) && formValues["description-fi"]) &&
          ((formValues["is-registration"] && formValues["no-registration-fi"]) || !formValues["is-registration"]) ||
          (!formValues["language-fi"] && (formValues["language-sv"] || formValues["language-en"]))
        ) &&
        (
          formValues["language-sv"] &&
          (formValues["name-sv"] && ((formValues["has-price"] && formValues["price-sv"]) || !formValues["has-price"]) && formValues["description-sv"]) &&
          ((formValues["is-registration"] && formValues["no-registration-sv"]) || !formValues["is-registration"]) ||
          (!formValues["language-sv"] && (formValues["language-fi"] || formValues["language-en"]))
        ) &&
        (
          formValues["language-en"] &&
          (formValues["name-en"] && ((formValues["has-price"] && formValues["price-en"]) || !formValues["has-price"]) && formValues["description-en"]) &&
          ((formValues["is-registration"] && formValues["no-registration-en"]) || !formValues["is-registration"]) ||
          (!formValues["language-en"] && (formValues["language-sv"] || formValues["language-fi"]))
        )
      ) &&
      (
        (formValues["start-date-time"] && formValues["end-date-time"]) ||
        (formValues["start-date"] && formValues["end-date"])
      ) &&
      (
        (formValues["show-default-images"] && formValues["default-image-url"]) ||
        (formValues["image"] || formValues["image-url"])
      ) &&
      (
        formValues["location"] &&
        formValues["provider"] &&
        formValues["responsible"] &&
        formValues["responsible-phone-number"] &&
        formValues["responsible-email-address"]
      )
    ) {
      return true;
    }
    return false;
  }

  /**
   * Render News posts
   * 
   * TODO: Get linkedEventsPost not by the hardcoded post ID
   */
  private renderNews = (categoryId: number) => {
    const { classes } = this.props;
    const newsPost = this.getLimitedPosts(categoryId, 1)[0];
    let events = new Array();
    if (!newsPost) {
      return null;
    } else {
      const parsedContent = ReactHtmlParser(newsPost.content ? newsPost.content.rendered || "" : "");
      return (
        parsedContent.splice(0, 4).map(contentItem => {
          return (
            <div className={ classes.allPosts}>
              <div className={ classes.singleNewsPost }>
                { contentItem }
              </div>
            </div>
          )
        })
      )
    }
  }

  /**
   * Render Announcements posts
   */
  private renderAnnouncements = (categoryId: number) => {
    const { classes } = this.props;
    if (!this.state.posts.length) {
      return null;
    } else {
      return (
        this.getLimitedPosts(categoryId, 3).map((post) => {
          if ((post.categories ? post.categories : new Array()).includes(categoryId)) {
            const postsArray = new Array();
            postsArray.concat(post);
            return(
              <div className={ classes.allPosts}>
                <div className={ classes.singlePost }>
                  <p className={ classes.postDate }>{ ReactHtmlParser(!post.date ? "" : moment(post.date).format("DD.MM.YYYY")) }</p>
                  <div className={ classes.postContent }>
                    { ReactHtmlParser(post.content ? post.content.rendered || "" : "") }
                  </div>
                  <hr />
                </div>
              </div>
            )
          } else {
            return null;
          }
        })
      );
    }
  }

  /**
   * Render LinkedEvents posts
   *
   * TODO: Get linkedEventsPost not by the hardcoded post ID
   */
  private renderLinkedEvents = (postId: number) => {
    const { classes } = this.props;
    const linkedEventsPost = this.state.linkedEventsPost;
    const events = new Array();
    if (!this.state.linkedEventsPost) {
      return null;
    } else {
      const parsedContent = ReactHtmlParser(this.state.linkedEventsPost.content ? this.state.linkedEventsPost.content.rendered || "" : "");
      return (
        parsedContent.splice(0, this.state.linkedEventsLimitingNumber).map(contentItem => {
          return (
            <figure className={classes.events_item_universal}>
              { contentItem }
            </figure>
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
    const { popularPosts } = this.state;
    return popularPosts.map(post => {
      return (
        <div onClick={ this.navigateTo(post.link || window.location.href) } style={{ backgroundImage: `url(${ this.getAttachmentForPost(post) })` }} className={ classes.bottom_section_item }>
          <p>{ post.title ? post.title.rendered || "" : "" }</p>
        </div>
      );
    });
  }

  /**
   * Returns post featured image URL
   */
  private getAttachmentForPost = (post: Post) => {
    let attachmentUrl = "";
    if (this.state.media) {
      this.state.media.map(attachment => {
        if (attachment.id === post.featured_media) {
          attachmentUrl = attachment.source_url || "";
        }
      });
    }
    return attachmentUrl;
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
    if (this.state.linkedEventsLimitingNumber == 8) {
      newLimitingNumber = 16
    } else {
      newLimitingNumber = 8
    }

    this.setState({
      linkedEventsLimitingNumber: newLimitingNumber
    });
  }

  /**
   * Gets limited posts array
   */
  private getLimitedPosts = (categoryId: number, delimiter: number) => {
    const postsArray: Post[] = new Array();
    this.state.posts.map((post) => {
      if ((post.categories ? post.categories : new Array()).includes(categoryId)) {
        postsArray.push(post);
      }
    })

    return postsArray.splice(0, delimiter);
  }
}

export default withStyles(styles)(WelcomePage);