import ForgotPasswordForm from "../../components/ForgotPasswordForm";
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
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
