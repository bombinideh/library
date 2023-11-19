import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { TableTitle } from "@/types/table";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useGetBookcases from "../api/getBookcases";
import { Bookcase } from "../types";
import CreateBookcase from "./CreateBookcase";
import EditBookcase from "./EditBookcase";

const columns = [
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
];

export default function BookcasesList() {
  const { filter, setFilter, pagination, setPagination, getManyQueryProps } =
    useTable({
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
            showState={createModal}
            setShowState={setCreateModal}
            columns={columns.filter(({ key }) => key === "name")}
          />
        )}

        {editModal && (
          <EditBookcase
            tableTitle={tableTitle}
            showState={editModal}
            setShowState={setEditModal}
            columns={columns.filter(({ key }) => ["name", "active"].includes(key))}
            bookcase={bookcaseToChange as Bookcase}
          />
        )}
      </AnimatePresence>

      <Table
        tableTitle={tableTitle}
        queryResult={result}
        columns={columns}
        filterColumns={["name"]}
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
