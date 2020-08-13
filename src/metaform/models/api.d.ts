/**
 *
 * @export
 * @interface Attachment
 */
export interface Attachment {
    /**
     * Entity identifier
     * @type {string}
     * @memberof Attachment
     */
    id?: string;
    /**
     * Attachment's name
     * @type {string}
     * @memberof Attachment
     */
    name?: string;
    /**
     * Attachment's content type (e.g. application/pdf)
     * @type {string}
     * @memberof Attachment
     */
    contentType?: string;
}
/**
 *
 * @export
 * @interface BadRequest
 */
export interface BadRequest {
    /**
     *
     * @type {number}
     * @memberof BadRequest
     */
    code?: number;
    /**
     *
     * @type {string}
     * @memberof BadRequest
     */
    message?: string;
}
/**
 * Email notification
 * @export
 * @interface EmailNotification
 */
export interface EmailNotification {
    /**
     *
     * @type {string}
     * @memberof EmailNotification
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof EmailNotification
     */
    subjectTemplate: string;
    /**
     *
     * @type {string}
     * @memberof EmailNotification
     */
    contentTemplate: string;
    /**
     *
     * @type {Array<string>}
     * @memberof EmailNotification
     */
    emails: Array<string>;
}
/**
 *
 * @export
 * @interface ExportTheme
 */
export interface ExportTheme {
    /**
     *
     * @type {string}
     * @memberof ExportTheme
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof ExportTheme
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof ExportTheme
     */
    parentId?: string;
    /**
     *
     * @type {string}
     * @memberof ExportTheme
     */
    locales?: string;
}
/**
 *
 * @export
 * @interface ExportThemeFile
 */
export interface ExportThemeFile {
    /**
     *
     * @type {string}
     * @memberof ExportThemeFile
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof ExportThemeFile
     */
    path: string;
    /**
     *
     * @type {string}
     * @memberof ExportThemeFile
     */
    themeId: string;
    /**
     *
     * @type {string}
     * @memberof ExportThemeFile
     */
    content: string;
}
/**
 *
 * @export
 * @interface Forbidden
 */
export interface Forbidden {
    /**
     *
     * @type {number}
     * @memberof Forbidden
     */
    code?: number;
    /**
     *
     * @type {string}
     * @memberof Forbidden
     */
    message?: string;
}
/**
 *
 * @export
 * @interface InternalServerError
 */
export interface InternalServerError {
    /**
     *
     * @type {number}
     * @memberof InternalServerError
     */
    code?: number;
    /**
     *
     * @type {string}
     * @memberof InternalServerError
     */
    message?: string;
}
/**
 *
 * @export
 * @interface Metaform
 */
export interface Metaform {
    /**
     *
     * @type {string}
     * @memberof Metaform
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof Metaform
     */
    replyStrategy?: ReplyStrategyEnum;
    /**
     *
     * @type {string}
     * @memberof Metaform
     */
    exportThemeId?: string;
    /**
     * Are anonymous replies allowed or not
     * @type {boolean}
     * @memberof Metaform
     */
    allowAnonymous?: boolean;
    /**
     * Are drafts allowed or not
     * @type {boolean}
     * @memberof Metaform
     */
    allowDrafts?: boolean;
    /**
     *
     * @type {string}
     * @memberof Metaform
     */
    title?: string;
    /**
     *
     * @type {Array<MetaformSection>}
     * @memberof Metaform
     */
    sections?: Array<MetaformSection>;
    /**
     *
     * @type {MetaformScripts}
     * @memberof Metaform
     */
    scripts?: MetaformScripts;
}
/**
 * @export
 * @enum {string}
 */
export declare enum ReplyStrategyEnum {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}
/**
 *
 * @export
 * @interface MetaformField
 */
export interface MetaformField {
    /**
     *
     * @type {MetaformVisibleIf}
     * @memberof MetaformField
     */
    "visible-if"?: MetaformVisibleIf;
    /**
     *
     * @type {MetaformFieldPermissioncontexts}
     * @memberof MetaformField
     */
    permissionContexts?: MetaformFieldPermissioncontexts;
    /**
     * Field name
     * @type {string}
     * @memberof MetaformField
     */
    name?: string;
    /**
     *
     * @type {MetaformFieldType}
     * @memberof MetaformField
     */
    type: MetaformFieldType;
    /**
     *
     * @type {string}
     * @memberof MetaformField
     */
    title?: string;
    /**
     *
     * @type {boolean}
     * @memberof MetaformField
     */
    required?: boolean;
    /**
     *
     * @type {Array<string>}
     * @memberof MetaformField
     */
    contexts?: Array<string>;
    /**
     *
     * @type {MetaformFieldFlags}
     * @memberof MetaformField
     */
    flags?: MetaformFieldFlags;
    /**
     *
     * @type {string}
     * @memberof MetaformField
     */
    placeholder?: string;
    /**
     *
     * @type {string}
     * @memberof MetaformField
     */
    _class?: string;
    /**
     *
     * @type {boolean}
     * @memberof MetaformField
     */
    readonly?: boolean;
    /**
     *
     * @type {string}
     * @memberof MetaformField
     */
    help?: string;
    /**
     * a default value for a field
     * @type {string}
     * @memberof MetaformField
     */
    _default?: string;
    /**
     * Minimum value for a field. Only for number fields
     * @type {number}
     * @memberof MetaformField
     */
    min?: number;
    /**
     * Maximum value for a field. Only for number fields
     * @type {number}
     * @memberof MetaformField
     */
    max?: number;
    /**
     * Value step for a field. Only for number fields
     * @type {number}
     * @memberof MetaformField
     */
    step?: number;
    /**
     * Whether checkbox should be checked by default. Only for checkbox fields
     * @type {boolean}
     * @memberof MetaformField
     */
    checked?: boolean;
    /**
     * Defines whether field is printable or not. Only for table fields
     * @type {boolean}
     * @memberof MetaformField
     */
    printable?: boolean;
    /**
     * Options for radio, checklist, select fields
     * @type {Array<MetaformFieldOption>}
     * @memberof MetaformField
     */
    options?: Array<MetaformFieldOption>;
    /**
     * Source url for autocomplete and autocomplete-multiple fields
     * @type {string}
     * @memberof MetaformField
     */
    sourceUrl?: string;
    /**
     * Upload url for files field.
     * @type {string}
     * @memberof MetaformField
     */
    uploadUrl?: string;
    /**
     * Defines whether file fields allow multiple files or just one
     * @type {boolean}
     * @memberof MetaformField
     */
    singleFile?: boolean;
    /**
     * Defines whether file fields allow only images
     * @type {boolean}
     * @memberof MetaformField
     */
    onlyImages?: boolean;
    /**
     * Maximum upload size for image filds
     * @type {number}
     * @memberof MetaformField
     */
    maxFileSize?: number;
    /**
     * Defines whether user can add more table rows.
     * @type {boolean}
     * @memberof MetaformField
     */
    addRows?: boolean;
    /**
     * Defines whether table rows should be draggable.
     * @type {boolean}
     * @memberof MetaformField
     */
    draggable?: boolean;
    /**
     * Columns for table fields
     * @type {Array<MetaformTableColumn>}
     * @memberof MetaformField
     */
    columns?: Array<MetaformTableColumn>;
    /**
     * Url for logo field.
     * @type {string}
     * @memberof MetaformField
     */
    src?: string;
    /**
     * Text for small field.
     * @type {string}
     * @memberof MetaformField
     */
    text?: string;
    /**
     * Html code for html field.
     * @type {string}
     * @memberof MetaformField
     */
    html?: string;
}
/**
 *
 * @export
 * @interface MetaformFieldFlags
 */
export interface MetaformFieldFlags {
    /**
     * Field should be editable in management service
     * @type {boolean}
     * @memberof MetaformFieldFlags
     */
    managementEditable?: boolean;
}
/**
 * Option object for Metaform field
 * @export
 * @interface MetaformFieldOption
 */
export interface MetaformFieldOption {
    /**
     * Option name
     * @type {string}
     * @memberof MetaformFieldOption
     */
    name: string;
    /**
     * Option text
     * @type {string}
     * @memberof MetaformFieldOption
     */
    text: string;
    /**
     * Defines whether option should be checked by default.
     * @type {boolean}
     * @memberof MetaformFieldOption
     */
    checked?: boolean;
    /**
     * Defines whether option should be selected by default.
     * @type {boolean}
     * @memberof MetaformFieldOption
     */
    selected?: boolean;
}
/**
 *
 * @export
 * @interface MetaformFieldPermissioncontexts
 */
export interface MetaformFieldPermissioncontexts {
    /**
     * Field value is used as security group with view permission
     * @type {boolean}
     * @memberof MetaformFieldPermissioncontexts
     */
    viewGroup?: boolean;
    /**
     * Field value is used as security group with edit permission
     * @type {boolean}
     * @memberof MetaformFieldPermissioncontexts
     */
    editGroup?: boolean;
    /**
     * Field value is used as security group with notification permission
     * @type {boolean}
     * @memberof MetaformFieldPermissioncontexts
     */
    notifyGroup?: boolean;
}
/**
 *
 * @export
 * @enum {string}
 */
export declare enum MetaformFieldType {
    Text = "text",
    Url = "url",
    Hidden = "hidden",
    Email = "email",
    Number = "number",
    Memo = "memo",
    Boolean = "boolean",
    Radio = "radio",
    Checklist = "checklist",
    Date = "date",
    Time = "time",
    DateTime = "date-time",
    File = "file",
    Files = "files",
    Table = "table",
    Logo = "logo",
    SmallText = "small-text",
    Html = "html",
    Submit = "submit",
    Select = "select",
    Autocomplete = "autocomplete",
    AutocompleteMultiple = "autocomplete-multiple"
}
/**
 *
 * @export
 * @interface MetaformScript
 */
export interface MetaformScript {
    /**
     *
     * @type {string}
     * @memberof MetaformScript
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof MetaformScript
     */
    language: string;
    /**
     *
     * @type {string}
     * @memberof MetaformScript
     */
    content: string;
}
/**
 *
 * @export
 * @interface MetaformScripts
 */
export interface MetaformScripts {
    /**
     * List of scripts run after new reply is created
     * @type {Array<MetaformScript>}
     * @memberof MetaformScripts
     */
    afterCreateReply?: Array<MetaformScript>;
    /**
     * List of scripts run after a reply is updated
     * @type {Array<MetaformScript>}
     * @memberof MetaformScripts
     */
    afterUpdateReply?: Array<MetaformScript>;
}
/**
 *
 * @export
 * @interface MetaformSection
 */
export interface MetaformSection {
    /**
     *
     * @type {string}
     * @memberof MetaformSection
     */
    title?: string;
    /**
     *
     * @type {MetaformVisibleIf}
     * @memberof MetaformSection
     */
    "visible-if"?: MetaformVisibleIf;
    /**
     *
     * @type {Array<MetaformField>}
     * @memberof MetaformSection
     */
    fields?: Array<MetaformField>;
}
/**
 *
 * @export
 * @interface MetaformTableColumn
 */
export interface MetaformTableColumn {
    /**
     *
     * @type {MetaformTableColumnType}
     * @memberof MetaformTableColumn
     */
    type: MetaformTableColumnType;
    /**
     * Column name
     * @type {string}
     * @memberof MetaformTableColumn
     */
    name: string;
    /**
     * Column title
     * @type {string}
     * @memberof MetaformTableColumn
     */
    title?: string;
    /**
     * Defines column should automatically calculate sum
     * @type {boolean}
     * @memberof MetaformTableColumn
     */
    calculateSum?: boolean;
    /**
     * Postfix for calculated sum
     * @type {string}
     * @memberof MetaformTableColumn
     */
    sumPostfix?: string;
    /**
     * Defines column width
     * @type {number}
     * @memberof MetaformTableColumn
     */
    columnWidth?: number;
    /**
     * Placeholder for column field
     * @type {string}
     * @memberof MetaformTableColumn
     */
    placeholder?: string;
    /**
     * Defines column as readonly
     * @type {boolean}
     * @memberof MetaformTableColumn
     */
    readonly?: boolean;
    /**
     * Defines column as requires
     * @type {boolean}
     * @memberof MetaformTableColumn
     */
    required?: boolean;
    /**
     * Defines source url for autocomplete columns
     * @type {string}
     * @memberof MetaformTableColumn
     */
    sourceUrl?: string;
    /**
     * Html code for html columns
     * @type {string}
     * @memberof MetaformTableColumn
     */
    html?: string;
    /**
     * Action for button columns
     * @type {string}
     * @memberof MetaformTableColumn
     */
    action?: string;
    /**
     *
     * @type {MetaformTableColumnValues}
     * @memberof MetaformTableColumn
     */
    values?: MetaformTableColumnValues;
}
/**
 *
 * @export
 * @enum {string}
 */
export declare enum MetaformTableColumnType {
    Hidden = "hidden",
    Text = "text",
    Url = "url",
    Email = "email",
    Autocomplete = "autocomplete",
    Number = "number",
    Enum = "enum",
    Date = "date",
    Time = "time",
    Html = "html",
    Button = "button"
}
/**
 * Values for enum columns
 * @export
 * @interface MetaformTableColumnValues
 */
export interface MetaformTableColumnValues {
    /**
     *
     * @type {string}
     * @memberof MetaformTableColumnValues
     */
    value?: string;
    /**
     *
     * @type {string}
     * @memberof MetaformTableColumnValues
     */
    other?: string;
    /**
     *
     * @type {string}
     * @memberof MetaformTableColumnValues
     */
    text?: string;
}
/**
 * Rule that defines whether specified object is visible
 * @export
 * @interface MetaformVisibleIf
 */
export interface MetaformVisibleIf {
    /**
     * Field where the visible if rule is relative to
     * @type {string}
     * @memberof MetaformVisibleIf
     */
    field?: string;
    /**
     * Value must be equal to this value. If value is specified \"true\" field must have any value selected
     * @type {string}
     * @memberof MetaformVisibleIf
     */
    equals?: boolean;
    /**
     * Value must be not equal to this value.
     * @type {string}
     * @memberof MetaformVisibleIf
     */
    "not-equals"?: boolean;
    /**
     *
     * @type {Array<MetaformVisibleIf>}
     * @memberof MetaformVisibleIf
     */
    and?: Array<MetaformVisibleIf>;
    /**
     *
     * @type {Array<MetaformVisibleIf>}
     * @memberof MetaformVisibleIf
     */
    or?: Array<MetaformVisibleIf>;
}
/**
 *
 * @export
 * @interface NotFound
 */
export interface NotFound {
    /**
     *
     * @type {number}
     * @memberof NotFound
     */
    code?: number;
    /**
     *
     * @type {string}
     * @memberof NotFound
     */
    message?: string;
}
/**
 *
 * @export
 * @interface NotImplemented
 */
export interface NotImplemented {
    /**
     *
     * @type {number}
     * @memberof NotImplemented
     */
    code?: number;
    /**
     *
     * @type {string}
     * @memberof NotImplemented
     */
    message?: string;
}
/**
 *
 * @export
 * @interface Reply
 */
export interface Reply {
    /**
     *
     * @type {string}
     * @memberof Reply
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof Reply
     */
    userId?: string;
    /**
     *
     * @type {Date}
     * @memberof Reply
     */
    revision?: Date;
    /**
     *
     * @type {Date}
     * @memberof Reply
     */
    createdAt?: Date;
    /**
     *
     * @type {Date}
     * @memberof Reply
     */
    modifiedAt?: Date;
    /**
     *
     * @type {ReplyData}
     * @memberof Reply
     */
    data?: ReplyData;
}
/**
 *
 * @export
 * @interface ReplyData
 */
export interface ReplyData {
    [key: string]: any;
}
/**
 *
 * @export
 * @enum {string}
 */
export declare enum ReplyExportFormat {
    XLSX = "XLSX",
    PDF = "PDF"
}
//# sourceMappingURL=api.d.ts.map