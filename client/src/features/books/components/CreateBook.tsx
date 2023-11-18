import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateBook from "../api/createBook";

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
  bookcase_id: z.string().min(1, "Uma estante é obrigatória."),
  shelf_id: z.string().min(1, "Uma prateleira é obrigatória."),
  box_id: z.string().min(1, "Uma caixa é obrigatória."),
});

export type CreateBookData = z.infer<typeof schema>;

export default function CreateBook({ columns, ...rest }: CreateBookProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    resetField,
  } = useForm<CreateBookData>({
    resolver: zodResolver(schema),
  });
  const { createBookMutation } = useCreateBook();
  const formId = "createBookForm";

  return (
    <Modal
      title="Cadastrar livro"
      action={{ text: "Cadastrar livro", form: formId }}
      {...rest}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => createBookMutation(nonNullData(data)))}
      >
        {columns.map(({ title, key }) => (
          <InputField
            key={key}
            id={key}
            label={title}
            type="text"
            registration={register(key as keyof CreateBookData)}
            error={errors[key as keyof CreateBookData]}
          />
        ))}

        <RelationshipFields
          {...{ register, errors, getValues, setValue, trigger, resetField }}
        />
      </Form>
    </Modal>
  );
}
