import useFetch from "@/hooks/useFetch";
import { GetManyQueryPropsHook } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Bookcase, BookcasesResponse } from "../types";

export default function useGetBookcases({
  queryOptions = {},
  ...queryParams
}: GetManyQueryPropsHook<Bookcase> = {}) {
  const request = useFetch<null, BookcasesResponse>({
    URL: "bookcases",
    method: "GET",
    queryParams,
  });
  const result = useQuery({
    ...queryOptions,
    queryKey: ["bookcases"],
    queryFn: () => request(),
  });

  return result;
}
