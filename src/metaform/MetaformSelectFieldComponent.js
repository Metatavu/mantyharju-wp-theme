"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform select field
 */
class MetaformSelectFieldComponent extends react_1.default.Component {
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
            const selectedValue = event.target.value;
            if (event.target.value) {
                this.setState({
                    selectedOption: selectedValue
                });
                this.props.onValueChange(selectedValue);
            }
        };
        const options = (this.props.field.options || []);
        this.state = {
            selectedOption: options.length > 0 ? options[0].name : undefined,
        };
    }
    /**
     * Component render method
     */
    render() {
        if (!this.props.field.name) {
            return null;
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("select", { onChange: this.onChange, value: this.state.selectedOption, autoFocus: false }, (this.props.field.options || []).map((option) => react_1.default.createElement("option", Object.assign({ key: option.name, value: option.name }, option.selected = this.state.selectedOption === option.name), option.text)))));
    }
}
exports.MetaformSelectFieldComponent = MetaformSelectFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1TZWxlY3RGaWVsZENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21ldGFmb3JtLXJlYWN0L3NyYy9NZXRhZm9ybVNlbGVjdEZpZWxkQ29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQXdCMUI7O0dBRUc7QUFDSCxNQUFhLDRCQUE2QixTQUFRLGVBQUssQ0FBQyxTQUF1QjtJQUU3RTs7OztPQUlHO0lBQ0gsWUFBWSxLQUFZO1FBQ3RCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQXdCZjs7OztXQUlHO1FBQ0ssYUFBUSxHQUFHLENBQUMsS0FBMkMsRUFBRSxFQUFFO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBZSxDQUFDO1lBRW5ELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1osY0FBYyxFQUFFLGFBQWE7aUJBQzlCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN6QztRQUNILENBQUMsQ0FBQTtRQXJDQyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsY0FBYyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQ2pFLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxDQUNMO1lBQ0ksMENBQVEsUUFBUSxFQUFHLElBQUksQ0FBQyxRQUFRLEVBQUcsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFHLFNBQVMsRUFBRyxLQUFLLElBQ3BGLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsd0RBQVEsR0FBRyxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUcsS0FBSyxFQUFHLE1BQU0sQ0FBQyxJQUFJLElBQVEsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsS0FBSyxNQUFNLENBQUMsSUFBSSxHQUFLLE1BQU0sQ0FBQyxJQUFJLENBQVcsQ0FBQyxDQUMxTCxDQUNQLENBQ1AsQ0FBQztJQUNKLENBQUM7Q0FrQkY7QUFoREQsb0VBZ0RDIn0=