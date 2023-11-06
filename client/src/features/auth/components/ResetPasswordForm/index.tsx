import Button from "@/components/Elements/Button";
import { default as InputPassword } from "@/components/Form/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import useResetPassword from "../../api/resetPassword";
import Form from "../Form";

const schema = z.object({
  password: z
    .string()
    .min(1, "Digite uma nova senha.")
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type ResetPasswordData = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });
  const { resetPasswordMutation } = useResetPassword();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = {
    user_id: Number(searchParams.get("user_id")),
    token: searchParams.get("token"),
  };
  type Params = typeof params;

  // if (!location.search || !params.user_id || !params.token) return null;

  type RequiredParams = {
    [K in keyof Params]: Exclude<Params[K], null>;
  };

  return (
    <Form
      onSubmit={handleSubmit(({ password }) => {
        resetPasswordMutation({ password, ...(params as RequiredParams) });
      })}
    >
      <InputPassword
        autoComplete="new-password"
        autoFocus
        showPasswordDisplayToggle
        registration={register("password")}
        error={errors.password}
      />

      <Button type="submit" text="Redefinir minha senha" align="center" />
    </Form>
  );
}
