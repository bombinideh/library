import Button from "@/components/Elements/Button";
import InputField from "@/components/Form/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Form from "../Form";

const schema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
});

type ForgotPasswordData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(schema),
  });
  const resetPassword: SubmitHandler<ForgotPasswordData> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(resetPassword)}>
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
