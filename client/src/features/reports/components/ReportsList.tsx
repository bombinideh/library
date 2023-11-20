import Table from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { TableTitle } from "@/types/table";
import useGetReports from "../api/getReports";

const columns = [
  {
    title: "#",
    key: "log_id",
  },
  {
    title: "Autor",
    key: "user_name",
  },
  {
    title: "Descrição",
    key: "description",
  },
  {
    title: "Data",
    key: "created_at",
  },
];

export default function ReportsList() {
  const { filter, setFilter, pagination, setPagination, getManyQueryProps } =
    useTable({
      searchColumn: "description",
    });

  const result = useGetReports(getManyQueryProps);
  const tableTitle: TableTitle = {
    singular: "Relatório",
    plural: "Relatórios",
    gender: "O",
  };

  return (
    <Table
      tableTitle={tableTitle}
      queryResult={result}
      columns={columns}
      filterColumns={["description"]}
      filter={filter}
      setFilter={setFilter}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
