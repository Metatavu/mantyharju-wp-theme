"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @export
 * @enum {string}
 */
var ReplyStrategyEnum;
(function (ReplyStrategyEnum) {
    ReplyStrategyEnum["PUBLIC"] = "PUBLIC";
    ReplyStrategyEnum["PRIVATE"] = "PRIVATE";
})(ReplyStrategyEnum = exports.ReplyStrategyEnum || (exports.ReplyStrategyEnum = {}));
/**
 *
 * @export
 * @enum {string}
 */
var MetaformFieldType;
(function (MetaformFieldType) {
    MetaformFieldType["Text"] = "text";
    MetaformFieldType["Url"] = "url";
    MetaformFieldType["Hidden"] = "hidden";
    MetaformFieldType["Email"] = "email";
    MetaformFieldType["Number"] = "number";
    MetaformFieldType["Memo"] = "memo";
    MetaformFieldType["Boolean"] = "boolean";
    MetaformFieldType["Radio"] = "radio";
    MetaformFieldType["Checklist"] = "checklist";
    MetaformFieldType["Date"] = "date";
    MetaformFieldType["Time"] = "time";
    MetaformFieldType["DateTime"] = "date-time";
    MetaformFieldType["File"] = "file";
    MetaformFieldType["Files"] = "files";
    MetaformFieldType["Table"] = "table";
    MetaformFieldType["Logo"] = "logo";
    MetaformFieldType["SmallText"] = "small-text";
    MetaformFieldType["Html"] = "html";
    MetaformFieldType["Submit"] = "submit";
    MetaformFieldType["Select"] = "select";
    MetaformFieldType["Autocomplete"] = "autocomplete";
    MetaformFieldType["AutocompleteMultiple"] = "autocomplete-multiple";
})(MetaformFieldType = exports.MetaformFieldType || (exports.MetaformFieldType = {}));
/**
 *
 * @export
 * @enum {string}
 */
var MetaformTableColumnType;
(function (MetaformTableColumnType) {
    MetaformTableColumnType["Hidden"] = "hidden";
    MetaformTableColumnType["Text"] = "text";
    MetaformTableColumnType["Url"] = "url";
    MetaformTableColumnType["Email"] = "email";
    MetaformTableColumnType["Autocomplete"] = "autocomplete";
    MetaformTableColumnType["Number"] = "number";
    MetaformTableColumnType["Enum"] = "enum";
    MetaformTableColumnType["Date"] = "date";
    MetaformTableColumnType["Time"] = "time";
    MetaformTableColumnType["Html"] = "html";
    MetaformTableColumnType["Button"] = "button";
})(MetaformTableColumnType = exports.MetaformTableColumnType || (exports.MetaformTableColumnType = {}));
/**
 *
 * @export
 * @enum {string}
 */
var ReplyExportFormat;
(function (ReplyExportFormat) {
    ReplyExportFormat["XLSX"] = "XLSX";
    ReplyExportFormat["PDF"] = "PDF";
})(ReplyExportFormat = exports.ReplyExportFormat || (exports.ReplyExportFormat = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbWV0YWZvcm0tcmVhY3Qvc3JjL21vZGVscy9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUE2T0E7OztHQUdHO0FBQ0gsSUFBWSxpQkFHWDtBQUhELFdBQVksaUJBQWlCO0lBQ3pCLHNDQUFpQixDQUFBO0lBQ2pCLHdDQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFIVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUc1QjtBQXNRRDs7OztHQUlHO0FBQ0gsSUFBWSxpQkF1Qlg7QUF2QkQsV0FBWSxpQkFBaUI7SUFDekIsa0NBQWEsQ0FBQTtJQUNiLGdDQUFXLENBQUE7SUFDWCxzQ0FBaUIsQ0FBQTtJQUNqQixvQ0FBZSxDQUFBO0lBQ2Ysc0NBQWlCLENBQUE7SUFDakIsa0NBQWEsQ0FBQTtJQUNiLHdDQUFtQixDQUFBO0lBQ25CLG9DQUFlLENBQUE7SUFDZiw0Q0FBdUIsQ0FBQTtJQUN2QixrQ0FBYSxDQUFBO0lBQ2Isa0NBQWEsQ0FBQTtJQUNiLDJDQUFzQixDQUFBO0lBQ3RCLGtDQUFhLENBQUE7SUFDYixvQ0FBZSxDQUFBO0lBQ2Ysb0NBQWUsQ0FBQTtJQUNmLGtDQUFhLENBQUE7SUFDYiw2Q0FBd0IsQ0FBQTtJQUN4QixrQ0FBYSxDQUFBO0lBQ2Isc0NBQWlCLENBQUE7SUFDakIsc0NBQWlCLENBQUE7SUFDakIsa0RBQTZCLENBQUE7SUFDN0IsbUVBQTZDLENBQUE7QUFDakQsQ0FBQyxFQXZCVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQXVCNUI7QUFnS0Q7Ozs7R0FJRztBQUNILElBQVksdUJBWVg7QUFaRCxXQUFZLHVCQUF1QjtJQUMvQiw0Q0FBaUIsQ0FBQTtJQUNqQix3Q0FBYSxDQUFBO0lBQ2Isc0NBQVcsQ0FBQTtJQUNYLDBDQUFlLENBQUE7SUFDZix3REFBNkIsQ0FBQTtJQUM3Qiw0Q0FBaUIsQ0FBQTtJQUNqQix3Q0FBYSxDQUFBO0lBQ2Isd0NBQWEsQ0FBQTtJQUNiLHdDQUFhLENBQUE7SUFDYix3Q0FBYSxDQUFBO0lBQ2IsNENBQWlCLENBQUE7QUFDckIsQ0FBQyxFQVpXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBWWxDO0FBZ0tEOzs7O0dBSUc7QUFDSCxJQUFZLGlCQUdYO0FBSEQsV0FBWSxpQkFBaUI7SUFDekIsa0NBQWEsQ0FBQTtJQUNiLGdDQUFXLENBQUE7QUFDZixDQUFDLEVBSFcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFHNUIifQ==