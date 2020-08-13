"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MetaformSectionComponent_1 = require("./MetaformSectionComponent");
/**
 * Component for metaform
 */
class MetaformComponent extends react_1.default.Component {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props) {
        super(props);
        this.renderTitle = () => {
            if (!this.props.form.title) {
                return null;
            }
            return (react_1.default.createElement("h1", null,
                " ",
                this.props.form.title,
                "\u00A0"));
        };
        /**
         * Returns unique id
         *
         * @returns unique id
         */
        this.getUniqueId = () => {
            return Math.random().toString(36).substr(2);
        };
        this.state = {
            metaformId: "metaform-" + (this.props.form.id ? `${this.props.form.id}-` : "") + this.getUniqueId()
        };
    }
    /**
     * Component render method
     */
    render() {
        const sections = this.props.form.sections || [];
        return (react_1.default.createElement("div", { className: "metaform" },
            this.renderTitle(),
            sections.map((section, i) => {
                const sectionId = `section-${i}`;
                return (react_1.default.createElement(MetaformSectionComponent_1.MetaformSectionComponent, { key: `${this.state.metaformId}-${sectionId}`, datePicker: this.props.datePicker, datetimePicker: this.props.datetimePicker, setAutocompleteOptions: this.props.setAutocompleteOptions, uploadFile: this.props.uploadFile, renderIcon: this.props.renderIcon, getFieldValue: this.props.getFieldValue, setFieldValue: this.props.setFieldValue, metaformId: this.state.metaformId, sectionId: sectionId, formReadOnly: this.props.formReadOnly, section: section, onSubmit: this.props.onSubmit }));
            })));
    }
}
exports.MetaformComponent = MetaformComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tZXRhZm9ybS1yZWFjdC9zcmMvTWV0YWZvcm1Db21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQXlDO0FBRXpDLHlFQUFzRTtBQTBCdEU7O0dBRUc7QUFDSCxNQUFhLGlCQUFrQixTQUFRLGVBQUssQ0FBQyxTQUF1QjtJQUVsRTs7OztPQUlHO0lBQ0gsWUFBWSxLQUFZO1FBQ3RCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQTRCUCxnQkFBVyxHQUFHLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMxQixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsT0FBTyxDQUNMOztnQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO3lCQUFRLENBQ3JDLENBQUM7UUFDSixDQUFDLENBQUE7UUFFRDs7OztXQUlHO1FBQ0ssZ0JBQVcsR0FBRyxHQUFHLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUE7UUEzQ0MsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLFVBQVUsRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7U0FDbkcsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBRWhELE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUMsVUFBVTtZQUVyQixJQUFJLENBQUMsV0FBVyxFQUFFO1lBR2xCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFCLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pDLE9BQU8sQ0FBRSw4QkFBQyxtREFBd0IsSUFBQyxHQUFHLEVBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVcsSUFBSSxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUcsY0FBYyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFHLHNCQUFzQixFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUcsVUFBVSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFHLFVBQVUsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRyxhQUFhLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUcsYUFBYSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFHLFVBQVUsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRyxTQUFTLEVBQUcsU0FBUyxFQUFHLFlBQVksRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRyxPQUFPLEVBQUcsT0FBTyxFQUFHLFFBQVEsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBSSxDQUFFLENBQUE7WUFDbmlCLENBQUMsQ0FBQyxDQUVBLENBQ1AsQ0FBQztJQUNKLENBQUM7Q0FzQkY7QUF4REQsOENBd0RDIn0=