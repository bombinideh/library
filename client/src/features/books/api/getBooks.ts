import useFetch from "@/hooks/useFetch";
import { GetManyQueryPropsHook } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { BookResponse, BooksResponse } from "../types";

export default function useGetBooks({
  queryOptions = {},
  ...queryParams
}: GetManyQueryPropsHook<BookResponse>) {
  const request = useFetch<null, BooksResponse>({
    URL: "books",
    method: "GET",
    queryParams,
  });
  const result = useQuery({
    ...queryOptions,
    queryKey: ["books"],
    queryFn: () => request(),
  });

  return result;
}
