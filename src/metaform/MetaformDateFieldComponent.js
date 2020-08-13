"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform text field
 */
class MetaformDateFieldComponent extends react_1.default.Component {
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
        this.onChange = (date) => {
            this.props.onValueChange(date.getTime());
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
        return this.props.datePicker(this.props.field.name || "", this.onChange);
    }
}
exports.MetaformDateFieldComponent = MetaformDateFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1EYXRlRmllbGRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tZXRhZm9ybS1yZWFjdC9zcmMvTWV0YWZvcm1EYXRlRmllbGRDb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBMEIxQjs7R0FFRztBQUNILE1BQWEsMEJBQTJCLFNBQVEsZUFBSyxDQUFDLFNBQXVCO0lBRTNFOzs7O09BSUc7SUFDSCxZQUFZLEtBQVk7UUFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBa0JmOzs7O1dBSUc7UUFDSyxhQUFRLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUE7UUF2QkMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUVaLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBV0Y7QUFuQ0QsZ0VBbUNDIn0=