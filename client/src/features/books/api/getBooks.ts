import useFetch from "@/hooks/useFetch";
import { QueryOptions } from "@/types/react-query";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BooksResponse } from "../types";

interface UseGetBooks {
  queryOptions?: QueryOptions<BooksResponse>;
  items?: number;
  page?: number;
  searchColumn?: string;
  searchQuery?: string;
}

const defaultProps: Required<Omit<UseGetBooks, "searchColumn" | "searchQuery">> = {
  queryOptions: {},
  items: 10,
  page: 1,
};

export default function useGetBooks(props: UseGetBooks) {
  const { queryOptions, items, page, searchColumn, searchQuery } = {
    ...defaultProps,
    ...props,
  };
  const filter = `&searchColumn=${searchColumn}&searchQuery=${searchQuery}`;
  const request = useFetch<null, BooksResponse>({
    URL: `books?items=${items}&page=${page}${
      searchColumn && searchQuery ? filter : ""
    }`,
    method: "GET",
  });

  const result = useQuery({
    ...queryOptions,
    queryKey: ["books"],
    queryFn: () => request(),
  });

  useEffect(() => {
    result.refetch();
  }, [searchColumn, searchQuery]);

  return result;
}
