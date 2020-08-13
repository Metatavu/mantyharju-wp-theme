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
    onValueChange: (value: FieldValue) => void;
    onFocus: () => void;
}
/**
 * Component state
 */
interface State {
}
/**
 * Component for Metaform email field
 */
export declare class MetaformEmailFieldComponent extends React.Component<Props, State> {
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
    private onChange;
}
export {};
//# sourceMappingURL=MetaformEmailComponent.d.ts.map