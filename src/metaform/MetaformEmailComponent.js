"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform email field
 */
class MetaformEmailFieldComponent extends react_1.default.Component {
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
        return (react_1.default.createElement("input", { type: "email", placeholder: this.props.field.placeholder, id: this.props.fieldId, "aria-labelledby": this.props.fieldLabelId, name: this.props.field.name, title: this.props.field.title, required: this.props.field.required, readOnly: this.props.formReadOnly || this.props.field.readonly, value: this.props.value || "", onChange: this.onChange, onFocus: this.props.onFocus }));
    }
}
exports.MetaformEmailFieldComponent = MetaformEmailFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1FbWFpbENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21ldGFmb3JtLXJlYWN0L3NyYy9NZXRhZm9ybUVtYWlsQ29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQXdCMUI7O0dBRUc7QUFDSCxNQUFhLDJCQUE0QixTQUFRLGVBQUssQ0FBQyxTQUF1QjtJQUU1RTs7OztPQUlHO0lBQ0gsWUFBWSxLQUFZO1FBQ3RCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQWdDZjs7OztXQUlHO1FBQ0ssYUFBUSxHQUFHLENBQUMsS0FBMEMsRUFBRSxFQUFFO1lBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFBO1FBckNDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFFWixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sQ0FDTCx5Q0FDRSxJQUFJLEVBQUMsT0FBTyxFQUNaLFdBQVcsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQzFDLEVBQUUsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8scUJBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQ3pDLElBQUksRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQzVCLEtBQUssRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQzlCLFFBQVEsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQ3BDLFFBQVEsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQy9ELEtBQUssRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQzlCLFFBQVEsRUFBRyxJQUFJLENBQUMsUUFBUSxFQUN4QixPQUFPLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQzFCLENBQ0wsQ0FBQztJQUNKLENBQUM7Q0FXRjtBQWpERCxrRUFpREMifQ==