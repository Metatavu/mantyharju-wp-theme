import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";
import { CssBaseline, responsiveFontSizes } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import mantyharjuTheme from "../styles/theme";
import * as qs from "query-string";
import strings from "../localization/strings";

/**
 * Interface representing component properties
 */
interface Props {
}

/**
 * Interface representing component state
 */
interface State {
}

/**
 * Material UI's automated responsive font sizes
 */
const theme = responsiveFontSizes(mantyharjuTheme);

/**
 * App component
 */
class App extends React.Component<Props, State> {

  /**
   * Component render method
   */
  public render() {
    const queryParams = qs.parse(location.search);
    const language = (queryParams.lang || "fi") as string;
    strings.setLanguage(language);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="App">
            <Route
              path="/"
              exact={ true }
              render={ (props) => (
                <WelcomePage
                  lang={language}
                />
              )}
            />
            <Route
              path="/:pages/:page/:pages"
              render={ (props) => (
                <PostPage
                  lang={ language }
                  slug={ this.pathToSlug(props.location.pathname) }
                  mainPageSlug={ this.pathToTitle(props.location.pathname) }
                  locationPath={ props.location.pathname }
                />
              )}
            />
            <Route
              path="/sivut/:page"
              exact={ true }
              render={ (props) => (
                <PostsPage
                  lang={ language }
                  slug={ this.pathToSlug(props.location.pathname) }
                  mainPageSlug={ this.pathToTitle(props.location.pathname) }
                  locationKey={ props.location.key }
                />
              )}
            />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  /**
   * Takes in a path and returns the last location
   * 
   * @param path path as string
   */
  private pathToSlug = (path?: string) => {
    if (path) {
      const lastPart = path.match(/\/[^/]+\/?$/g);
      if (lastPart) {
        const slashesStripped = lastPart[0].replace(/\//g, "");
        return slashesStripped;
      }
    }
    return "";
  }

  /**
   * Takes in path and returns the first location
   */
  private pathToTitle = (path?: string) => {
    if (path) {
      const firstPart = path.match(/^\/[^/]+\//g);
      if (firstPart) {
        const slashesStripped = firstPart[0].replace(/\//g, "");
        return slashesStripped;
      }
    }
    return "";
  }
}

export default App;