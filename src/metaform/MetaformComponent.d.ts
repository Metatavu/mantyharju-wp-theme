import React, { ReactNode } from 'react';
import { Metaform, MetaformField } from './models/api';
import { FieldValue, IconName } from './types';
/**
 * Component props
 */
interface Props {
    form: Metaform;
    formReadOnly: boolean;
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
    metaformId: string;
}
/**
 * Component for metaform
 */
export declare class MetaformComponent extends React.Component<Props, State> {
    /**
     * Constructor
     *
     * @param props component props
     */
    constructor(props: Props);
    /**
     * Component render method
     */
    render(): JSX.Element;
    private renderTitle;
    /**
     * Returns unique id
     *
     * @returns unique id
     */
    private getUniqueId;
}
export {};
//# sourceMappingURL=MetaformComponent.d.ts.map