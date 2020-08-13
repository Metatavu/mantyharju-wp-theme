"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform memo field
 */
class MetaformMemoComponent extends react_1.default.Component {
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
        return (react_1.default.createElement("textarea", { placeholder: this.props.field.placeholder, id: this.props.fieldId, "aria-labelledby": this.props.fieldLabelId, name: this.props.field.name, title: this.props.field.title, required: this.props.field.required, readOnly: this.props.formReadOnly || this.props.field.readonly, value: this.props.value || "", onChange: this.onChange, onFocus: this.props.onFocus }));
    }
}
exports.MetaformMemoComponent = MetaformMemoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1NZW1vQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbWV0YWZvcm0tcmVhY3Qvc3JjL01ldGFmb3JtTWVtb0NvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUF5QjFCOztHQUVHO0FBQ0gsTUFBYSxxQkFBc0IsU0FBUSxlQUFLLENBQUMsU0FBdUI7SUFFdEU7Ozs7T0FJRztJQUNILFlBQVksS0FBWTtRQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUErQmY7Ozs7V0FJRztRQUNLLGFBQVEsR0FBRyxDQUFDLEtBQTZDLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQTtRQXBDQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBRVosQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLENBQ0wsNENBQ0UsV0FBVyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFDMUMsRUFBRSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxxQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDekMsSUFBSSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFDNUIsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDOUIsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDcEMsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDL0QsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDOUIsUUFBUSxFQUFHLElBQUksQ0FBQyxRQUFRLEVBQ3hCLE9BQU8sRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FDMUIsQ0FDTCxDQUFDO0lBQ0osQ0FBQztDQVdGO0FBaERELHNEQWdEQyJ9