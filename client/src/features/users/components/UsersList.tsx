import SVGPlus from "@/assets/plus.svg?react";
import Button from "@/components/Elements/Button";
import Table from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { TableTitle } from "@/types/table";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useGetUsers from "../api/getUsers";
import CreateUser from "./CreateUser";

const columns = [
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
  },
];

export default function UsersList() {
  const { filter, setFilter, pagination, setPagination, getManyQueryProps } =
    useTable({
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
            columns={columns.filter(({ key }) => ["name", "email"].includes(key))}
          />
        )}
      </AnimatePresence>

      <Table
        tableTitle={tableTitle}
        queryResult={result}
        columns={columns}
        filterColumns={["name", "email"]}
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
      />
    </>
  );
}
