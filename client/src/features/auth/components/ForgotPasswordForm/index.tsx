import Button from "@/components/Elements/Button";
import InputField from "@/components/Form/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useForgotPassword from "../../api/forgotPassword";
import Form from "../Form";

const schema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
});

export type ForgotPasswordData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(schema),
  });
  const { forgotPasswordMutation } = useForgotPassword();

  return (
    <Form
      onSubmit={handleSubmit(({ email }) => {
        forgotPasswordMutation({
          email,
          url: `${location.origin}/auth/esqueceu-sua-senha`,
        });
      })}
    >
      <InputField
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
        registration={register("email")}
        error={errors.email}
      />

      <Button type="submit" text="Enviar link para login" align="center" />
    </Form>
  );
}
