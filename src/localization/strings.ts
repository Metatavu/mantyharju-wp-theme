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
  createEvent: string;
  createAndCopyEvent: string;
  previewEvent: string;
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
  nextPage: string,
  previousPage: string,
  companies: {
    companySelectNew: string,
    companySelectUpdated: string,
    companyCategoryInformation: string,
    companyCategoryHint: string,
    companyName: string,
    companyInformation: string,
    companyCategory: string,
    companyContactPersonName: string,
    companyContactPersonEmail: string,
    companyContactPersonEmailHint: string,
    companyAddress: string,
    companyPostalCode: string,
    companyCity: string,
    companyPhoneNumbers: string,
    companyEmail: string,
    companyWebsite: string,
    companySubmit: string,
    companySubmitSuccess: string,
    requiredFields: string
  },
  event: {
    eventInformation: string;
    phone: string;
    email: string;
    start: string;
    end: string;
    provider: string;
    priceInfo: string;
    link: string;
    registration: string;
  };
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
    ageLimit: string;
    festival: string;
    comingPremiers: string;
    premier: string;
    director: string;
    cast: string;
    noMovies: string;
    noPremiers: string;
    info: string;
    gallery: string;
    ageLimits: string;
    coming: string;
    kinoName: string;
  }
}

const strings: IStrings = new LocalizedStrings({
  en: require("./en.json"),
  fi: require("./fi.json")
});

export default strings;