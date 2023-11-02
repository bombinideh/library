import { ChangeEventHandler, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import * as Form from "../styles";
import * as Styled from "./styles";

interface PasswordProps {
  label?: string;
  id?: string;
  registration: UseFormRegisterReturn;
  autoComplete?: "current-password" | "new-password";
  autoFocus?: boolean;
  showForgotPasswordLink?: boolean;
  showPasswordDisplayToggle?: boolean;
}

const defaultProps: Required<Omit<PasswordProps, "registration">> = {
  label: "Senha",
  id: "password",
  autoComplete: "current-password",
  autoFocus: false,
  showForgotPasswordLink: false,
  showPasswordDisplayToggle: false,
};

export default function Password(props: PasswordProps) {
  const {
    label,
    id,
    registration,
    showForgotPasswordLink,
    showPasswordDisplayToggle,
    ...rest
  } = { ...defaultProps, ...props };
  const [showPassBtn, setShowPassBtn] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const toggleShowPassBtn: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.value.length) setShowPassBtn(true);
    else setShowPassBtn(false);
  };

  return (
    <Form.Wrapper>
      <Form.Label htmlFor={id}>{label}</Form.Label>

      {showForgotPasswordLink && (
        <Styled.ForgotPassword text="Esqueceu sua senha?" to="esqueceu-sua-senha" />
      )}

      {showPasswordDisplayToggle ? (
        <Styled.PasswordWrapper>
          <Styled.Input
            id={id}
            type={showPass ? "text" : "password"}
            {...registration}
            {...rest}
            onChange={toggleShowPassBtn}
            $showPassBtn={showPassBtn}
          />

          {showPassBtn && (
            <Styled.ToggleShowPassword
              type="button"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Ocultar" : "Exibir"}
            </Styled.ToggleShowPassword>
          )}
        </Styled.PasswordWrapper>
      ) : (
        <Form.Input id={id} type="password" {...registration} {...rest} />
      )}
    </Form.Wrapper>
  );
}
