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
 * @interface InlineObject17
 */
export interface InlineObject17 {
    /**
     * Login name for the user.
     * @type {string}
     * @memberof InlineObject17
     */
    username?: string;
    /**
     * Display name for the user.
     * @type {string}
     * @memberof InlineObject17
     */
    name?: string;
    /**
     * First name for the user.
     * @type {string}
     * @memberof InlineObject17
     */
    first_name?: string;
    /**
     * Last name for the user.
     * @type {string}
     * @memberof InlineObject17
     */
    last_name?: string;
    /**
     * The email address for the user.
     * @type {string}
     * @memberof InlineObject17
     */
    email?: string;
    /**
     * URL of the user.
     * @type {string}
     * @memberof InlineObject17
     */
    url?: string;
    /**
     * Description of the user.
     * @type {string}
     * @memberof InlineObject17
     */
    description?: string;
    /**
     * Locale for the user.
     * @type {string}
     * @memberof InlineObject17
     */
    locale?: InlineObject17LocaleEnum;
    /**
     * The nickname for the user.
     * @type {string}
     * @memberof InlineObject17
     */
    nickname?: string;
    /**
     * An alphanumeric identifier for the user.
     * @type {string}
     * @memberof InlineObject17
     */
    slug?: string;
    /**
     * Roles assigned to the user.
     * @type {string}
     * @memberof InlineObject17
     */
    roles?: string;
    /**
     * Password for the user (never included).
     * @type {string}
     * @memberof InlineObject17
     */
    password?: string;
    /**
     * Meta fields.
     * @type {string}
     * @memberof InlineObject17
     */
    meta?: string;
}

export function InlineObject17FromJSON(json: any): InlineObject17 {
    return InlineObject17FromJSONTyped(json, false);
}

export function InlineObject17FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject17 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': !exists(json, 'username') ? undefined : json['username'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'first_name': !exists(json, 'first_name') ? undefined : json['first_name'],
        'last_name': !exists(json, 'last_name') ? undefined : json['last_name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'locale': !exists(json, 'locale') ? undefined : json['locale'],
        'nickname': !exists(json, 'nickname') ? undefined : json['nickname'],
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'roles': !exists(json, 'roles') ? undefined : json['roles'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
    };
}

export function InlineObject17ToJSON(value?: InlineObject17 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'name': value.name,
        'first_name': value.first_name,
        'last_name': value.last_name,
        'email': value.email,
        'url': value.url,
        'description': value.description,
        'locale': value.locale,
        'nickname': value.nickname,
        'slug': value.slug,
        'roles': value.roles,
        'password': value.password,
        'meta': value.meta,
    };
}

/**
* @export
* @enum {string}
*/
export enum InlineObject17LocaleEnum {
    Empty = '',
    EnUS = 'en_US'
}


