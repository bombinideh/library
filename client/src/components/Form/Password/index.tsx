import * as Form from "../styles";
import * as Styled from "./styles";

interface PasswordProps {
  label?: string;
  id?: string;
  type?: "password" | "text";
  autoComplete?: "current-password" | "new-password";
  autoFocus?: boolean;
  showForgotPasswordLink?: boolean;
  showPasswordDisplayToggle?: boolean;
}

const defaultProps: PasswordProps = {
  label: "Senha",
  id: "password",
  type: "password",
  autoComplete: "current-password",
  autoFocus: false,
  showForgotPasswordLink: false,
  showPasswordDisplayToggle: false,
};

export default function Password(receivedProps: PasswordProps = {}) {
  const {
    label,
    id,
    type,
    showForgotPasswordLink,
    showPasswordDisplayToggle,
    ...rest
  } = { ...defaultProps, ...receivedProps };
  return (
    <Form.Wrapper>
      <Form.Label htmlFor={id}>{label}</Form.Label>

      {showForgotPasswordLink && (
        <Styled.ForgotPassword text="Esqueceu sua senha?" to="esqueceu-sua-senha" />
      )}

      {showPasswordDisplayToggle ? (
        <Styled.PasswordWrapper>
          <Styled.Input id={id} name={id} type={type} {...rest} />

          <Styled.ToggleShowPassword type="button">Exibir</Styled.ToggleShowPassword>
        </Styled.PasswordWrapper>
      ) : (
        <Form.Input id={id} name={id} type={type} {...rest} />
      )}
    </Form.Wrapper>
  );
}
