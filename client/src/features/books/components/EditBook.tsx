import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import { TableTitle } from "@/types/table";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useEditBook from "../api/editBook";
import { BookResponse } from "../types";

interface EditBookProps extends ModalStateProps {
  columns: Column[];
  book: BookResponse;
  tableTitle: TableTitle;
}

const schema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  author: z.string().min(1, "O autor é obrigatório."),
  publisher: z.string().min(1, "A editora é obrigatória."),
  number_pages: z.string().min(1, "O nº de páginas é obrigatório."),
  year_publication: z.string(),
  amount: z.string(),
  observation: z.string(),
  bookcase_id: z.string().min(1, "Uma estante é obrigatória."),
  shelf_id: z.string().min(1, "Uma prateleira é obrigatória."),
  box_id: z.string().min(1, "Uma caixa é obrigatória."),
});

export type EditBookData = z.infer<typeof schema>;

export default function EditBook({
  tableTitle,
  book,
  columns,
  ...rest
}: EditBookProps) {
  const defaultValues = columns.reduce((data, { key }, index) => {
    const value = book[key as keyof BookResponse];

    data[key as keyof EditBookData] = value ? String(value) : "";

    if (index + 1 >= columns.length) {
      const relationshipKeys = ["bookcase_id", "shelf_id", "box_id"];

      relationshipKeys.forEach(
        key =>
          (data[key as keyof EditBookData] = String(
            book[key as keyof BookResponse],
          )),
      );
    }

    return data;
  }, {} as EditBookData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    resetField,
  } = useForm<EditBookData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const { editBookMutation } = useEditBook({ book_id: book.book_id, tableTitle });
  const formId = "editBookForm";

  return (
    <Modal
      title={`Editar ${tableTitle.singular.toLowerCase()} #${book.book_id}`}
      action={{ text: `Editar ${tableTitle.singular.toLowerCase()}`, form: formId }}
      {...rest}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => editBookMutation(nonNullData(data)))}
      >
        {columns.map(({ title, key }) => (
          <InputField
            key={key}
            label={title}
            id={key}
            type="text"
            registration={register(key as keyof EditBookData)}
            error={errors[key as keyof EditBookData]}
          />
        ))}

        <RelationshipFields
          {...{ register, errors, getValues, setValue, trigger, resetField }}
        />
      </Form>
    </Modal>
  );
}
