import Button from "@/components/Elements/Button";
import InputField from "@/components/Form/InputField";
import InputPassword from "@/components/Form/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Form from "../Form";

const schema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

type SignInData = z.infer<typeof schema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(schema),
  });
  const signIn: SubmitHandler<SignInData> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(signIn)}>
      <InputField
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
        registration={register("email")}
        error={errors.email}
      />

      <InputPassword
        showForgotPasswordLink
        showPasswordDisplayToggle
        registration={register("password")}
        error={errors.password}
      />

      <Button type="submit" text="Entrar" align="center" />
    </Form>
  );
}
