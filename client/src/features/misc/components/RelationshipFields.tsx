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
  pick?: ("bookcase_id" | "shelf_id" | "box_id")[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  resetField: UseFormResetField<any>;
}

export default function RelationshipFields({
  pick = ["bookcase_id", "shelf_id", "box_id"],
  register,
  errors,
  getValues,
  setValue,
  trigger,
  resetField,
}: RelationshipFieldsProps) {
  const { bookcase_id, shelf_id } = getValues();
  const bookcasesResult = useGetBookcases({ items: 0 });
  const shelfsResult = useGetShelfs({
    queryOptions: { enabled: pick.includes("shelf_id") && !!bookcase_id },
    bookcase_id: +bookcase_id,
    items: 0,
  });
  const boxesResult = useGetBoxes({
    queryOptions: { enabled: pick.includes("box_id") && !!shelf_id },
    shelf_id: +shelf_id,
    items: 0,
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
      resetDependency: () => {},
    },
  ] as const;
  const filteredFields = fields.filter(({ id }) => pick.includes(id));

  return (
    <>
      {filteredFields.map(({ id, title, options, disabled, resetDependency }) => (
        <SelectField
          key={id}
          id={id}
          label={title}
          options={options?.map(option => ({
            value: String(option[id as keyof typeof option]),
            text: option.name,
            onClick: () => {
              setValue(id, String(option[id as keyof typeof option]));
              trigger(id, { shouldFocus: true });

              if (resetDependency) resetDependency();
            },
          }))}
          registration={register(id)}
          error={errors[id] as FieldError}
          currentValue={getValues(id)}
          disabled={disabled}
        />
      ))}
    </>
  );
}
