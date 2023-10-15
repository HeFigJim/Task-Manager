import { FieldInputProps, useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

export const MyDatePicker = ({ ...props }: FieldInputProps<any>) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default MyDatePicker;