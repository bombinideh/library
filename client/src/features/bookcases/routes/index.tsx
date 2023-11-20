import Dashboard from "@/components/Layout/Dashboard";
import BookcasesList from "../components/BookcasesList";

export default function Bookcases() {
  return (
    <Dashboard title="Estantes">
      <BookcasesList />
    </Dashboard>
  );
}
