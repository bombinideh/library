import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table, { Column } from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { TableTitle } from "@/types/table";
import { getManipulableTableColumns } from "@/utils/getManipulableTableColumns";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useGetUsers from "../api/getUsers";
import { UserResponse } from "../types";
import CreateUser from "./CreateUser";

const columns: Column<UserResponse>[] = [
  {
    title: "#",
    key: "user_id",
  },
  {
    title: "Nome",
    key: "name",
  },
  {
    title: "E-mail",
    key: "email",
  },
  {
    title: "Ativo",
    key: "active",
    notManipulable: true,
  },
  {
    title: "Criado em",
    key: "created_at",
  },
];

export default function UsersList() {
  const { getManyQueryProps, ...tableStates } = useTable({
    searchColumn: "name",
  });
  const [createModal, setCreateModal] = useState(false);
  const result = useGetUsers(getManyQueryProps);
  const tableTitle: TableTitle = {
    singular: "Usuário",
    plural: "Usuários",
    gender: "O",
  };

  return (
    <>
      <AnimatePresence>
        {createModal && (
          <CreateUser
            tableTitle={tableTitle}
            showModal={createModal}
            setShowModal={setCreateModal}
            columns={getManipulableTableColumns(columns)}
          />
        )}
      </AnimatePresence>

      <Table<UserResponse>
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
      />
    </>
  );
}
