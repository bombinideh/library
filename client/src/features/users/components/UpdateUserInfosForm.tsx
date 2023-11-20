import Button from "@/components/Elements/Button";
import InputField from "@/components/Form/InputField";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useUpdateUserInfos from "../api/updateUserInfos";
import { AccountForm } from "./AccountForm";

const schema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(30, "O nome deve ter no máximo 30 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
});

export type UpdateUserInfosData = z.infer<typeof schema>;

export default function UpdateUserInfosForm() {
  const { user } = useAuth();
  const defaultValues = {
    name: user?.name,
    email: user?.email,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInfosData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const { updateUserInfosMutation } = useUpdateUserInfos();
  const { emitNotification, cancelNotification } = useNotification();

  return (
    <AccountForm
      onSubmit={handleSubmit(data => {
        const keys = Object.keys(data);

        keys.forEach(key => {
          const formKey = key as keyof UpdateUserInfosData;

          if (data[formKey] === defaultValues[formKey]) delete data[formKey];
        });

        const errorId = "updateUserForm";

        if (!Object.values(data).length)
          return emitNotification({
            text: "Nenhuma informação alterada",
            variant: "error",
            id: errorId,
          });

        cancelNotification(errorId);
        updateUserInfosMutation(nonNullData(data));
      })}
    >
      <InputField
        label="Nome"
        id="name"
        registration={register("name")}
        error={errors.name}
        placeholder={user?.name}
      />

      <InputField
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
        placeholder={user?.email}
      />

      <Button type="submit" text="Atualizar minhas informações pessoais" />
    </AccountForm>
  );
}
