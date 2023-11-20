import useFetch from "@/hooks/useFetch";
import { GetManyQueryPropsHook } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { ReportResponse, ReportsResponse } from "../types";

export default function useGetReports({
  queryOptions = {},
  ...queryParams
}: GetManyQueryPropsHook<ReportResponse> = {}) {
  const request = useFetch<null, ReportsResponse>({
    URL: "logs",
    method: "GET",
    queryParams,
  });
  const result = useQuery({
    ...queryOptions,
    queryKey: ["logs"],
    queryFn: () => request(),
  });

  return result;
}
