import Button from "@/components/Elements/Button";
import { default as InputPassword } from "@/components/Form/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Form from "../Form";

const schema = z.object({
  password: z
    .string()
    .min(1, "Digite uma nova senha.")
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

type ResetPasswordData = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });
  const resetPassword: SubmitHandler<ResetPasswordData> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(resetPassword)}>
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
