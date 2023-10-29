import Button from "@/components/Elements/Button";
import Field from "@/components/Form/Field";
import Form from "../Form";

export default function ForgotPasswordForm() {
  return (
    <Form>
      <Field
        label="Endereço de e-mail"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
      />

      <Button text="Enviar link para login" align="center" />
    </Form>
  );
}
