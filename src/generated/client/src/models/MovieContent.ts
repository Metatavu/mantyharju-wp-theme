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
 * The content for the object.
 * @export
 * @interface MovieContent
 */
export interface MovieContent {
    /**
     * Content for the object, as it exists in the database.
     * @type {string}
     * @memberof MovieContent
     */
    raw?: string;
    /**
     * HTML content for the object, transformed for display.
     * @type {string}
     * @memberof MovieContent
     */
    rendered: string;
    /**
     * Version of the content block format used by the object.
     * @type {number}
     * @memberof MovieContent
     */
    block_version?: number;
    /**
     * Whether the content is protected with a password.
     * @type {boolean}
     * @memberof MovieContent
     */
    _protected?: boolean;
}

export function MovieContentFromJSON(json: any): MovieContent {
    return MovieContentFromJSONTyped(json, false);
}

export function MovieContentFromJSONTyped(json: any, ignoreDiscriminator: boolean): MovieContent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'raw': !exists(json, 'raw') ? undefined : json['raw'],
        'rendered': json['rendered'],
        'block_version': !exists(json, 'block_version') ? undefined : json['block_version'],
        '_protected': !exists(json, 'protected') ? undefined : json['protected'],
    };
}

export function MovieContentToJSON(value?: MovieContent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'raw': value.raw,
        'rendered': value.rendered,
        'block_version': value.block_version,
        'protected': value._protected,
    };
}


