"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform text field
 */
class MetaformFilesFieldComponent extends react_1.default.Component {
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
            if (event.target.files && this.props.field.uploadUrl) {
                this.props.onFileUpload(this.props.field.name || "", event.target.files, this.props.field.uploadUrl, this.props.field.maxFileSize, this.props.field.singleFile);
            }
            else {
                this.props.onValueChange(event.target.value);
            }
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
        return (react_1.default.createElement("input", { type: "file", placeholder: this.props.field.placeholder, id: this.props.fieldId, "aria-labelledby": this.props.fieldLabelId, name: this.props.field.name, title: this.props.field.title, required: this.props.field.required, readOnly: this.props.formReadOnly || this.props.field.readonly, value: this.props.value || "", onChange: this.onChange, onFocus: this.props.onFocus }));
    }
}
exports.MetaformFilesFieldComponent = MetaformFilesFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1GaWxlc0ZpZWxkQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbWV0YWZvcm0tcmVhY3Qvc3JjL01ldGFmb3JtRmlsZXNGaWVsZENvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUF5QjFCOztHQUVHO0FBQ0gsTUFBYSwyQkFBNEIsU0FBUSxlQUFLLENBQUMsU0FBdUI7SUFFNUU7Ozs7T0FJRztJQUNILFlBQVksS0FBWTtRQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFnQ2Y7Ozs7V0FJRztRQUNLLGFBQVEsR0FBRyxDQUFDLEtBQTBDLEVBQUUsRUFBRTtZQUNoRSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pLO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUM7UUFDSCxDQUFDLENBQUE7UUF6Q0MsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUVaLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxDQUNMLHlDQUNFLElBQUksRUFBQyxNQUFNLEVBQ1gsV0FBVyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFDMUMsRUFBRSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxxQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDekMsSUFBSSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFDNUIsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDOUIsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDcEMsUUFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDL0QsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDOUIsUUFBUSxFQUFHLElBQUksQ0FBQyxRQUFRLEVBQ3hCLE9BQU8sRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FDNUIsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQWVGO0FBckRELGtFQXFEQyJ9