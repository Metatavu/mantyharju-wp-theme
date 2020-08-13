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
    formReadOnly: boolean;
    value: FieldValue;
    onClick: (source: MetaformField) => void;
}
/**
 * Component state
 */
interface State {
}
/**
 * Component for Metaform submit field
 */
export declare class MetaformSubmitFieldComponent extends React.Component<Props, State> {
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
    /**
     * Event handler for field input change
     *
     * @param event event
     */
    private onClick;
}
export {};
//# sourceMappingURL=MetaformSubmitFieldComponent.d.ts.map