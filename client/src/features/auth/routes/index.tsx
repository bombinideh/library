import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="esqueceu-sua-senha" element={<ForgotPassword />} />
      <Route path="redefinir-senha" element={<ResetPassword />} />
    </Routes>
  );
}
