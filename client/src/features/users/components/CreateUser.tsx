import { Column } from "@/components/Elements/Table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import InputPassword from "@/components/Form/InputPassword";
import Modal, { ModalStateProps } from "@/components/Modal";
import { TableTitle } from "@/types/table";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateUser from "../api/createUser";

interface CreateUserProps extends ModalStateProps {
  columns: Column[];
  tableTitle: TableTitle;
}

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .min(6, "A senha precisa de no mínimo 6 caracteres."),
});

export type CreateUserData = z.infer<typeof schema>;

export default function CreateUser({
  tableTitle,
  columns,
  ...rest
}: CreateUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserData>({
    resolver: zodResolver(schema),
  });
  const { createUserMutation } = useCreateUser(tableTitle);
  const formId = "createUserForm";

  return (
    <Modal
      title={`Cadastrar ${tableTitle.singular.toLowerCase()}`}
      action={{
        text: `Cadastrar ${tableTitle.singular.toLowerCase()}`,
        form: formId,
      }}
      {...rest}
    >
      <Form
        id={formId}
        onSubmit={handleSubmit(data => createUserMutation(nonNullData(data)))}
      >
        {columns.map(({ title, key }) => (
          <InputField
            key={key}
            id={key}
            label={title}
            type="text"
            registration={register(key as keyof CreateUserData)}
            error={errors[key as keyof CreateUserData]}
          />
        ))}

        <InputPassword
          showPasswordDisplayToggle
          registration={register("password")}
          error={errors.password}
        />
      </Form>
    </Modal>
  );
}
