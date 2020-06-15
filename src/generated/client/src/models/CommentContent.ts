// tslint:disable
/**
 * localhost:1234
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
 * @interface CommentContent
 */
export interface CommentContent {
    /**
     * Content for the object, as it exists in the database.
     * @type {string}
     * @memberof CommentContent
     */
    raw?: string;
    /**
     * HTML content for the object, transformed for display.
     * @type {string}
     * @memberof CommentContent
     */
    rendered?: string;
}

export function CommentContentFromJSON(json: any): CommentContent {
    return CommentContentFromJSONTyped(json, false);
}

export function CommentContentFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommentContent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'raw': !exists(json, 'raw') ? undefined : json['raw'],
        'rendered': !exists(json, 'rendered') ? undefined : json['rendered'],
    };
}

export function CommentContentToJSON(value?: CommentContent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'raw': value.raw,
        'rendered': value.rendered,
    };
}


