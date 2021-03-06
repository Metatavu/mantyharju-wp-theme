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
    TaxonomyVisibility,
    TaxonomyVisibilityFromJSON,
    TaxonomyVisibilityFromJSONTyped,
    TaxonomyVisibilityToJSON,
} from './';

/**
 * 
 * @export
 * @interface Taxonomy
 */
export interface Taxonomy {
    /**
     * All capabilities used by the taxonomy.
     * @type {object}
     * @memberof Taxonomy
     */
    capabilities?: object;
    /**
     * A human-readable description of the taxonomy.
     * @type {string}
     * @memberof Taxonomy
     */
    description?: string;
    /**
     * Whether or not the taxonomy should have children.
     * @type {boolean}
     * @memberof Taxonomy
     */
    hierarchical?: boolean;
    /**
     * Human-readable labels for the taxonomy for various contexts.
     * @type {object}
     * @memberof Taxonomy
     */
    labels?: object;
    /**
     * The title for the taxonomy.
     * @type {string}
     * @memberof Taxonomy
     */
    name?: string;
    /**
     * An alphanumeric identifier for the taxonomy.
     * @type {string}
     * @memberof Taxonomy
     */
    slug?: string;
    /**
     * Whether or not the term cloud should be displayed.
     * @type {boolean}
     * @memberof Taxonomy
     */
    show_cloud?: boolean;
    /**
     * Types associated with the taxonomy.
     * @type {Array<string>}
     * @memberof Taxonomy
     */
    types?: Array<string>;
    /**
     * REST base route for the taxonomy.
     * @type {string}
     * @memberof Taxonomy
     */
    rest_base?: string;
    /**
     * 
     * @type {TaxonomyVisibility}
     * @memberof Taxonomy
     */
    visibility?: TaxonomyVisibility;
}

export function TaxonomyFromJSON(json: any): Taxonomy {
    return TaxonomyFromJSONTyped(json, false);
}

export function TaxonomyFromJSONTyped(json: any, ignoreDiscriminator: boolean): Taxonomy {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'capabilities': !exists(json, 'capabilities') ? undefined : json['capabilities'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'hierarchical': !exists(json, 'hierarchical') ? undefined : json['hierarchical'],
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'show_cloud': !exists(json, 'show_cloud') ? undefined : json['show_cloud'],
        'types': !exists(json, 'types') ? undefined : json['types'],
        'rest_base': !exists(json, 'rest_base') ? undefined : json['rest_base'],
        'visibility': !exists(json, 'visibility') ? undefined : TaxonomyVisibilityFromJSON(json['visibility']),
    };
}

export function TaxonomyToJSON(value?: Taxonomy | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'capabilities': value.capabilities,
        'description': value.description,
        'hierarchical': value.hierarchical,
        'labels': value.labels,
        'name': value.name,
        'slug': value.slug,
        'show_cloud': value.show_cloud,
        'types': value.types,
        'rest_base': value.rest_base,
        'visibility': TaxonomyVisibilityToJSON(value.visibility),
    };
}


