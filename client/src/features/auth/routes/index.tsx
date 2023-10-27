import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="esqueceu-sua-senha" element={<></>} />
      <Route path="redefinir-senha" element={<></>} />
    </Routes>
  );
}
