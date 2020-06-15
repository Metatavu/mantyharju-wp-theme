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
 * 
 * @export
 * @interface Menu
 */
export interface Menu {
    /**
     * 
     * @type {number}
     * @memberof Menu
     */
    term_id?: number;
    /**
     * 
     * @type {string}
     * @memberof Menu
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Menu
     */
    slug?: string;
    /**
     * 
     * @type {number}
     * @memberof Menu
     */
    term_group?: number;
    /**
     * 
     * @type {number}
     * @memberof Menu
     */
    term_taxonomy_id?: number;
    /**
     * 
     * @type {string}
     * @memberof Menu
     */
    taxonomy?: string;
    /**
     * 
     * @type {string}
     * @memberof Menu
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof Menu
     */
    parent?: number;
    /**
     * 
     * @type {number}
     * @memberof Menu
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof Menu
     */
    filter?: string;
}

export function MenuFromJSON(json: any): Menu {
    return MenuFromJSONTyped(json, false);
}

export function MenuFromJSONTyped(json: any, ignoreDiscriminator: boolean): Menu {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'term_id': !exists(json, 'term_id') ? undefined : json['term_id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'term_group': !exists(json, 'term_group') ? undefined : json['term_group'],
        'term_taxonomy_id': !exists(json, 'term_taxonomy_id') ? undefined : json['term_taxonomy_id'],
        'taxonomy': !exists(json, 'taxonomy') ? undefined : json['taxonomy'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'parent': !exists(json, 'parent') ? undefined : json['parent'],
        'count': !exists(json, 'count') ? undefined : json['count'],
        'filter': !exists(json, 'filter') ? undefined : json['filter'],
    };
}

export function MenuToJSON(value?: Menu | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'term_id': value.term_id,
        'name': value.name,
        'slug': value.slug,
        'term_group': value.term_group,
        'term_taxonomy_id': value.term_taxonomy_id,
        'taxonomy': value.taxonomy,
        'description': value.description,
        'parent': value.parent,
        'count': value.count,
        'filter': value.filter,
    };
}


