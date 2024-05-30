import { Column, TableTitle } from "@/@types/table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BoxResponse } from "../@types";
import useCreateBox from "../api/createBox";

interface CreateBoxProps extends ModalStateProps {
  columns: Column<BoxResponse>[];
  tableTitle: TableTitle;
}

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  bookcase_id: z.string().min(1, "Uma estante é obrigatória."),
  shelf_id: z.string().min(1, "Uma prateleira é obrigatória."),
});

export type CreateBoxData = z.infer<typeof schema>;

export default function CreateBox({
  tableTitle,
  columns,
  ...modalStates
}: CreateBoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    resetField,
  } = useForm<CreateBoxData>({
    resolver: zodResolver(schema),
  });
  const { createBoxMutation } = useCreateBox({ tableTitle, ...modalStates });
  const formId = "createBoxForm";

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
        onSubmit={handleSubmit(data => {
          delete (data as any).bookcase_id;

          createBoxMutation(nonNullData(data));
        })}
      >
        {columns.map(({ title, key }) => (
          <InputField
            key={key}
            id={key}
            label={title}
            type="text"
            registration={register(key as keyof CreateBoxData)}
            error={errors[key as keyof CreateBoxData]}
          />
        ))}

        <RelationshipFields
          pick={["bookcase_id", "shelf_id"]}
          {...{ register, errors, getValues, setValue, trigger, resetField }}
        />
      </Form>
    </Modal>
  );
}
