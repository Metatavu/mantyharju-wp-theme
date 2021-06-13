import LocalizedStrings, { LocalizedStringsMethods } from "localized-strings";

export interface IStrings extends LocalizedStringsMethods {
  addEvent: string,
  announcements: string,
  cancel: string,
  close: string,
  coming: string,
  currentNews: string,
  currentNewsSlug: string,
  donate: string,
  sponsors: string,
  error: string,
  events: string,
  jobs: string,
  moreCurrentNews: string,
  morePlus: string,
  newEvent: string,
  ongoing: string,
  pageNotFound: string,
  past: string,
  searchSite: string,
  showMore: string,
  showMoreEvents: string,
  somethingWentWrong: string,
  whoops: string,
  requiredFieldMissing: string,
  popularPages: string,
  eventAdd: {
    addImage: string,
    deleteOwnPicture: string,
    closeAddingPlace: string,
    addPlace: string,
    notificationAddImage: string,
    notificationAddKeyword: string,
    successfullyAdded: string,
    errorWhenAddingEvent: string,
    errorWhenAddingPlace: string
  },
  movie: {
    buyTickets: string;
    showDescription: string;
    hideDescription: string;
    movies: string;
    duration: string;
    category: string;
    noReleaseDate: string;
    price: string;
    showTimes: string;
    watchTrailer: string;
    nextShowTime: string;
    movieTheatre: string;
    ongoingMovies: string;
    ageLimits: string;
    festival: string;
    buyTicets: string;
    email: string;
    addres: string;
    postalCode: string;
    placeAtMap: string;
    showRoute : string;
    basicTicket: string;
    basicInfo: string;
    flexoundTicket: string;
    flexoundInfo: string;
    flexoundExtraInfo: string;
    meansOfPayment: string;
    cash: string;
    creditCard: string;
    smartum: string;
    ePassi: string;
    virikeSeteli: string;
    edenred: string;
    eazyBreak: string;
    giftCard: string;
    commonInformation: string;

    movieInformationText: {
      text1: string;
      text2: string;
      text3: string;
      text4: string;
      text5: string;
      text6: string;
      text7: string;
      text8: string;
      text9: string;
      text10: string;
      text11: string;
    }
  }
}

const strings: IStrings = new LocalizedStrings({
  en: require("./en.json"),
  fi: require("./fi.json")
});

export default strings;