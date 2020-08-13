"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Component for Metaform memo field
 */
class MetaformHtmlComponent extends react_1.default.Component {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props) {
        super(props);
        this.state = {};
    }
    /**
     * Component render method
     */
    render() {
        if (!this.props.field.name) {
            return null;
        }
        const dangerousInnerHTML = this.props.field.html || "";
        return (react_1.default.createElement("div", { id: this.props.fieldId, "aria-labelledby": this.props.fieldLabelId, dangerouslySetInnerHTML: { __html: dangerousInnerHTML } }));
    }
}
exports.MetaformHtmlComponent = MetaformHtmlComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1IdG1sQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbWV0YWZvcm0tcmVhY3Qvc3JjL01ldGFmb3JtSHRtbENvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFxQjFCOztHQUVHO0FBQ0gsTUFBYSxxQkFBc0IsU0FBUSxlQUFLLENBQUMsU0FBdUI7SUFFdEU7Ozs7T0FJRztJQUNILFlBQVksS0FBWTtRQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsS0FBSyxHQUFHLEVBRVosQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFFdkQsT0FBTyxDQUNMLHVDQUFLLEVBQUUsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8scUJBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFHLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEdBQVEsQ0FDM0ksQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTdCRCxzREE2QkMifQ==