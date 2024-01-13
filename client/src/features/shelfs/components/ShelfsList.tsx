import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { TableTitle } from "@/types/table";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useGetShelfs from "../api/getShelfs";
import { Shelf } from "../types";
import CreateShelf from "./CreateShelf";
import EditShelf from "./EditShelf";

const columns = [
  {
    title: "#",
    key: "shelf_id",
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

export default function ShelfsList() {
  const { filter, setFilter, pagination, setPagination, getManyQueryProps } =
    useTable({
      searchColumn: "name",
    });
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [shelfToChange, setShelfToChange] = useState({});
  const result = useGetShelfs(getManyQueryProps);
  const tableTitle: TableTitle = {
    singular: "Prateleira",
    plural: "Prateleiras",
    gender: "A",
  };

  return (
    <>
      <AnimatePresence>
        {createModal && (
          <CreateShelf
            tableTitle={tableTitle}
            showModal={createModal}
            setShowModal={setCreateModal}
            columns={columns.filter(({ key }) => key === "name")}
          />
        )}

        {editModal && (
          <EditShelf
            tableTitle={tableTitle}
            showModal={editModal}
            setShowModal={setEditModal}
            columns={columns.filter(({ key }) => ["name", "active"].includes(key))}
            shelf={shelfToChange as Shelf}
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
            onClick: shelf => {
              setShelfToChange(shelf);
              setEditModal(true);
            },
          },
        ]}
      />
    </>
  );
}
