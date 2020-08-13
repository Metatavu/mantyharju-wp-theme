"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for radio field
 */
class MetaformRadioFieldComponent extends react_1.default.Component {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props) {
        super(props);
        /**
         * Renders field option's label
         */
        this.renderOption = (option, value) => {
            return (react_1.default.createElement("label", { className: "metaform-radio-field-label", key: `${this.props.fieldId}-${option.name}-label`, htmlFor: `${this.props.fieldId}-${option.name}` },
                this.renderOptionValue(option, value),
                react_1.default.createElement("span", null,
                    " ",
                    option.text,
                    "\u00A0")));
        };
        /**
         * Renders field option's value
         */
        this.renderOptionValue = (option, value) => {
            const readOnly = this.props.formReadOnly || this.props.field.readonly;
            const checked = ((value && value === option.name) || (!value && option.checked)) || false;
            if (readOnly) {
                if (checked) {
                    return this.props.renderIcon("dot-circle-o", `${this.props.fieldId}-${option.name}-icon`);
                }
                else {
                    return this.props.renderIcon("circle-o", `${this.props.fieldId}-${option.name}-icon-checked`);
                }
            }
            else {
                return react_1.default.createElement("input", { key: `${this.props.fieldId}-${option.name}-input`, type: "radio", id: `${this.props.fieldId}-${option.name}`, "aria-labelledby": this.props.fieldLabelId, name: this.props.field.name, title: this.props.field.title, required: this.props.field.required, readOnly: this.props.formReadOnly || this.props.field.readonly, value: option.name, checked: checked, onChange: this.onChange, onFocus: this.props.onFocus });
            }
        };
        /**
         * Event handler for field input change
         *
         * @param event event
         */
        this.onChange = (event) => {
            this.props.onValueChange(event.target.value);
        };
        this.state = {};
    }
    /**
     * Component render method
     */
    render() {
        if (!this.props.field.name) {
            return null;
        }
        const options = this.props.field.options || [];
        const value = this.props.value;
        return (react_1.default.createElement("div", null, options.map((option, i) => {
            return (react_1.default.createElement("div", { key: `${this.props.fieldId}-${option.name}-container` }, this.renderOption(option, value)));
        })));
    }
}
exports.MetaformRadioFieldComponent = MetaformRadioFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1SYWRpb0ZpZWxkQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbWV0YWZvcm0tcmVhY3Qvc3JjL01ldGFmb3JtUmFkaW9GaWVsZENvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBeUM7QUF5QnpDOztHQUVHO0FBQ0gsTUFBYSwyQkFBNEIsU0FBUSxlQUFLLENBQUMsU0FBdUI7SUFFNUU7Ozs7T0FJRztJQUNILFlBQVksS0FBWTtRQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFrQ2Y7O1dBRUc7UUFDSyxpQkFBWSxHQUFHLENBQUMsTUFBMkIsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUNwRSxPQUFPLENBQ0wseUNBQU8sU0FBUyxFQUFDLDRCQUE0QixFQUFDLEdBQUcsRUFBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLFFBQVEsRUFBRyxPQUFPLEVBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUMvSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkM7O29CQUFTLE1BQU0sQ0FBQyxJQUFJOzZCQUFVLENBQ3hCLENBQ1QsQ0FBQztRQUNKLENBQUMsQ0FBQTtRQUVEOztXQUVHO1FBQ0ssc0JBQWlCLEdBQUcsQ0FBQyxNQUEyQixFQUFFLEtBQWEsRUFBRSxFQUFFO1lBQ3pFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUN0RSxNQUFNLE9BQU8sR0FBWSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxN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