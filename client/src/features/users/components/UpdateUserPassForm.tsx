import Button from "@/components/Elements/Button";
import InputPassword from "@/components/Form/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useUpdateUserPass from "../api/updateUserPass";
import { AccountForm } from "./AccountForm";

const schema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Digite sua senha atual.")
      .min(6, "A senha deve ter no mínimo 6 caracteres."),
    newPassword: z
      .string()
      .min(1, "Digite uma nova senha.")
      .min(6, "A senha deve ter no mínimo 6 caracteres."),
    newPasswordConfirm: z
      .string()
      .min(1, "Confirme sua nova senha.")
      .min(6, "A senha deve ter no mínimo 6 caracteres."),
  })
  .refine(
    ({ newPassword, newPasswordConfirm }) => newPassword === newPasswordConfirm,
    {
      message: "As senhas não batem.",
      path: ["newPasswordConfirm"],
    },
  );

export type UpdateUserPassData = z.infer<typeof schema>;

export default function UpdateUserPassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPassData>({
    resolver: zodResolver(schema),
  });
  const { updateUserPassMutation } = useUpdateUserPass();

  return (
    <AccountForm onSubmit={handleSubmit(data => updateUserPassMutation(data))}>
      <InputPassword
        label="Senha atual"
        id="current-password"
        autoComplete="current-password"
        registration={register("currentPassword")}
        error={errors.currentPassword}
        showPasswordDisplayToggle
      />

      <InputPassword
        label="Nova senha"
        id="new-password"
        autoComplete="new-password"
        registration={register("newPassword")}
        error={errors.newPassword}
        showPasswordDisplayToggle
      />

      <InputPassword
        label="Confirmar nova senha"
        id="new-password-confirm"
        autoComplete="new-password"
        registration={register("newPasswordConfirm")}
        error={errors.newPasswordConfirm}
        showPasswordDisplayToggle
      />

      <Button type="submit" text="Atualizar minha senha" />
    </AccountForm>
  );
}
