import { Column, TableTitle } from "@/@types/table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import { ModalStateProps } from "@/components/Modal";
import useCreateUniqueBook from "@/features/books/api/createUniqueBook";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BookResponse } from "../../@types";
import { bookSchema, relationShipsSchema } from "../../schemas";

interface CreateUniqueBookProps extends ModalStateProps {
  tableTitle: TableTitle;
  formId: string;
  columns: Column<BookResponse>[];
}

const schema = bookSchema.merge(relationShipsSchema);

export type CreateUniqueBookData = z.infer<typeof schema>;

export default function CreateUniqueBook({
  formId,
  columns,
  ...mutationProps
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
  const { createUniqueBookMutation } = useCreateUniqueBook(mutationProps);

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
