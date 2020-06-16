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
    PostContent,
    PostContentFromJSON,
    PostContentFromJSONTyped,
    PostContentToJSON,
    PostExcerpt,
    PostExcerptFromJSON,
    PostExcerptFromJSONTyped,
    PostExcerptToJSON,
    PostGuid,
    PostGuidFromJSON,
    PostGuidFromJSONTyped,
    PostGuidToJSON,
    PostTitle,
    PostTitleFromJSON,
    PostTitleFromJSONTyped,
    PostTitleToJSON,
} from './';

/**
 * 
 * @export
 * @interface PostRevision
 */
export interface PostRevision {
    /**
     * The ID for the author of the object.
     * @type {number}
     * @memberof PostRevision
     */
    author?: number;
    /**
     * The date the object was published, in the site\'s timezone.
     * @type {Date}
     * @memberof PostRevision
     */
    date?: Date;
    /**
     * The date the object was published, as GMT.
     * @type {Date}
     * @memberof PostRevision
     */
    date_gmt?: Date;
    /**
     * 
     * @type {PostGuid}
     * @memberof PostRevision
     */
    guid?: PostGuid;
    /**
     * Unique identifier for the object.
     * @type {number}
     * @memberof PostRevision
     */
    id?: number;
    /**
     * The date the object was last modified, in the site\'s timezone.
     * @type {Date}
     * @memberof PostRevision
     */
    modified?: Date;
    /**
     * The date the object was last modified, as GMT.
     * @type {Date}
     * @memberof PostRevision
     */
    modified_gmt?: Date;
    /**
     * The ID for the parent of the object.
     * @type {number}
     * @memberof PostRevision
     */
    parent?: number;
    /**
     * An alphanumeric identifier for the object unique to its type.
     * @type {string}
     * @memberof PostRevision
     */
    slug?: string;
    /**
     * 
     * @type {PostTitle}
     * @memberof PostRevision
     */
    title?: PostTitle;
    /**
     * 
     * @type {PostContent}
     * @memberof PostRevision
     */
    content?: PostContent;
    /**
     * 
     * @type {PostExcerpt}
     * @memberof PostRevision
     */
    excerpt?: PostExcerpt;
    /**
     * Preview link for the post.
     * @type {string}
     * @memberof PostRevision
     */
    preview_link?: string;
}

export function PostRevisionFromJSON(json: any): PostRevision {
    return PostRevisionFromJSONTyped(json, false);
}

export function PostRevisionFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostRevision {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'author': !exists(json, 'author') ? undefined : json['author'],
        'date': !exists(json, 'date') ? undefined : new Date(json['date']),
        'date_gmt': !exists(json, 'date_gmt') ? undefined : new Date(json['date_gmt']),
        'guid': !exists(json, 'guid') ? undefined : PostGuidFromJSON(json['guid']),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'modified': !exists(json, 'modified') ? undefined : new Date(json['modified']),
        'modified_gmt': !exists(json, 'modified_gmt') ? undefined : new Date(json['modified_gmt']),
        'parent': !exists(json, 'parent') ? undefined : json['parent'],
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'title': !exists(json, 'title') ? undefined : PostTitleFromJSON(json['title']),
        'content': !exists(json, 'content') ? undefined : PostContentFromJSON(json['content']),
        'excerpt': !exists(json, 'excerpt') ? undefined : PostExcerptFromJSON(json['excerpt']),
        'preview_link': !exists(json, 'preview_link') ? undefined : json['preview_link'],
    };
}

export function PostRevisionToJSON(value?: PostRevision | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'author': value.author,
        'date': value.date == null ? undefined : value.date.toISOString(),
        'date_gmt': value.date_gmt == null ? undefined : value.date_gmt.toISOString(),
        'guid': PostGuidToJSON(value.guid),
        'id': value.id,
        'modified': value.modified == null ? undefined : value.modified.toISOString(),
        'modified_gmt': value.modified_gmt == null ? undefined : value.modified_gmt.toISOString(),
        'parent': value.parent,
        'slug': value.slug,
        'title': PostTitleToJSON(value.title),
        'content': PostContentToJSON(value.content),
        'excerpt': PostExcerptToJSON(value.excerpt),
        'preview_link': value.preview_link,
    };
}


