"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper class for evaluating "visible if" rules
 */
class VisibileIfEvaluator {
}
/**
 * Evaluates given visible if rule
 *
 * @param visibleIf rule
 * @param getFieldValue method for retrieving form values
 * @returns whether rule evaluated as visible or hidden
 */
VisibileIfEvaluator.isVisible = (visibleIf, getFieldValue) => {
    if (!visibleIf) {
        return true;
    }
    let result = false;
    const field = visibleIf.field;
    if (field && visibleIf.equals) {
        result = visibleIf.equals === (getFieldValue(field) ? true : false);
    }
    if (!result && field && visibleIf["not-equals"]) {
        result = visibleIf["not-equals"] !== (getFieldValue(field) ? true : false);
    }
    const ands = visibleIf.and || [];
    for (let i = 0; i < ands.length; i++) {
        if (!VisibileIfEvaluator.isVisible(ands[i], getFieldValue)) {
            return false;
        }
    }
    if (!result) {
        const ors = visibleIf.or || [];
        for (let i = 0; i < ors.length; i++) {
            if (VisibileIfEvaluator.isVisible(ors[i], getFieldValue)) {
                return true;
            }
        }
    }
    return result;
};
exports.default = VisibileIfEvaluator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzaWJsZUlmRXZhbHVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbWV0YWZvcm0tcmVhY3Qvc3JjL1Zpc2libGVJZkV2YWx1YXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBOztHQUVHO0FBQ0gsTUFBTSxtQkFBbUI7O0FBRXZCOzs7Ozs7R0FNRztBQUNXLDZCQUFTLEdBQUcsQ0FBQyxTQUF3QyxFQUFFLGFBQWdELEVBQUUsRUFBRTtJQUN2SCxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztJQUU1QixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBRTlCLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7UUFDN0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckU7SUFFRCxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDL0MsTUFBTSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1RTtJQUVELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFO1lBQzFELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtJQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxJQUFJLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUU7Z0JBQ3hELE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFBO0FBSUgsa0JBQWUsbUJBQW1CLENBQUMifQ==