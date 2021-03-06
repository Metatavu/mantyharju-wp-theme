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
 * The title for the object.
 * @export
 * @interface MovieTitle
 */
export interface MovieTitle {
    /**
     * Title for the object, as it exists in the database.
     * @type {string}
     * @memberof MovieTitle
     */
    raw?: string;
    /**
     * HTML title for the object, transformed for display.
     * @type {string}
     * @memberof MovieTitle
     */
    rendered: string;
}

export function MovieTitleFromJSON(json: any): MovieTitle {
    return MovieTitleFromJSONTyped(json, false);
}

export function MovieTitleFromJSONTyped(json: any, ignoreDiscriminator: boolean): MovieTitle {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'raw': !exists(json, 'raw') ? undefined : json['raw'],
        'rendered': json['rendered'],
    };
}

export function MovieTitleToJSON(value?: MovieTitle | null): any {
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


