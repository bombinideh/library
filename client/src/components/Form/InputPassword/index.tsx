import { ChangeEventHandler, useState } from "react";
import Field from "../Field";
import FieldWrapper from "../FieldWrapper";
import { IField } from "../form";
import * as Styled from "./styles";

interface InputPasswordProps {
  label?: IField["label"];
  id?: IField["label"];
  registration: IField["registration"];
  error: IField["error"];
  autoFocus?: IField["autoFocus"];
  autoComplete?: "current-password" | "new-password";
  showForgotPasswordLink?: boolean;
  showPasswordDisplayToggle?: boolean;
}

const defaultProps: Required<Omit<InputPasswordProps, "registration" | "error">> = {
  label: "Senha",
  id: "password",
  autoFocus: false,
  autoComplete: "current-password",
  showForgotPasswordLink: false,
  showPasswordDisplayToggle: false,
};

export default function InputPassword(props: InputPasswordProps) {
  const {
    label,
    id,
    registration,
    error,
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
  const defaultFieldProps = { id, error, registration, ...rest };

  return (
    <FieldWrapper label={label} id={id} error={error}>
      {showForgotPasswordLink && (
        <Styled.ForgotPassword text="Esqueceu sua senha?" to="esqueceu-sua-senha" />
      )}

      {showPasswordDisplayToggle ? (
        <Styled.PasswordWrapper>
          <Styled.Field
            {...defaultFieldProps}
            type={showPass ? "text" : "password"}
            onChange={toggleShowPassBtn}
            $showPassBtn={showPassBtn}
          />

          {showPassBtn && (
            <Styled.ToggleShowPassword
              type="button"
              onClick={() => setShowPass(!showPass)}
              $error={!!error}
            >
              {showPass ? "Ocultar" : "Exibir"}
            </Styled.ToggleShowPassword>
          )}
        </Styled.PasswordWrapper>
      ) : (
        <Field type="password" {...defaultFieldProps} />
      )}
    </FieldWrapper>
  );
}
