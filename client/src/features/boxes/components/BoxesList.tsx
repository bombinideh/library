import { Column, TableTitle } from "@/@types/table";
import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BoxResponse } from "../@types";
import useGetBoxes from "../api/getBoxes";
import CreateBox from "./CreateBox";
import EditBox from "./EditBox";

const columns: Column<BoxResponse>[] = [
  {
    title: "#",
    key: "box_id",
  },
  {
    title: "Nome",
    key: "name",
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
    title: "Ativo",
    key: "active",
  },
  {
    title: "Data do cadastro",
    key: "created_at",
  },
];

export default function BoxesList() {
  const { getManyQueryProps, ...tableStates } = useTable({
    searchColumn: "name",
  });
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [boxToChange, setBoxToChange] = useState({});
  const result = useGetBoxes(getManyQueryProps);
  const tableTitle: TableTitle = {
    singular: "Caixa",
    plural: "Caixas",
    gender: "A",
  };

  return (
    <>
      <AnimatePresence>
        {createModal && (
          <CreateBox
            tableTitle={tableTitle}
            showModal={createModal}
            setShowModal={setCreateModal}
            columns={columns.filter(({ key }) => key === "name")}
          />
        )}

        {editModal && (
          <EditBox
            tableTitle={tableTitle}
            showModal={editModal}
            setShowModal={setEditModal}
            columns={columns.filter(({ key }) => ["name", "active"].includes(key))}
            box={boxToChange as BoxResponse}
          />
        )}
      </AnimatePresence>

      <Table<BoxResponse>
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
            onClick: box => {
              setBoxToChange(box);
              setEditModal(true);
            },
          },
        ]}
      />
    </>
  );
}
