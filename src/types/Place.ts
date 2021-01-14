export interface Place {
    /**
     * Consists of source prefix and source specific identifier. These should be URIs uniquely identifying the place, and preferably also well formed http-URLs pointing to more information about the place.
     * @type {string}
     * @memberof Place
     */
    id: string;
    /**
     * 
     * @type {PlaceName}
     * @memberof Place
     */
    name: {
        fi?: string;
        en?: string;
        sv?: string;
    };
    /**
     * 
     * @type {Array<Image>}
     * @memberof Place
     */
    originId?: string;
    /**
     * Creation time for the place entry.
     * @type {Date}
     * @memberof Place
     */
    createdTime?: Date;
    /**
     * Time this place was modified in the datastore behind the API (not necessarily in the originating system)
     * @type {Date}
     * @memberof Place
     */
    lastModifiedTime?: Date;
    /**
     * Contact email for the place, note that this is NOT multilingual
     * @type {string}
     * @memberof Place
     */
    email?: string;
    /**
     * FIXME: this seems unused in Helsinki data. Does any 6Aika city have use for describing contact type?
     * @type {string}
     * @memberof Place
     */
    contactType?: string;
    /**
     * Larger region for address (like states), not typically used in Finland
     * @type {string}
     * @memberof Place
     */
    addressRegion?: string;
    /**
     * Postal code of the location (as used by traditional mail)
     * @type {string}
     * @memberof Place
     */
    postalCode?: string;
    /**
     * PO box for traditional mail, in case mail is not delivered to the building
     * @type {string}
     * @memberof Place
     */
    postOfficeBoxNum?: string;
    /**
     * Country for the place, NOT multilingual
     * @type {string}
     * @memberof Place
     */
    addressCountry?: string;
    /**
     * This place entry is not used anymore, but old events still reference it. This might be because of duplicate removal.
     * @type {boolean}
     * @memberof Place
     */
    deleted?: boolean;
    /**
     * Identifies the source for data, this is specific to API provider. This is useful for API users, as any data quality issues are likely to be specific to data source and workarounds can be applied as such.
     * @type {string}
     * @memberof Place
     */
    dataSource?: string;
    /**
     * Organization that provided the location data
     * @type {string}
     * @memberof Place
     */
    publisher?: string;
    /**
     * 
     * @type {Place}
     * @memberof Place
     */
    replacedBy?: Place;
}
