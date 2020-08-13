import React, { ReactNode } from 'react';
import { MetaformField } from './models/api';
import { FieldValue, IconName } from './types';
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
    renderIcon: (icon: IconName, key: string) => ReactNode;
}
/**
 * Component state
 */
interface State {
}
/**
 * Component for radio field
 */
export declare class MetaformBooleanFieldComponent extends React.Component<Props, State> {
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
     * Renders field option's value
     */
    private renderOptionValue;
    /**
     * Event handler for field input change
     *
     * @param event event
     */
    private onChange;
}
export {};
//# sourceMappingURL=MetaformBooleanFieldComponent.d.ts.map