import { Bookcase } from "@/features/bookcases/types";
import useFetch from "@/hooks/useFetch";
import { GetManyQueryPropsHook } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Shelf, ShelfsResponse } from "../types";

interface UseGetShelfsProps extends GetManyQueryPropsHook<Shelf> {
  bookcase_id?: Bookcase["bookcase_id"];
}

export default function useGetShelfs({
  queryOptions = {},
  ...queryParams
}: UseGetShelfsProps = {}) {
  const request = useFetch<null, ShelfsResponse>({
    URL: "shelfs",
    method: "GET",
    queryParams,
  });
  const result = useQuery({
    ...queryOptions,
    queryKey: ["shelfs"],
    queryFn: () => request(),
  });

  useEffect(() => {
    if (queryOptions.enabled) result.refetch();
  }, [queryParams.searchColumn, queryParams.searchQuery, queryParams.bookcase_id]);

  return result;
}
