import Button from "@/components/Elements/Button";
import Password from "@/components/Form/Password";
import Form from "../Form";

export default function ResetPasswordForm() {
  return (
    <Form>
      <Password autoComplete="new-password" autoFocus showPasswordDisplayToggle />

      <Button text="Redefinir minha senha" align="center" />
    </Form>
  );
}
