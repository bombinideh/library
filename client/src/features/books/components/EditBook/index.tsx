import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useEditBook from "../../api/editBook";
import { Book } from "../../types";

interface EditBookProps extends ModalStateProps {
  columns: Column[];
  book: Book;
}

const schema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  author: z.string().min(1, "O autor é obrigatório."),
  publisher: z.string().min(1, "A editora é obrigatória."),
  number_pages: z.string().min(1, "O nº de páginas é obrigatório."),
  year_publication: z.string(),
  amount: z.string(),
  observation: z.string(),
  bookcase_name: z.string().min(1, "Uma estante é obrigatória."),
  shelf_name: z.string().min(1, "Uma prateleira é obrigatória."),
  box_name: z.string().min(1, "Uma caixa é obrigatória."),
});

export type EditBookData = z.infer<typeof schema>;

export default function EditBook({ book, columns, ...rest }: EditBookProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBookData>({
    resolver: zodResolver(schema),
  });
  const filteredColumns = columns.filter(
    ({ key }) => key !== "book_id" && key !== "user_name",
  );
  const formId = "editBookForm";
  const { editBookMutation } = useEditBook(book?.book_id);

  return (
    <Modal
      title={`Editar livro #${book.book_id}`}
      action={{ text: "Editar livro", form: formId }}
      {...rest}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => editBookMutation(nonNullData(data)))}
      >
        {filteredColumns.map(({ title, key }) => (
          <InputField
            key={key}
            label={title}
            id={key}
            type="text"
            registration={register(key as keyof EditBookData)}
            error={errors[key as keyof EditBookData]}
            value={book?.[key as keyof Book] as string}
          />
        ))}
      </Form>
    </Modal>
  );
}
