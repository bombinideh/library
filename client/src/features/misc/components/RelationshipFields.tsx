import SelectField from "@/components/Form/SelectField";
import useGetBookcases from "@/features/bookcases/api/getBookcases";
import useGetBoxes from "@/features/boxes/api/getBoxes";
import useGetShelfs from "@/features/shelfs/api/getShelfs";
import {
  FieldError,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface RelationshipFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  resetField: UseFormResetField<any>;
}

export default function RelationshipFields({
  register,
  errors,
  getValues,
  setValue,
  trigger,
  resetField,
}: RelationshipFieldsProps) {
  const { bookcase_id, shelf_id } = getValues();
  const bookcasesResult = useGetBookcases();
  const shelfsResult = useGetShelfs({
    queryOptions: { enabled: !!bookcase_id },
    bookcase_id: +bookcase_id,
  });
  const boxesResult = useGetBoxes({
    queryOptions: { enabled: !!shelf_id },
    shelf_id: +shelf_id,
  });
  const fields = [
    {
      id: "bookcase_id",
      title: "Estante",
      options: bookcasesResult.data?.items,
      disabled: bookcasesResult.isPending,
      resetDependency: () => {
        resetField("shelf_id", { defaultValue: "" });
        resetField("box_id", { defaultValue: "" });
      },
    },
    {
      id: "shelf_id",
      title: "Prateleira",
      options: shelfsResult.data?.items,
      disabled: !bookcase_id,
      resetDependency: () => resetField("box_id", { defaultValue: "" }),
    },
    {
      id: "box_id",
      title: "Caixa",
      options: boxesResult.data?.items,
      disabled: !shelf_id,
    },
  ];

  return (
    <>
      {fields.map(({ id, title, options, disabled, resetDependency }) => (
        <SelectField
          key={id}
          id={id}
          label={title}
          options={options?.map(option => ({
            id: Number(option[id as keyof typeof option]),
            text: option.name,
            onClick: () => {
              const idValue = String(option[id as keyof typeof option]);

              setValue(id, idValue);
              trigger(id);
              if (resetDependency) resetDependency();
            },
          }))}
          registration={register(id)}
          error={errors[id] as FieldError}
          currentValueId={getValues(id)}
          disabled={disabled}
        />
      ))}
    </>
  );
}
