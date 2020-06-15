import * as React from "react";
import BasicLayout from "../BasicLayout";
import CurrentNews from "../CurrentNews";
import HeroBanner from "../HeroBanner";
import { Post, Attachment } from "../../generated/client/src";
import ApiUtils from "../../utils/ApiUtils";
import LinkBar from "../LinkBar";
import DonateBanner from "../DonateBanner";
import SocialFeed from "../SocialFeed";
import MetaTags from "react-meta-tags";
import metatagImage from "../../resources/img/muisti-konsepti.png";

/**
 * Interface representing component properties
 */
interface Props {
  lang: string
}

/**
 * Interface representing component state
 */
interface State {
  posts: Post[],
  featuredMedias: { [ key: number ]: Attachment },
  loading: boolean
}

/**
 * WelcomePage component
 */
class WelcomePage extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
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

    const api = ApiUtils.getApi();

    const posts = await api.getWpV2Posts({lang: [ this.props.lang ]});

    const featureMediaIds: number[] = posts
      .filter((post) => {
        return post.featured_media;
      })
      .map((post) => {
        return post.featured_media;
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

    this.setState({
      posts: posts,
      featuredMedias: featuredMediaMap,
      loading: false
    });

    this.hidePageLoader();
  }

  /**
   * Component render method
   */
  public render() {
    const { lang } = this.props;

    return (
      <BasicLayout lang={ lang }>
        <HeroBanner lang={ lang } />
        <LinkBar lang={ lang } />
        <DonateBanner lang={ lang } />
        <CurrentNews lang={ lang } />
        <SocialFeed lang={ lang } />
      </BasicLayout>
    );
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
}

export default WelcomePage;