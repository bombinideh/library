import { TableTitle } from "@/@types/table";
import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateShelf from "../api/createShelf";

interface CreateShelfProps extends ModalStateProps {
  columns: Column[];
  tableTitle: TableTitle;
}

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  bookcase_id: z.string().min(1, "Uma estante é obrigatória."),
});

export type CreateShelfData = z.infer<typeof schema>;

export default function CreateShelf({
  tableTitle,
  columns,
  ...modalStates
}: CreateShelfProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    resetField,
  } = useForm<CreateShelfData>({
    resolver: zodResolver(schema),
  });
  const { createShelfMutation } = useCreateShelf({ tableTitle, ...modalStates });
  const formId = "createShelfForm";

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
        onSubmit={handleSubmit(data => createShelfMutation(nonNullData(data)))}
      >
        {columns.map(({ title, key }) => (
          <InputField
            key={key}
            id={key}
            label={title}
            type="text"
            registration={register(key as keyof CreateShelfData)}
            error={errors[key as keyof CreateShelfData]}
          />
        ))}

        <RelationshipFields
          pick={["bookcase_id"]}
          {...{ register, errors, getValues, setValue, trigger, resetField }}
        />
      </Form>
    </Modal>
  );
}
