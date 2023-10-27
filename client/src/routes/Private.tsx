import { Route, Routes } from "react-router-dom";

export default function Private() {
  return (
    <Routes>
      <Route path="*" element={<>Private route</>} />
    </Routes>
  );
}
