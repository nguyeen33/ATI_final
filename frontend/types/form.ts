import { UseFormReturn, FieldValues, Path } from "react-hook-form";

export interface FieldProps<T extends FieldValues = any> {
  field: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: any;
    name: Path<T>;
    ref: (instance: any) => void;
  };
  fieldState: {
    invalid: boolean;
    isTouched: boolean;
    isDirty: boolean;
  };
  formState: UseFormReturn<T>["formState"];
}