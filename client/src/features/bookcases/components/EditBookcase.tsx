import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import Modal, { ModalStateProps } from "@/components/Modal";
import ActiveField from "@/features/misc/components/ActiveField";
import { TableTitle } from "@/types/table";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useEditBookcase from "../api/editBookcase";
import { Bookcase } from "../types";

interface EditBookcaseProps extends ModalStateProps {
  columns: Column[];
  bookcase: Bookcase;
  tableTitle: TableTitle;
}

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  active: z.string().min(1, "O estado é obrigatório."),
});

export type EditBookcaseData = z.infer<typeof schema>;

export default function EditBookcase({
  tableTitle,
  bookcase,
  columns,
  ...rest
}: EditBookcaseProps) {
  const defaultValues = columns.reduce((data, { key }) => {
    data[key as keyof EditBookcaseData] = String(bookcase[key as keyof Bookcase]);

    return data;
  }, {} as EditBookcaseData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useForm<EditBookcaseData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const { editBookcaseMutation } = useEditBookcase({
    bookcase_id: bookcase.bookcase_id,
    tableTitle,
  });
  const formId = "editBookcaseForm";

  return (
    <Modal
      title={`Editar ${tableTitle.singular.toLowerCase()} #${bookcase.bookcase_id}`}
      action={{
        text: `Editar ${tableTitle.singular.toLowerCase()}`,
        form: formId,
      }}
      {...rest}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => editBookcaseMutation(nonNullData(data)))}
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
              registration={register(key as keyof EditBookcaseData)}
              error={errors[key as keyof EditBookcaseData]}
            />
          );
        })}
      </Form>
    </Modal>
  );
}
