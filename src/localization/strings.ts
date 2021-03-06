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
    ageLimit: string;
    festival: string;
    comingPremiers: string;
    premier: string;
    director: string;
    cast: string;
    noMovies: string;
    noPremiers: string;
  }
}

const strings: IStrings = new LocalizedStrings({
  en: require("./en.json"),
  fi: require("./fi.json")
});

export default strings;