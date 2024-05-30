import { Column, TableTitle } from "@/@types/table";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import InputPassword from "@/components/Form/InputPassword";
import Modal, { ModalStateProps } from "@/components/Modal";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserResponse } from "../@types";
import useCreateUser from "../api/createUser";

interface CreateUserProps extends ModalStateProps {
  columns: Column<UserResponse>[];
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
  ...modalStates
}: CreateUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserData>({
    resolver: zodResolver(schema),
  });
  const { createUserMutation } = useCreateUser({ tableTitle, ...modalStates });
  const formId = "createUserForm";

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
