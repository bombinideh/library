import { TableTitle } from "@/@types/table";
import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateBookcase from "../api/createBookcase";

interface CreateBookcaseProps extends ModalStateProps {
  columns: Column[];
  tableTitle: TableTitle;
}

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
});

export type CreateBookcaseData = z.infer<typeof schema>;

export default function CreateBookcase({
  tableTitle,
  columns,
  ...modalStates
}: CreateBookcaseProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBookcaseData>({
    resolver: zodResolver(schema),
  });
  const { createBookcaseMutation } = useCreateBookcase({
    tableTitle,
    ...modalStates,
  });
  const formId = "createBookcaseForm";

  return (
    <Modal
      title={`Cadastrar ${tableTitle.singular.toLowerCase()}`}
      action={{
        text: `Cadastrar ${tableTitle.singular.toLowerCase()}`,
        form: formId,
      }}
      {...modalStates}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => createBookcaseMutation(nonNullData(data)))}
      >
        {columns.map(({ title, key }) => (
          <InputField
            key={key}
            id={key}
            label={title}
            type="text"
            registration={register(key as keyof CreateBookcaseData)}
            error={errors[key as keyof CreateBookcaseData]}
          />
        ))}
      </Form>
    </Modal>
  );
}
