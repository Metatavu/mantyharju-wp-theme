import { DefaultApi, Configuration, MenuLocationData, CustomPage, Page } from "../generated/client/src";

const path = window.location;

const API_BASE_PATH = `${path.protocol}//${path.hostname}:${path.port}/wp-json`;

/**
 * Utility class for loading api with predefined configuration
 */
export default class ApiUtils {

  public static getApi() {
    return new DefaultApi(new Configuration({basePath: API_BASE_PATH}));
  }

  public static async cachedGetMenusV1LocationsById(api: DefaultApi, lang: string, id: string): Promise<MenuLocationData> {
    const storageKey = `menusV1LocationsById${id}-${lang}`;
    if (window.sessionStorage && window.sessionStorage.getItem(storageKey)) {
      return JSON.parse(window.sessionStorage.getItem(storageKey) as string);
    }
    const res = await api.getMenusV1LocationsById({lang, id});
    if (res) {
      ApiUtils.cacheData(storageKey, res);
    }
    return res;
  }

  public static async cachedGetCustomPages(api: DefaultApi, parent_slug: string): Promise<CustomPage[]> {
    const storageKey = `customPages-${parent_slug}`;
    if (window.sessionStorage && window.sessionStorage.getItem(storageKey)) {
      return JSON.parse(window.sessionStorage.getItem(storageKey) as string);
    }
    const res = await api.getCustomPages({ parent_slug });
    if (res && res.length > 0) {
      ApiUtils.cacheData(storageKey, res);
    }
    return res;
  }

  public static async cachedGetWpV2Pages(api: DefaultApi, slug: string): Promise<Page[]> {
    const storageKey = `wpV2Pages-${slug}`;
    if (window.sessionStorage && window.sessionStorage.getItem(storageKey)) {
      return JSON.parse(window.sessionStorage.getItem(storageKey) as string);
    }
    const res = await api.getWpV2Pages({ slug: [ slug ] })
    if (res && res.length > 0) {
      ApiUtils.cacheData(storageKey, res);
    }
    return res;
  }

  private static cacheData(key: string, data: any) {
    if (window.sessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(data));
    }
  }

}