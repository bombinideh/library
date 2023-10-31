import AuthRoutes from "@/features/auth/routes";
import { Route, Routes } from "react-router-dom";

export default function Public() {
  return (
    <Routes>
      <Route path="*" element={<AuthRoutes />} />
    </Routes>
  );
}
