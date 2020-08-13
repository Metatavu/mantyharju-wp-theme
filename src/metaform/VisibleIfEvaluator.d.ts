import { MetaformVisibleIf } from "./models/api";
import { FieldValue } from './types';
/**
 * Helper class for evaluating "visible if" rules
 */
declare class VisibileIfEvaluator {
    /**
     * Evaluates given visible if rule
     *
     * @param visibleIf rule
     * @param getFieldValue method for retrieving form values
     * @returns whether rule evaluated as visible or hidden
     */
    static isVisible: (visibleIf: MetaformVisibleIf | undefined, getFieldValue: (fieldName: string) => FieldValue) => boolean;
}
export default VisibileIfEvaluator;
//# sourceMappingURL=VisibleIfEvaluator.d.ts.map