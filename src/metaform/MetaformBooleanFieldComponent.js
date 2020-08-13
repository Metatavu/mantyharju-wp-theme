"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for radio field
 */
class MetaformBooleanFieldComponent extends react_1.default.Component {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props) {
        super(props);
        /**
         * Renders field option's value
         */
        this.renderOptionValue = (option, value) => {
            const readOnly = this.props.formReadOnly || this.props.field.readonly;
            const checked = value ? true : false;
            if (readOnly) {
                if (checked) {
                    return this.props.renderIcon("check-square-o", `${this.props.fieldId}-${option.name}-icon`);
                }
                else {
                    return this.props.renderIcon("square-o", `${this.props.fieldId}-${option.name}-icon-checked`);
                }
            }
            else {
                return react_1.default.createElement("input", { key: `${this.props.fieldId}-${option.name}-input`, type: "checkbox", id: `${this.props.fieldId}-${option.name}`, "aria-labelledby": this.props.fieldLabelId, name: this.props.field.name, title: this.props.field.title, required: this.props.field.required, readOnly: this.props.formReadOnly || this.props.field.readonly, value: value, checked: checked, onChange: this.onChange, onFocus: this.props.onFocus });
            }
        };
        /**
         * Event handler for field input change
         *
         * @param event event
         */
        this.onChange = (event) => {
            this.props.onValueChange(event.target.value ? "" : "checked");
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
        const option = this.props.field;
        const value = this.props.value;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("label", { className: "metaform-boolean-field-label", key: `${this.props.fieldId}-${this.props.field.name}-label`, htmlFor: `${this.props.fieldId}-${this.props.field.name}` },
                this.renderOptionValue(option, value),
                react_1.default.createElement("span", null,
                    " ",
                    option.text,
                    "\u00A0"))));
    }
}
exports.MetaformBooleanFieldComponent = MetaformBooleanFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1Cb29sZWFuRmllbGRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tZXRhZm9ybS1yZWFjdC9zcmMvTWV0YWZvcm1Cb29sZWFuRmllbGRDb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQXlDO0FBeUJ6Qzs7R0FFRztBQUNILE1BQWEsNkJBQThCLFNBQVEsZUFBSyxDQUFDLFNBQXVCO0lBRTlFOzs7O09BSUc7SUFDSCxZQUFZLEtBQVk7UUFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBNEJmOztXQUVHO1FBQ0ssc0JBQWlCLEdBQUcsQ0FBQyxNQUFxQixFQUFFLEtBQWEsRUFBRSxFQUFFO1lBQ25FLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUN0RSxNQUFNLE9BQU8sR0FBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRTlDLElBQUksUUFBUSxFQUFFO2dCQUNaLElBQUksT0FBTyxFQUFFO29CQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQztpQkFDN0Y7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQztpQkFDL0Y7YUFDRjtpQkFBTTtnQkFDTCxPQUFPLHlDQUNMLEdBQUcsRUFBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLFFBQVEsRUFDbEQsSUFBSSxFQUFDLFVBQVUsRUFDZixFQUFFLEVBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLHFCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDekMsSUFBSSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFDNUIsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDOUIsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDcEMsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDL0QsS0FBSyxFQUFHLEtBQUssRUFDYixPQUFPLEVBQUcsT0FBTyxFQUNqQixRQUFRLEVBQUcsSUFBSSxDQUFDLFFBQVEsRUFDeEIsT0FBTyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUMxQixDQUFBO2FBQ0w7UUFDSCxDQUFDLENBQUE7UUFFRDs7OztXQUlHO1FBQ0ssYUFBUSxHQUFHLENBQUMsS0FBMEMsRUFBRSxFQUFFO1lBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQTtRQWhFQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBRVosQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQWUsQ0FBQztRQUV6QyxPQUFPLENBQ0w7WUFDRSx5Q0FBTyxTQUFTLEVBQUMsOEJBQThCLEVBQUMsR0FBRyxFQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLEVBQUcsT0FBTyxFQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNySyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkM7O29CQUFTLE1BQU0sQ0FBQyxJQUFJOzZCQUFVLENBQ3hCLENBQ0osQ0FDUCxDQUFDO0lBQ0osQ0FBQztDQTBDRjtBQTVFRCxzRUE0RUMifQ==