"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MetaformFieldComponent_1 = require("./MetaformFieldComponent");
const VisibleIfEvaluator_1 = __importDefault(require("./VisibleIfEvaluator"));
/**
 * Component for metaform section
 */
class MetaformSectionComponent extends react_1.default.Component {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props) {
        super(props);
        this.renderTitle = () => {
            if (!this.props.section.title) {
                return null;
            }
            return react_1.default.createElement("h2", null,
                " ",
                this.props.section.title,
                "\u00A0");
        };
        this.renderFields = () => {
            return (react_1.default.createElement("fieldset", null, (this.props.section.fields || []).map((field, i) => {
                return react_1.default.createElement(MetaformFieldComponent_1.MetaformFieldComponent, { key: `${this.props.metaformId}-${this.props.sectionId}-field-${i}`, datePicker: this.props.datePicker, datetimePicker: this.props.datetimePicker, setAutocompleteOptions: this.props.setAutocompleteOptions, uploadFile: this.props.uploadFile, renderIcon: this.props.renderIcon, getFieldValue: this.props.getFieldValue, setFieldValue: this.props.setFieldValue, formReadOnly: this.props.formReadOnly, field: field, metaformId: this.props.metaformId, onSubmit: this.props.onSubmit });
            })));
        };
        this.state = {};
    }
    /**
     * Component render method
     */
    render() {
        if (!VisibleIfEvaluator_1.default.isVisible(this.props.section["visible-if"], this.props.getFieldValue)) {
            return null;
        }
        return (react_1.default.createElement("section", { className: "metaform-section" },
            this.renderTitle(),
            this.renderFields()));
    }
}
exports.MetaformSectionComponent = MetaformSectionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1TZWN0aW9uQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbWV0YWZvcm0tcmVhY3Qvc3JjL01ldGFmb3JtU2VjdGlvbkNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBeUM7QUFFekMscUVBQWtFO0FBRWxFLDhFQUF1RDtBQTJCdkQ7O0dBRUc7QUFDSCxNQUFhLHdCQUF5QixTQUFRLGVBQUssQ0FBQyxTQUF1QjtJQUV6RTs7OztPQUlHO0lBQ0gsWUFBWSxLQUFZO1FBQ3RCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQXVCUCxnQkFBVyxHQUFHLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUM3QixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsT0FBTzs7Z0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSzt5QkFBUSxDQUFDO1FBQ2pELENBQUMsQ0FBQTtRQUVPLGlCQUFZLEdBQUcsR0FBRyxFQUFFO1lBQzFCLE9BQU8sQ0FDTCxnREFFSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELE9BQU8sOEJBQUMsK0NBQXNCLElBQUMsR0FBRyxFQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLFVBQVUsQ0FBQyxFQUFFLEVBQUcsVUFBVSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFHLGNBQWMsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRyxzQkFBc0IsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFHLFVBQVUsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRyxVQUFVLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUcsYUFBYSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFHLGFBQWEsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRyxZQUFZLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUcsS0FBSyxFQUFHLEtBQUssRUFBRyxVQUFVLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUcsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFJLENBQUE7WUFDdGhCLENBQUMsQ0FBQyxDQUVLLENBQ1osQ0FBQztRQUNKLENBQUMsQ0FBQTtRQXZDQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBRVosQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxJQUFJLENBQUMsNEJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDOUYsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sQ0FDTCwyQ0FBUyxTQUFTLEVBQUMsa0JBQWtCO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUNiLENBQ1gsQ0FBQztJQUNKLENBQUM7Q0FzQkY7QUFuREQsNERBbURDIn0=