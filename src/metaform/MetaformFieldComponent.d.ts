import React, { ReactNode } from 'react';
import { FieldValue, IconName } from './types';
import { MetaformField } from './models/api';
/**
 * Component props
 */
interface Props {
    formReadOnly: boolean;
    metaformId: string;
    field: MetaformField;
    getFieldValue: (fieldName: string) => FieldValue;
    setFieldValue: (fieldName: string, fieldValue: FieldValue) => void;
    datePicker: (fieldName: string, onChange: (date: Date) => void) => JSX.Element;
    datetimePicker: (fieldName: string, onChange: (date: Date) => void) => JSX.Element;
    uploadFile: (fieldName: string, file: FileList | File, path: string) => void;
    setAutocompleteOptions: (path: string) => Promise<string[]>;
    renderIcon: (icon: IconName, key: string) => ReactNode;
    onSubmit: (source: MetaformField) => void;
}
/**
 * Component state
 */
interface State {
    pristine: boolean;
}
/**
 * Component for metaform field
 */
export declare class MetaformFieldComponent extends React.Component<Props, State> {
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
     * Renders field title
     */
    private renderTitle;
    /**
     * Renders field's input
     */
    private renderInput;
    /**
     * Renders field help
     */
    private renderHelp;
    /**
     * Returns field's id
     */
    private getFieldId;
    /**
     * Returns field label's id
     */
    private getFieldLabelId;
    /**
     * Returns field's value
     *
     * @returns field's value
     */
    private getFieldValue;
    /**
     * Event handler for field value change
     */
    private onValueChange;
    /**
     * Event handler for file upload
     *
     * @param files file list
     * @param path string
     * @param maxFileSize number
     * @param uploadSingle boolean
     */
    private onFileUpload;
    /**
     * Event handler for field value change
     */
    private onFocus;
}
export {};
//# sourceMappingURL=MetaformFieldComponent.d.ts.map