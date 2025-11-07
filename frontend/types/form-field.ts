import { useForm, ControllerRenderProps, UseFormReturn, FieldValues } from 'react-hook-form';

export interface BaseFieldProps<T extends FieldValues = any> {
  field: ControllerRenderProps<T>;
}

export interface TextFieldProps<T extends FieldValues = any> extends BaseFieldProps<T> {
  field: Omit<ControllerRenderProps<T>, 'value'> & {
    value: string;
  };
}

export interface BooleanFieldProps<T extends FieldValues = any> extends BaseFieldProps<T> {
  field: Omit<ControllerRenderProps<T>, 'value'> & {
    value: boolean;
  };
}