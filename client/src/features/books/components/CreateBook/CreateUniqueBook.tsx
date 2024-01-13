import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import useCreateUniqueBook from "@/features/books/api/createUniqueBook";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import { TableTitle } from "@/types/table";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookSchema, relationShipsSchema } from "./schemas";

interface CreateUniqueBookProps {
  tableTitle: TableTitle;
  formId: string;
  columns: Column[];
}

const schema = bookSchema.merge(relationShipsSchema);

export type CreateUniqueBookData = z.infer<typeof schema>;

export default function CreateUniqueBook({
  tableTitle,
  formId,
  columns,
}: CreateUniqueBookProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    resetField,
  } = useForm<CreateUniqueBookData>({
    resolver: zodResolver(schema),
  });
  const { createUniqueBookMutation } = useCreateUniqueBook(tableTitle);

  return (
    <Form
      id={formId}
      onSubmit={handleSubmit(data => createUniqueBookMutation(nonNullData(data)))}
    >
      {columns.map(({ title, key }) => (
        <InputField
          key={key}
          id={key}
          label={title}
          type="text"
          registration={register(key as keyof CreateUniqueBookData)}
          error={errors[key as keyof CreateUniqueBookData]}
        />
      ))}

      <RelationshipFields
        {...{ register, errors, getValues, setValue, trigger, resetField }}
      />
    </Form>
  );
}
