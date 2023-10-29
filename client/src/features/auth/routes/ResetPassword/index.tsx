import Button from "@/components/Elements/Button";
import Password from "@/components/Form/Password";
import AuthLayout from "../../components/Layout";

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
      <Password autoComplete="new-password" showPasswordDisplayToggle />

      <Button text="Redefinir minha senha" align="center" />
    </AuthLayout>
  );
}
