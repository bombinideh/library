import ContentLayout from "@/components/Layout/ContentLayout";
import Dashboard from "@/components/Layout/Dashboard";
import { Route, Routes } from "react-router-dom";

export default function Private() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route
          path="/"
          element={
            <ContentLayout title="Página inicial">Private route</ContentLayout>
          }
        />
      </Route>
    </Routes>
  );
}
