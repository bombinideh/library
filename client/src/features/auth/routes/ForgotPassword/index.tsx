import Button from "@/components/Button";
import Field from "@/components/Form/Field";
import AuthLayout from "../../components/Layout";

export default function ForgotPassword() {
  return (
    <AuthLayout
      head={{
        title: "Esqueceu sua senha?",
        index: false,
      }}
      title="Esqueceu sua senha?"
      description="Insira seu e-mail que lhe enviaremos um link para que você possa redefinir sua senha."
      returnLink={{
        to: "/",
        text: `Voltar para o login`,
      }}
    >
      <Field
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
      />

      <Button text="Enviar link para login" align="center" />
    </AuthLayout>
  );
}
