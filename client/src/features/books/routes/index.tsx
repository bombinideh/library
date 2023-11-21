import Head from "@/components/Head";
import Dashboard from "@/components/Layout/Dashboard";
import useAuth from "@/hooks/useAuth";
import BooksList from "../components/BooksList";

export default function Books() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated)
    return (
      <Dashboard title="Livros">
        <BooksList />
      </Dashboard>
    );

  return (
    <>
      <Head title="Livros" index={true} />

      <BooksList />
    </>
  );
}
