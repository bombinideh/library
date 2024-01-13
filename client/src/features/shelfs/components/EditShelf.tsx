import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import ActiveField from "@/features/misc/components/ActiveField";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import { TableTitle } from "@/types/table";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useEditShelf from "../api/editShelf";
import { Shelf } from "../types";

interface EditShelfProps extends ModalStateProps {
  columns: Column[];
  shelf: Shelf;
  tableTitle: TableTitle;
}

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  active: z.string().min(1, "O estado é obrigatório."),
  bookcase_id: z.string().min(1, "Uma estante é obrigatória."),
});

export type EditShelfData = z.infer<typeof schema>;

export default function EditShelf({
  tableTitle,
  shelf,
  columns,
  ...modalStates
}: EditShelfProps) {
  const defaultValues = columns.reduce((data, { key }, index) => {
    data[key as keyof EditShelfData] = String(shelf[key as keyof Shelf]);

    if (index + 1 >= columns.length) data.bookcase_id = String(shelf.bookcase_id);

    return data;
  }, {} as EditShelfData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    resetField,
  } = useForm<EditShelfData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const { editShelfMutation } = useEditShelf({
    shelf_id: shelf.shelf_id,
    tableTitle,
    ...modalStates,
  });
  const formId = "editShelfForm";

  return (
    <Modal
      title={`Editar ${tableTitle.singular.toLowerCase()} #${shelf.shelf_id}`}
      action={{
        text: `Editar ${tableTitle.singular.toLowerCase()}`,
        form: formId,
      }}
      {...modalStates}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => editShelfMutation(nonNullData(data)))}
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
              registration={register(key as keyof EditShelfData)}
              error={errors[key as keyof EditShelfData]}
            />
          );
        })}

        <RelationshipFields
          pick={["bookcase_id"]}
          {...{ register, errors, getValues, setValue, trigger, resetField }}
        />
      </Form>
    </Modal>
  );
}
