"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform text field
 */
class MetaformTextFieldComponent extends react_1.default.Component {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props) {
        super(props);
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
        return (react_1.default.createElement("input", { type: "text", placeholder: this.props.field.placeholder, id: this.props.fieldId, "aria-labelledby": this.props.fieldLabelId, name: this.props.field.name, title: this.props.field.title, required: this.props.field.required, readOnly: this.props.formReadOnly || this.props.field.readonly, value: this.props.value || "", onChange: this.onChange, onFocus: this.props.onFocus }));
    }
}
exports.MetaformTextFieldComponent = MetaformTextFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1UZXh0RmllbGRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tZXRhZm9ybS1yZWFjdC9zcmMvTWV0YWZvcm1UZXh0RmllbGRDb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBeUIxQjs7R0FFRztBQUNILE1BQWEsMEJBQTJCLFNBQVEsZUFBSyxDQUFDLFNBQXVCO0lBRTNFOzs7O09BSUc7SUFDSCxZQUFZLEtBQVk7UUFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBZ0NmOzs7O1dBSUc7UUFDSyxhQUFRLEdBQUcsQ0FBQyxLQUEwQyxFQUFFLEVBQUU7WUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUE7UUFyQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUVaLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxDQUNMLHlDQUNFLElBQUksRUFBQyxNQUFNLEVBQ1gsV0FBVyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFDMUMsRUFBRSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxxQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDekMsSUFBSSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFDNUIsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDOUIsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDcEMsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDL0QsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDOUIsUUFBUSxFQUFHLElBQUksQ0FBQyxRQUFRLEVBQ3hCLE9BQU8sRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FDNUIsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQVdGO0FBakRELGdFQWlEQyJ9