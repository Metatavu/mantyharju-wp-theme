"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform submit field
 */
class MetaformSubmitFieldComponent extends react_1.default.Component {
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
        this.onClick = (event) => {
            this.props.onClick(this.props.field);
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
        return (react_1.default.createElement("input", { type: "submit", disabled: this.props.formReadOnly || this.props.field.readonly, value: this.props.field.text, onClick: this.onClick }));
    }
}
exports.MetaformSubmitFieldComponent = MetaformSubmitFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1TdWJtaXRGaWVsZENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21ldGFmb3JtLXJlYWN0L3NyYy9NZXRhZm9ybVN1Ym1pdEZpZWxkQ29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQXVCMUI7O0dBRUc7QUFDSCxNQUFhLDRCQUE2QixTQUFRLGVBQUssQ0FBQyxTQUF1QjtJQUU3RTs7OztPQUlHO0lBQ0gsWUFBWSxLQUFZO1FBQ3RCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQXlCZjs7OztXQUlHO1FBQ0ssWUFBTyxHQUFHLENBQUMsS0FBcUQsRUFBRSxFQUFFO1lBQzFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFBO1FBOUJDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFFWixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sQ0FDTCx5Q0FDRSxJQUFJLEVBQUMsUUFBUSxFQUNiLFFBQVEsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQy9ELEtBQUssRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQzdCLE9BQU8sRUFBRyxJQUFJLENBQUMsT0FBTyxHQUNwQixDQUNMLENBQUM7SUFDSixDQUFDO0NBV0Y7QUExQ0Qsb0VBMENDIn0=