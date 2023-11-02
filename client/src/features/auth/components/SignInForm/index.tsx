import Button from "@/components/Elements/Button";
import Field from "@/components/Form/Field";
import Password from "@/components/Form/Password";
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
  password: z.string().min(1, "A senha é obrigatória"),
});

type SignInData = z.infer<typeof schema>;

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<SignInData>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });
  const signIn: SubmitHandler<SignInData> = data => {
    console.log(data);
  };

  useFormError(formState);

  return (
    <Form onSubmit={handleSubmit(signIn)}>
      <Field
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
        registration={register("email")}
      />

      <Password
        showForgotPasswordLink
        showPasswordDisplayToggle
        registration={register("password")}
      />

      <Button type="submit" text="Entrar" align="center" />
    </Form>
  );
}
