import SelectField from "@/components/Form/SelectField";
import {
  FieldError,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface ActiveFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
}

export default function ActiveField({
  register,
  errors,
  getValues,
  setValue,
  trigger,
}: ActiveFieldProps) {
  const options = [
    {
      value: "true",
      text: "Sim",
    },
    {
      value: "false",
      text: "Não",
    },
  ];
  const id = "active";

  return (
    <SelectField
      key={id}
      id={id}
      label="Ativo"
      options={options.map(option => ({
        value: option.value,
        text: option.text,
        onClick: () => {
          setValue(id, option.value);
          trigger(id);
        },
      }))}
      registration={register(id)}
      error={errors[id] as FieldError}
      currentValue={getValues(id)}
    />
  );
}
