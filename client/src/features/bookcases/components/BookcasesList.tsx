import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table, { Column } from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { TableTitle } from "@/types/table";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useGetBookcases from "../api/getBookcases";
import { Bookcase, BookcaseResponse } from "../types";
import CreateBookcase from "./CreateBookcase";
import EditBookcase from "./EditBookcase";

const columns: Column<BookcaseResponse>[] = [
  {
    title: "#",
    key: "bookcase_id",
  },
  {
    title: "Nome",
    key: "name",
  },
  {
    title: "Ativo",
    key: "active",
  },
  {
    title: "Data do cadastro",
    key: "created_at",
  },
];

export default function BookcasesList() {
  const { getManyQueryProps, ...tableStates } = useTable({
    searchColumn: "name",
  });
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [bookcaseToChange, setBookcaseToChange] = useState({});
  const result = useGetBookcases(getManyQueryProps);
  const tableTitle: TableTitle = {
    singular: "Estante",
    plural: "Estantes",
    gender: "A",
  };

  return (
    <>
      <AnimatePresence>
        {createModal && (
          <CreateBookcase
            tableTitle={tableTitle}
            showModal={createModal}
            setShowModal={setCreateModal}
            columns={columns.filter(({ key }) => key === "name")}
          />
        )}

        {editModal && (
          <EditBookcase
            tableTitle={tableTitle}
            showModal={editModal}
            setShowModal={setEditModal}
            columns={columns.filter(({ key }) => ["name", "active"].includes(key))}
            bookcase={bookcaseToChange as Bookcase}
          />
        )}
      </AnimatePresence>

      <Table<BookcaseResponse>
        {...tableStates}
        tableTitle={tableTitle}
        queryResult={result}
        columns={columns}
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
            onClick: bookcase => {
              setBookcaseToChange(bookcase);
              setEditModal(true);
            },
          },
        ]}
      />
    </>
  );
}
