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
    setAutocompleteOptions: (path: string) => Promise<string[]>;
    onFocus: () => void;
}
/**
 * Component state
 */
interface State {
    matchedItems: string[];
}
/**
 * Component for Metaform autocomplete field
 */
export declare class MetaformAutocompleteFieldComponent extends React.Component<Props, State> {
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
     * Render autocomplete items
     */
    private renderAutocompleteItems;
    /**
     * Sets field value to chosen item
     *
     * @param item string
     */
    private chooseItem;
    /**
     * Matches input to autocomplete items
     *
     * @param input input string
     */
    private autocomplete;
    /**
     * Event handler for field input change
     *
     * @param event event
     */
    private onChange;
}
export {};
//# sourceMappingURL=MetaformAutocompleteField.d.ts.map