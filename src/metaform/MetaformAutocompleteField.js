"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const util_1 = require("util");
/**
 * Component for Metaform autocomplete field
 */
class MetaformAutocompleteFieldComponent extends react_1.default.Component {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props) {
        super(props);
        /**
         * Render autocomplete items
         */
        this.renderAutocompleteItems = () => {
            const { matchedItems } = this.state;
            return (react_1.default.createElement("ul", { style: { overflow: "hidden", whiteSpace: "nowrap", padding: 0, margin: 0, listStyleType: "none", textAlign: "left", textOverflow: "ellipsis", display: matchedItems.length > 0 ? "block" : "none", position: "absolute", backgroundColor: "#fff", border: "1px solid #000", zIndex: 99, top: "100%", left: 0, right: 0 } }, matchedItems.map(item => {
                return react_1.default.createElement("li", { style: { paddingLeft: 5, paddingRight: 5, cursor: "pointer" }, onClick: this.chooseItem(item) }, item);
            })));
        };
        /**
         * Sets field value to chosen item
         *
         * @param item string
         */
        this.chooseItem = (item) => () => {
            this.props.onValueChange(item);
            this.setState({
                matchedItems: []
            });
        };
        /**
         * Matches input to autocomplete items
         *
         * @param input input string
         */
        this.autocomplete = (input) => {
            if (!this.props.field.sourceUrl) {
                return;
            }
            const itemsPromise = this.props.setAutocompleteOptions(this.props.field.sourceUrl);
            itemsPromise.then(items => {
                if (input) {
                    const matchedItems = items.filter(item => {
                        return !util_1.isNull(item.match(input)) && item !== input;
                    }).map(item => {
                        return item;
                    });
                    this.setState({
                        matchedItems: matchedItems
                    });
                }
                else {
                    this.setState({
                        matchedItems: []
                    });
                }
            });
        };
        /**
         * Event handler for field input change
         *
         * @param event event
         */
        this.onChange = (event) => {
            this.autocomplete(event.target.value);
            this.props.onValueChange(event.target.value);
        };
        this.state = {
            matchedItems: []
        };
    }
    /**
     * Component render method
     */
    render() {
        if (!this.props.field.name) {
            return null;
        }
        return (react_1.default.createElement("div", { style: { position: "relative", display: "inline-block" } },
            react_1.default.createElement("input", { type: "text", autoComplete: "off", placeholder: this.props.field.placeholder, id: this.props.fieldId, "aria-labelledby": this.props.fieldLabelId, name: this.props.field.name, title: this.props.field.title, required: this.props.field.required, readOnly: this.props.formReadOnly || this.props.field.readonly, value: this.props.value || "", onChange: this.onChange, onFocus: this.props.onFocus }),
            this.renderAutocompleteItems()));
    }
}
exports.MetaformAutocompleteFieldComponent = MetaformAutocompleteFieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWZvcm1BdXRvY29tcGxldGVGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21ldGFmb3JtLXJlYWN0L3NyYy9NZXRhZm9ybUF1dG9jb21wbGV0ZUZpZWxkLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUcxQiwrQkFBOEI7QUF1QjlCOztHQUVHO0FBQ0gsTUFBYSxrQ0FBbUMsU0FBUSxlQUFLLENBQUMsU0FBdUI7SUFFbkY7Ozs7T0FJRztJQUNILFlBQVksS0FBWTtRQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFvQ2Y7O1dBRUc7UUFDSyw0QkFBdUIsR0FBRyxHQUFHLEVBQUU7WUFDckMsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsT0FBTyxDQUNMLHNDQUFJLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFFeFQsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsT0FBTyxzQ0FBSSxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFB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