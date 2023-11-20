import Dashboard from "@/components/Layout/Dashboard";
import UsersList from "../../components/UsersList";

export default function Users() {
  return (
    <Dashboard title="Usuários">
      <UsersList />
    </Dashboard>
  );
}
