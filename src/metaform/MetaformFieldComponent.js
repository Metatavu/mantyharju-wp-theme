"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const VisibleIfEvaluator_1 = __importDefault(require("./VisibleIfEvaluator"));
const MetaformMemoComponent_1 = require("./MetaformMemoComponent");
const api_1 = require("./models/api");
const MetaformTextFieldComponent_1 = require("./MetaformTextFieldComponent");
const MetaformRadioFieldComponent_1 = require("./MetaformRadioFieldComponent");
const MetaformSubmitFieldComponent_1 = require("./MetaformSubmitFieldComponent");
const MetaformSelectFieldComponent_1 = require("./MetaformSelectFieldComponent");
const MetaformBooleanFieldComponent_1 = require("./MetaformBooleanFieldComponent");
const MetaformHtmlComponent_1 = require("./MetaformHtmlComponent");
const MetaformEmailComponent_1 = require("./MetaformEmailComponent");
const MetaformUrlField_1 = require("./MetaformUrlField");
const MetaformAutocompleteField_1 = require("./MetaformAutocompleteField");
const MetaformHiddenFieldComponent_1 = require("./MetaformHiddenFieldComponent");
const MetaformFilesFieldComponent_1 = require("./MetaformFilesFieldComponent");
const MetaformDateFieldComponent_1 = require("./MetaformDateFieldComponent");
const MetaformDateTimeFieldComponent_1 = require("./MetaformDateTimeFieldComponent");
/**
 * Component for metaform field
 */
class MetaformFieldComponent extends react_1.default.Component {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props) {
        super(props);
        /**
         * Renders field title
         */
        this.renderTitle = () => {
            if (!this.props.field.title) {
                return null;
            }
            const title = `${this.props.field.title}` + (this.props.field.required ? " *" : "");
            return (react_1.default.createElement("div", { className: "metaform-field-label-container" },
                react_1.default.createElement("label", { className: "metaform-field-label" },
                    " ",
                    title,
                    "\u00A0")));
        };
        /**
         * Renders field's input
         */
        this.renderInput = () => {
            switch (this.props.field.type) {
                case api_1.MetaformFieldType.Text:
                    return react_1.default.createElement(MetaformTextFieldComponent_1.MetaformTextFieldComponent, { formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus, getFieldValue: this.getFieldValue });
                case api_1.MetaformFieldType.Memo:
                    return react_1.default.createElement(MetaformMemoComponent_1.MetaformMemoComponent, { formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus, getFieldValue: this.getFieldValue });
                case api_1.MetaformFieldType.Radio:
                    return react_1.default.createElement(MetaformRadioFieldComponent_1.MetaformRadioFieldComponent, { renderIcon: this.props.renderIcon, formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus });
                case api_1.MetaformFieldType.Select:
                    return react_1.default.createElement(MetaformSelectFieldComponent_1.MetaformSelectFieldComponent, { formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus });
                case api_1.MetaformFieldType.Submit:
                    return react_1.default.createElement(MetaformSubmitFieldComponent_1.MetaformSubmitFieldComponent, { formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onClick: this.props.onSubmit, value: this.getFieldValue() });
                case api_1.MetaformFieldType.Boolean:
                    return react_1.default.createElement(MetaformBooleanFieldComponent_1.MetaformBooleanFieldComponent, { renderIcon: this.props.renderIcon, formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus });
                case api_1.MetaformFieldType.Html:
                    return react_1.default.createElement(MetaformHtmlComponent_1.MetaformHtmlComponent, { fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, getFieldValue: this.getFieldValue });
                case api_1.MetaformFieldType.Email:
                    return react_1.default.createElement(MetaformEmailComponent_1.MetaformEmailFieldComponent, { formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus });
                case api_1.MetaformFieldType.Url:
                    return react_1.default.createElement(MetaformUrlField_1.MetaformUrlFieldComponent, { formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus });
                case api_1.MetaformFieldType.Autocomplete:
                    return react_1.default.createElement(MetaformAutocompleteField_1.MetaformAutocompleteFieldComponent, { setAutocompleteOptions: this.props.setAutocompleteOptions, formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus });
                case api_1.MetaformFieldType.Hidden:
                    return react_1.default.createElement(MetaformHiddenFieldComponent_1.MetaformHiddenFieldComponent, { formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus });
                case api_1.MetaformFieldType.Files:
                    return react_1.default.createElement(MetaformFilesFieldComponent_1.MetaformFilesFieldComponent, { formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onFileUpload: this.onFileUpload, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus });
                case api_1.MetaformFieldType.Date:
                    return react_1.default.createElement(MetaformDateFieldComponent_1.MetaformDateFieldComponent, { datePicker: this.props.datePicker, formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus, getFieldValue: this.getFieldValue });
                case api_1.MetaformFieldType.DateTime:
                    return react_1.default.createElement(MetaformDateTimeFieldComponent_1.MetaformDateTimeFieldComponent, { datetimePicker: this.props.datetimePicker, formReadOnly: this.props.formReadOnly, fieldLabelId: this.getFieldLabelId(), fieldId: this.getFieldId(), field: this.props.field, onValueChange: this.onValueChange, value: this.getFieldValue(), onFocus: this.onFocus, getFieldValue: this.getFieldValue });
                default:
                    return react_1.default.createElement("div", { style: { color: "red" } },
                        " Unknown field type ",
                        this.props.field.type,
                        "\u00A0");
            }
        };
        /**
         * Renders field help
         */
        this.renderHelp = () => {
            if (!this.props.field.help) {
                return null;
            }
            return (react_1.default.createElement("div", { className: "metaform-field-help-container" },
                react_1.default.createElement("small", { className: "metaform-field-help" },
                    " ",
                    this.props.field.help,
                    "\u00A0")));
        };
        /**
         * Returns field's id
         */
        this.getFieldId = () => {
            return `${this.props.metaformId}-field-${this.props.field.name}`;
        };
        /**
         * Returns field label's id
         */
        this.getFieldLabelId = () => {
            return `${this.getFieldId()}-label`;
        };
        /**
         * Returns field's value
         *
         * @returns field's value
         */
        this.getFieldValue = () => {
            if (!this.props.field.name) {
                return null;
            }
            return this.props.getFieldValue(this.props.field.name);
        };
        /**
         * Event handler for field value change
         */
        this.onValueChange = (value) => {
            if (!this.props.field.name) {
                return null;
            }
            this.props.setFieldValue(this.props.field.name, value);
        };
        /**
         * Event handler for file upload
         *
         * @param files file list
         * @param path string
         * @param maxFileSize number
         * @param uploadSingle boolean
         */
        this.onFileUpload = (fieldName, files, path, maxFileSize, uploadSingle) => {
            if (uploadSingle) {
                const file = files[0];
                if (maxFileSize && file.size > maxFileSize) {
                    throw new Error(`Couldn't upload the file because it exceeded the maximum file size of ${maxFileSize}`);
                }
                return this.props.uploadFile(fieldName, file, path);
            }
            else {
                for (let i = 0; i < files.length; i++) {
                    if (maxFileSize && files[i].size > maxFileSize) {
                        throw new Error(`Couldn't upload the files because one of them exceeded the maximum file size of ${maxFileSize}`);
                    }
                }
                this.props.uploadFile(fieldName, files, path);
            }
        };
        /**
         * Event handler for field value change
         */
        this.onFocus = () => {
            this.setState({
                pristine: false
            });
        };
        this.state = {
            pristine: true
        };
    }
    /**
     * Component render method
     */
    render() {
        if (!VisibleIfEvaluator_1.default.isVisible(this.props.field["visible-if"], this.props.getFieldValue)) {
            return null;
        }
        const classNames = ["metaform-field"];
        if (this.state.pristine) {
            classNames.push("pristine");
        }
        return (react_1.default.createElement("div", { className: classNames.join(" "), key: this.getFieldId() },
            this.renderTitle(),
            this.renderInput(),
            this.renderHelp()));
    }
}
exports.MetaformFieldComponent = MetaformFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1GaWVsZENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21ldGFmb3JtLXJlYWN0L3NyYy9NZXRhZm9ybUZpZWxkQ29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUF5QztBQUV6Qyw4RUFBdUQ7QUFDdkQsbUVBQWdFO0FBQ2hFLHNDQUFnRTtBQUNoRSw2RUFBMEU7QUFDMUUsK0VBQTRFO0FBQzVFLGlGQUE4RTtBQUM5RSxpRkFBOEU7QUFDOUUsbUZBQWdGO0FBQ2hGLG1FQUFnRTtBQUNoRSxxRUFBdUU7QUFDdkUseURBQStEO0FBQy9ELDJFQUFpRjtBQUNqRixpRkFBOEU7QUFDOUUsK0VBQTRFO0FBQzVFLDZFQUEwRTtBQUMxRSxxRkFBa0Y7QUEwQmxGOztHQUVHO0FBQ0gsTUFBYSxzQkFBdUIsU0FBUSxlQUFLLENBQUMsU0FBdUI7SUFFdkU7Ozs7T0FJRztJQUNILFlBQVksS0FBWTtRQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUE4QmY7O1dBRUc7UUFDSyxnQkFBVyxHQUFHLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVwRixPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFDLGdDQUFnQztnQkFDN0MseUNBQU8sU0FBUyxFQUFDLHNCQUFzQjs7b0JBQUksS0FBSzs2QkFBVyxDQUN2RCxDQUNQLENBQUE7UUFDSCxDQUFDLENBQUE7UUFF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