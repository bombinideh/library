import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import Password from "@/components/Form/Password";
import { appName, appNameAcronym } from "@/config";
import AuthLayout from "../../components/Layout";

export default function SignIn() {
  return (
    <AuthLayout
      head={{
        title: "Entrar",
        description: `Faça login na sua conta e gerencie todo o acervo histórico do ${appName}`,
        index: true,
      }}
      logo
      title="Entre para gerenciar o acervo histórico"
      returnLink={{
        to: "https://ceac.org.br/",
        text: `Voltar para o ${appNameAcronym}`,
      }}
    >
      <Input
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
      />

      <Password showForgotPasswordLink showPasswordDisplayToggle />

      <Button text="Entrar" />
    </AuthLayout>
  );
}
