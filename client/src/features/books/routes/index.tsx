import Dashboard from "@/components/Layout/Dashboard";
import useAuth from "@/hooks/useAuth";

export default function Books() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Dashboard title="Livros">Livros</Dashboard>;

  return <>Livros</>;
}
