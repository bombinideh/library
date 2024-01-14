import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table, { Column } from "@/components/Elements/Table";
import useAuth from "@/hooks/useAuth";
import useTable from "@/hooks/useTable";
import { TableTitle } from "@/types/table";
import { getManipulableTableColumns } from "@/utils/getManipulableTableColumns";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetBooks from "../api/getBooks";
import { BookResponse } from "../types";
import CreateBook from "./CreateBook";
import DeleteBook from "./DeleteBook";
import EditBook from "./EditBook";

const columns: Column<BookResponse>[] = [
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
    title: "Autor do cadastro",
    key: "user_name",
  },
  {
    title: "Data do cadastro",
    key: "created_at",
  },
];

export default function BooksList() {
  const { getManyQueryProps, ...tableStates } = useTable({
    searchColumn: "title",
  });
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookToChange, setBookToChange] = useState({});
  const result = useGetBooks(getManyQueryProps);
  const tableTitle: TableTitle = {
    singular: "Livro",
    plural: "Livros",
    gender: "O",
  };
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <AnimatePresence>
        {createModal && (
          <CreateBook
            tableTitle={tableTitle}
            showModal={createModal}
            setShowModal={setCreateModal}
            columns={getManipulableTableColumns(columns)}
          />
        )}

        {editModal && (
          <EditBook
            tableTitle={tableTitle}
            showModal={editModal}
            setShowModal={setEditModal}
            columns={getManipulableTableColumns(columns)}
            book={bookToChange as BookResponse}
          />
        )}

        {deleteModal && (
          <DeleteBook
            tableTitle={tableTitle}
            showModal={deleteModal}
            setShowModal={setDeleteModal}
            book={bookToChange as BookResponse}
          />
        )}
      </AnimatePresence>

      <Table
        {...tableStates}
        tableTitle={tableTitle}
        queryResult={result}
        columns={columns}
        CreateButton={
          <Button
            SVG={{ Component: SVGPlus }}
            text={`Cadastrar ${tableTitle.singular.toLowerCase()}`}
            onClick={() => {
              if (isAuthenticated) setCreateModal(true);
              else navigate("/");
            }}
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
