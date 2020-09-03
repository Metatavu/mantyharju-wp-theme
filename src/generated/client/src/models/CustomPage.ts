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
 * @interface CustomPage
 */
export interface CustomPage {
    /**
     * 
     * @type {number}
     * @memberof CustomPage
     */
    ID?: number;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_author?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_date?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_date_gmt?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_content?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_title?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_excerpt?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_status?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    comment_status?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    ping_status?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_password?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_name?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    to_ping?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    pinged?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_modified?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_modified_gmt?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_content_filtered?: string;
    /**
     * 
     * @type {number}
     * @memberof CustomPage
     */
    post_parent?: number;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    guid?: string;
    /**
     * 
     * @type {number}
     * @memberof CustomPage
     */
    menu_order?: number;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_type?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    post_mime_type?: string;
    /**
     * 
     * @type {number}
     * @memberof CustomPage
     */
    comment_count?: number;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    filter?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    featured_image_url?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomPage
     */
    link?: string;
}

export function CustomPageFromJSON(json: any): CustomPage {
    return CustomPageFromJSONTyped(json, false);
}

export function CustomPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomPage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ID': !exists(json, 'ID') ? undefined : json['ID'],
        'post_author': !exists(json, 'post_author') ? undefined : json['post_author'],
        'post_date': !exists(json, 'post_date') ? undefined : json['post_date'],
        'post_date_gmt': !exists(json, 'post_date_gmt') ? undefined : json['post_date_gmt'],
        'post_content': !exists(json, 'post_content') ? undefined : json['post_content'],
        'post_title': !exists(json, 'post_title') ? undefined : json['post_title'],
        'post_excerpt': !exists(json, 'post_excerpt') ? undefined : json['post_excerpt'],
        'post_status': !exists(json, 'post_status') ? undefined : json['post_status'],
        'comment_status': !exists(json, 'comment_status') ? undefined : json['comment_status'],
        'ping_status': !exists(json, 'ping_status') ? undefined : json['ping_status'],
        'post_password': !exists(json, 'post_password') ? undefined : json['post_password'],
        'post_name': !exists(json, 'post_name') ? undefined : json['post_name'],
        'to_ping': !exists(json, 'to_ping') ? undefined : json['to_ping'],
        'pinged': !exists(json, 'pinged') ? undefined : json['pinged'],
        'post_modified': !exists(json, 'post_modified') ? undefined : json['post_modified'],
        'post_modified_gmt': !exists(json, 'post_modified_gmt') ? undefined : json['post_modified_gmt'],
        'post_content_filtered': !exists(json, 'post_content_filtered') ? undefined : json['post_content_filtered'],
        'post_parent': !exists(json, 'post_parent') ? undefined : json['post_parent'],
        'guid': !exists(json, 'guid') ? undefined : json['guid'],
        'menu_order': !exists(json, 'menu_order') ? undefined : json['menu_order'],
        'post_type': !exists(json, 'post_type') ? undefined : json['post_type'],
        'post_mime_type': !exists(json, 'post_mime_type') ? undefined : json['post_mime_type'],
        'comment_count': !exists(json, 'comment_count') ? undefined : json['comment_count'],
        'filter': !exists(json, 'filter') ? undefined : json['filter'],
        'featured_image_url': !exists(json, 'featured_image_url') ? undefined : json['featured_image_url'],
        'link': !exists(json, 'link') ? undefined : json['link'],
    };
}

export function CustomPageToJSON(value?: CustomPage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ID': value.ID,
        'post_author': value.post_author,
        'post_date': value.post_date,
        'post_date_gmt': value.post_date_gmt,
        'post_content': value.post_content,
        'post_title': value.post_title,
        'post_excerpt': value.post_excerpt,
        'post_status': value.post_status,
        'comment_status': value.comment_status,
        'ping_status': value.ping_status,
        'post_password': value.post_password,
        'post_name': value.post_name,
        'to_ping': value.to_ping,
        'pinged': value.pinged,
        'post_modified': value.post_modified,
        'post_modified_gmt': value.post_modified_gmt,
        'post_content_filtered': value.post_content_filtered,
        'post_parent': value.post_parent,
        'guid': value.guid,
        'menu_order': value.menu_order,
        'post_type': value.post_type,
        'post_mime_type': value.post_mime_type,
        'comment_count': value.comment_count,
        'filter': value.filter,
        'featured_image_url': value.featured_image_url,
        'link': value.link,
    };
}

