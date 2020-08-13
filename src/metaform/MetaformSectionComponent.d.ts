import React, { ReactNode } from 'react';
import { MetaformSection, MetaformField } from './models/api';
import { FieldValue, IconName } from './types';
/**
 * Component props
 */
interface Props {
    section: MetaformSection;
    formReadOnly: boolean;
    metaformId: string;
    sectionId: string;
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
}
/**
 * Component for metaform section
 */
export declare class MetaformSectionComponent extends React.Component<Props, State> {
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
    private renderTitle;
    private renderFields;
}
export {};
//# sourceMappingURL=MetaformSectionComponent.d.ts.map