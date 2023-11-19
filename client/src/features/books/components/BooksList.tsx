import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { TableTitle } from "@/types/table";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useGetBooks from "../api/getBooks";
import { BookResponse } from "../types";
import CreateBook from "./CreateBook";
import DeleteBook from "./DeleteBook";
import EditBook from "./EditBook";

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
    title: "Autor do cadastro",
    key: "user_name",
  },
];

export default function BooksList() {
  const { filter, setFilter, pagination, setPagination, getManyQueryProps } =
    useTable({
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
  const manipulateColumns = columns.filter(({ key }) => {
    const ignore = [
      "book_id",
      "user_name",
      "bookcase_name",
      "shelf_name",
      "box_name",
    ];

    return !ignore.includes(key);
  });

  return (
    <>
      <AnimatePresence>
        {createModal && (
          <CreateBook
            tableTitle={tableTitle}
            showState={createModal}
            setShowState={setCreateModal}
            columns={manipulateColumns}
          />
        )}

        {editModal && (
          <EditBook
            tableTitle={tableTitle}
            showState={editModal}
            setShowState={setEditModal}
            columns={manipulateColumns}
            book={bookToChange as BookResponse}
          />
        )}

        {deleteModal && (
          <DeleteBook
            tableTitle={tableTitle}
            showState={deleteModal}
            setShowState={setDeleteModal}
            book={bookToChange as BookResponse}
          />
        )}
      </AnimatePresence>

      <Table
        tableTitle={tableTitle}
        queryResult={result}
        columns={columns}
        filterColumns={["title", "author", "publisher", "observation"]}
        filter={filter}
        setFilter={setFilter}
        pagination={pagination}
        setPagination={setPagination}
        CreateButton={
          <Button
            SVG={{ Component: SVGPlus }}
            text={`Cadastrar ${tableTitle.singular.toLowerCase()}`}
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
