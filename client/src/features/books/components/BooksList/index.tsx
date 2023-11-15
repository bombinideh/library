import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table from "@/components/Elements/Table";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useGetBooks from "../../api/getBooks";
import { Book, ResponseBook } from "../../types";
import CreateBook from "../CreateBook";
import DeleteBook from "../DeleteBook";
import EditBook from "../EditBook";

const columns = [
  {
    title: "#",
    key: "book_id",
  },
  {
    title: "Título",
    key: "title",
  },
  {
    title: "Autor",
    key: "author",
  },
  {
    title: "Editora",
    key: "publisher",
  },
  {
    title: "Nº de páginas",
    key: "number_pages",
  },
  {
    title: "Ano de publicação",
    key: "year_publication",
  },
  {
    title: "Unidades",
    key: "amount",
  },
  {
    title: "Observação",
    key: "observation",
  },
  {
    title: "Estante",
    key: "bookcase_name",
  },
  {
    title: "Prateleira",
    key: "shelf_name",
  },
  {
    title: "Caixa",
    key: "box_name",
  },
  {
    title: "Cadastrado por",
    key: "user_name",
  },
];

export default function BooksList() {
  const [filter, setFilter] = useState({
    searchColumn: "title",
    searchQuery: "",
  });
  const { data: books, isLoading, isError } = useGetBooks({ items: 10, page: 1, ...filter });
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookToChange, setBookToChange] = useState({});

  if (isLoading) return <>Carregando...</>;

  if (isError) return <>Um erro ocorreu.</>;

  if (!books) return <>Nenhum livro para exibir.</>;

  return (
    <>
      <AnimatePresence>
        {createModal && (
          <CreateBook
            showState={createModal}
            setShowState={setCreateModal}
            columns={columns}
          />
        )}

        {editModal && (
          <EditBook
            showState={editModal}
            setShowState={setEditModal}
            columns={columns}
            book={bookToChange as Book}
          />
        )}

        {deleteModal && (
          <DeleteBook
            showState={deleteModal}
            setShowState={setDeleteModal}
            book={bookToChange as Book}
          />
        )}
      </AnimatePresence>

      <Table<ResponseBook>
        data={books}
        columns={columns}
        filter={{ filter, setFilter }}
        CreateButton={
          <Button
            SVG={{ Component: SVGPlus }}
            text="Cadastrar livro"
            onClick={() => setCreateModal(true)}
          />
        }
        actions={[
          {
            text: "Editar",
            onClick: book => {
              setBookToChange(book);
              setEditModal(true);
            },
          },
          {
            text: "Excluir",
            onClick: book => {
              setBookToChange(book);
              setDeleteModal(true);
            },
          },
        ]}
      />
    </>
  );
}
