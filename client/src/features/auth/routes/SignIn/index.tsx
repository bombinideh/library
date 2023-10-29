import { appName, appNameAcronym } from "@/config";
import AuthLayout from "../../components/Layout";
import SignInForm from "../../components/SignInForm";

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
      <SignInForm />
    </AuthLayout>
  );
}
