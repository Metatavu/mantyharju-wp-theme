// tslint:disable
/**
 * localhost
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SearchResult
 */
export interface SearchResult {
    /**
     * Unique identifier for the object.
     * @type {number}
     * @memberof SearchResult
     */
    id?: number;
    /**
     * The title for the object.
     * @type {string}
     * @memberof SearchResult
     */
    title?: string;
    /**
     * URL to the object.
     * @type {string}
     * @memberof SearchResult
     */
    url?: string;
    /**
     * Object type.
     * @type {string}
     * @memberof SearchResult
     */
    type?: SearchResultTypeEnum;
    /**
     * Object subtype.
     * @type {string}
     * @memberof SearchResult
     */
    subtype?: SearchResultSubtypeEnum;
}

export function SearchResultFromJSON(json: any): SearchResult {
    return SearchResultFromJSONTyped(json, false);
}

export function SearchResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'subtype': !exists(json, 'subtype') ? undefined : json['subtype'],
    };
}

export function SearchResultToJSON(value?: SearchResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'url': value.url,
        'type': value.type,
        'subtype': value.subtype,
    };
}

/**
* @export
* @enum {string}
*/
export enum SearchResultTypeEnum {
    Post = 'post'
}
/**
* @export
* @enum {string}
*/
export enum SearchResultSubtypeEnum {
    Post = 'post',
    Page = 'page'
}


