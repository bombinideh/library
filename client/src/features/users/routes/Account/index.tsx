import Title from "@/components/Elements/Title";
import Dashboard from "@/components/Layout/Dashboard";
import UpdateUserInfosForm from "../../components/UpdateUserInfosForm";
import UpdateUserPassForm from "../../components/UpdateUserPassForm";
import * as Styled from "./styles";

export default function Account() {
  return (
    <Dashboard title="Minha conta">
      <Styled.Wrapper>
        <Styled.Section>
          <Styled.Texts>
            <Title level={4} text="Informações pessoais" headingElement="h2" />

            <p>Informações gerais da sua conta.</p>
          </Styled.Texts>

          <UpdateUserInfosForm />
        </Styled.Section>

        <Styled.Section>
          <Styled.Texts>
            <Title level={4} text="Senha e segurança" headingElement="h2" />

            <p>Alterar sua senha atual para uma nova.</p>
          </Styled.Texts>

          <UpdateUserPassForm />
        </Styled.Section>
      </Styled.Wrapper>
    </Dashboard>
  );
}
