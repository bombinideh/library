import { Column, TableTitle } from "@/@types/table";
import Table from "@/components/Elements/Table";
import useTable from "@/hooks/useTable";
import { ReportResponse } from "../@types";
import useGetReports from "../api/getReports";

const columns: Column<ReportResponse>[] = [
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
  const { getManyQueryProps, ...tableStates } = useTable({
    searchColumn: "user_name",
  });

  const result = useGetReports(getManyQueryProps);
  const tableTitle: TableTitle = {
    singular: "Relatório",
    plural: "Relatórios",
    gender: "O",
  };

  return (
    <Table<ReportResponse>
      {...tableStates}
      tableTitle={tableTitle}
      queryResult={result}
      columns={columns}
    />
  );
}
