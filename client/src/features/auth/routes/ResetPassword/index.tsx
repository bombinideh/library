import AuthLayout from "../../components/Layout";
import ResetPasswordForm from "../../components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <AuthLayout
      head={{
        title: "Redefinir senha",
        index: false,
      }}
      title="Crie sua nova senha"
      description="Insira uma nova senha para acessar sua conta."
      returnLink={{
        to: "/",
        text: `Voltar para o login`,
      }}
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
