"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform text field
 */
class MetaformDateTimeFieldComponent extends react_1.default.Component {
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
        return this.props.datetimePicker(this.props.field.name || "", this.onChange);
    }
}
exports.MetaformDateTimeFieldComponent = MetaformDateTimeFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1EYXRlVGltZUZpZWxkQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbWV0YWZvcm0tcmVhY3Qvc3JjL01ldGFmb3JtRGF0ZVRpbWVGaWVsZENvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUEwQjFCOztHQUVHO0FBQ0gsTUFBYSw4QkFBK0IsU0FBUSxlQUFLLENBQUMsU0FBdUI7SUFFL0U7Ozs7T0FJRztJQUNILFlBQVksS0FBWTtRQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFrQmY7Ozs7V0FJRztRQUNLLGFBQVEsR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQTtRQXZCQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBRVosQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Q0FXRjtBQW5DRCx3RUFtQ0MifQ==