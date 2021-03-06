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
import {
    MovieACF,
    MovieACFFromJSON,
    MovieACFFromJSONTyped,
    MovieACFToJSON,
    MovieContent,
    MovieContentFromJSON,
    MovieContentFromJSONTyped,
    MovieContentToJSON,
    MovieTitle,
    MovieTitleFromJSON,
    MovieTitleFromJSONTyped,
    MovieTitleToJSON,
} from './';

/**
 * 
 * @export
 * @interface Movie
 */
export interface Movie {
    /**
     * The date the object was published, in the site\'s timezone.
     * @type {Date}
     * @memberof Movie
     */
    date: Date;
    /**
     * The date the object was published, as GMT.
     * @type {Date}
     * @memberof Movie
     */
    date_gmt?: Date;
    /**
     * Unique identifier for the object.
     * @type {number}
     * @memberof Movie
     */
    id?: number;
    /**
     * The date the object was last modified, in the site\'s timezone.
     * @type {Date}
     * @memberof Movie
     */
    modified?: Date;
    /**
     * The date the object was last modified, as GMT.
     * @type {Date}
     * @memberof Movie
     */
    modified_gmt?: Date;
    /**
     * 
     * @type {string}
     * @memberof Movie
     */
    slug?: string;
    /**
     * A named status for the object.
     * @type {string}
     * @memberof Movie
     */
    status?: MovieStatusEnum;
    /**
     * URL to the object.
     * @type {string}
     * @memberof Movie
     */
    link?: string;
    /**
     * 
     * @type {MovieTitle}
     * @memberof Movie
     */
    title: MovieTitle;
    /**
     * 
     * @type {MovieContent}
     * @memberof Movie
     */
    content: MovieContent;
    /**
     * The ID of the featured media for the object.
     * @type {number}
     * @memberof Movie
     */
    featured_media?: number;
    /**
     * The theme file to use to display the object.
     * @type {string}
     * @memberof Movie
     */
    template?: string;
    /**
     * The terms assigned to the object in the category taxonomy.
     * @type {Array<number>}
     * @memberof Movie
     */
    categories?: Array<number>;
    /**
     * 
     * @type {string}
     * @memberof Movie
     */
    yoast_head?: string;
    /**
     * 
     * @type {MovieACF}
     * @memberof Movie
     */
    ACF: MovieACF;
}

export function MovieFromJSON(json: any): Movie {
    return MovieFromJSONTyped(json, false);
}

export function MovieFromJSONTyped(json: any, ignoreDiscriminator: boolean): Movie {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': new Date(json['date']),
        'date_gmt': !exists(json, 'date_gmt') ? undefined : new Date(json['date_gmt']),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'modified': !exists(json, 'modified') ? undefined : new Date(json['modified']),
        'modified_gmt': !exists(json, 'modified_gmt') ? undefined : new Date(json['modified_gmt']),
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'link': !exists(json, 'link') ? undefined : json['link'],
        'title': MovieTitleFromJSON(json['title']),
        'content': MovieContentFromJSON(json['content']),
        'featured_media': !exists(json, 'featured_media') ? undefined : json['featured_media'],
        'template': !exists(json, 'template') ? undefined : json['template'],
        'categories': !exists(json, 'categories') ? undefined : json['categories'],
        'yoast_head': !exists(json, 'yoast_head') ? undefined : json['yoast_head'],
        'ACF': MovieACFFromJSON(json['ACF']),
    };
}

export function MovieToJSON(value?: Movie | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'date': value.date.toISOString(),
        'date_gmt': value.date_gmt == null ? undefined : value.date_gmt.toISOString(),
        'id': value.id,
        'modified': value.modified == null ? undefined : value.modified.toISOString(),
        'modified_gmt': value.modified_gmt == null ? undefined : value.modified_gmt.toISOString(),
        'slug': value.slug,
        'status': value.status,
        'link': value.link,
        'title': MovieTitleToJSON(value.title),
        'content': MovieContentToJSON(value.content),
        'featured_media': value.featured_media,
        'template': value.template,
        'categories': value.categories,
        'yoast_head': value.yoast_head,
        'ACF': MovieACFToJSON(value.ACF),
    };
}

/**
* @export
* @enum {string}
*/
export enum MovieStatusEnum {
    Publish = 'publish',
    Future = 'future',
    Draft = 'draft',
    Pending = 'pending',
    Private = 'private'
}


