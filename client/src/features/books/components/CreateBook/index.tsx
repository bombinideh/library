import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateBook from "../../api/createBook";

interface CreateBookProps extends ModalStateProps {
  columns: Column[];
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

export type CreateBookData = z.infer<typeof schema>;

export default function CreateBook({ columns, ...rest }: CreateBookProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBookData>({
    resolver: zodResolver(schema),
  });
  const filteredColumns = columns.filter(
    ({ key }) => key !== "book_id" && key !== "user_name",
  );
  const formId = "createBookForm";
  const { createBookMutation } = useCreateBook();

  return (
    <Modal
      title="Cadastrar livro"
      action={{ text: "Cadastrar livro", form: formId }}
      {...rest}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => {
          const excludeKeys = ["bookcase_name", "shelf_name", "box_name"];

          excludeKeys.forEach(key => delete data[key as keyof typeof data]);

          const reqData = { ...data, bookcase_id: 1, shelf_id: 1, box_id: 1 };

          createBookMutation(nonNullData(reqData));
        })}
      >
        {filteredColumns.map(({ title, key }) => (
          <InputField
            key={key}
            label={title}
            id={key}
            type="text"
            registration={register(key as keyof CreateBookData)}
            error={errors[key as keyof CreateBookData]}
          />
        ))}
      </Form>
    </Modal>
  );
}
