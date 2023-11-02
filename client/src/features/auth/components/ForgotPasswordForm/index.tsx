import Button from "@/components/Elements/Button";
import Field from "@/components/Form/Field";
import useFormError from "@/hooks/useFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Form from "../Form";

const schema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
});

type ForgotPasswordData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState } = useForm<ForgotPasswordData>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });
  const resetPassword: SubmitHandler<ForgotPasswordData> = data => {
    console.log(data);
  };

  useFormError(formState);

  return (
    <Form onSubmit={handleSubmit(resetPassword)}>
      <Field
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
        registration={register("email")}
      />

      <Button type="submit" text="Enviar link para login" align="center" />
    </Form>
  );
}
