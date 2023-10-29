import Button from "@/components/Elements/Button";
import Field from "@/components/Form/Field";
import Password from "@/components/Form/Password";
import Form from "../Form";

export default function SignInForm() {
  return (
    <Form>
      <Field
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
      />

      <Password showForgotPasswordLink showPasswordDisplayToggle />

      <Button text="Entrar" align="center" />
    </Form>
  );
}
