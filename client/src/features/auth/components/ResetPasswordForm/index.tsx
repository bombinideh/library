import Button from "@/components/Elements/Button";
import Password from "@/components/Form/Password";
import useFormError from "@/hooks/useFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Form from "../Form";

const schema = z.object({
  password: z
    .string()
    .min(1, "Digite uma nova senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type ResetPasswordData = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const { register, handleSubmit, formState } = useForm<ResetPasswordData>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });
  const resetPassword: SubmitHandler<ResetPasswordData> = data => {
    console.log(data);
  };

  useFormError(formState);

  return (
    <Form onSubmit={handleSubmit(resetPassword)}>
      <Password
        autoComplete="new-password"
        autoFocus
        showPasswordDisplayToggle
        registration={register("password")}
      />

      <Button type="submit" text="Redefinir minha senha" align="center" />
    </Form>
  );
}
