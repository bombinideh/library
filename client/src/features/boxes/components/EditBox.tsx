import { TableTitle } from "@/@types/table";
import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import ActiveField from "@/features/misc/components/ActiveField";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BoxResponse } from "../@types";
import useEditBox from "../api/editBox";

interface EditBoxProps extends ModalStateProps {
  columns: Column[];
  box: BoxResponse;
  tableTitle: TableTitle;
}

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  active: z.string().min(1, "O estado é obrigatório."),
  bookcase_id: z.string().min(1, "Uma estante é obrigatória."),
  shelf_id: z.string().min(1, "Uma prateleira é obrigatória."),
});

export type EditBoxData = z.infer<typeof schema>;

export default function EditBox({
  tableTitle,
  box,
  columns,
  ...modalStates
}: EditBoxProps) {
  const defaultValues = columns.reduce((data, { key }, index) => {
    data[key as keyof EditBoxData] = String(box[key as keyof BoxResponse]);

    if (index + 1 >= columns.length) {
      data.bookcase_id = String(box.bookcase_id);
      data.shelf_id = String(box.shelf_id);
    }

    return data;
  }, {} as EditBoxData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    resetField,
  } = useForm<EditBoxData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const { editBoxMutation } = useEditBox({
    box_id: box.box_id,
    tableTitle,
    ...modalStates,
  });
  const formId = "editBoxForm";

  return (
    <Modal
      title={`Editar ${tableTitle.singular.toLowerCase()} #${box.box_id}`}
      action={{
        text: `Editar ${tableTitle.singular.toLowerCase()}`,
        form: formId,
      }}
      {...modalStates}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => {
          delete (data as any).bookcase_id;
          delete (data as any).shelf_id;

          editBoxMutation(nonNullData(data));
        })}
      >
        {columns.map(({ title, key }) => {
          if (key === "active")
            return (
              <ActiveField
                key={key}
                {...{ register, errors, getValues, setValue, trigger }}
              />
            );

          return (
            <InputField
              key={key}
              id={key}
              label={title}
              type="text"
              registration={register(key as keyof EditBoxData)}
              error={errors[key as keyof EditBoxData]}
            />
          );
        })}

        <RelationshipFields
          pick={["bookcase_id", "shelf_id"]}
          {...{ register, errors, getValues, setValue, trigger, resetField }}
        />
      </Form>
    </Modal>
  );
}
