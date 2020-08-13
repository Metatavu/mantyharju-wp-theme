import React from 'react';
import { MetaformField } from './models/api';
import { FieldValue } from './types';
/**
 * Component props
 */
interface Props {
    field: MetaformField;
    fieldId: string;
    fieldLabelId: string;
    getFieldValue: (fieldName: string) => FieldValue;
}
/**
 * Component state
 */
interface State {
}
/**
 * Component for Metaform memo field
 */
export declare class MetaformHtmlComponent extends React.Component<Props, State> {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props: Props);
    /**
     * Component render method
     */
    render(): JSX.Element | null;
}
export {};
//# sourceMappingURL=MetaformHtmlComponent.d.ts.map