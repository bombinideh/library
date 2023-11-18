import { Shelf } from "@/features/shelfs/types";
import useFetch from "@/hooks/useFetch";
import { GetManyQueryPropsHook } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Box, BoxesResponse } from "../types";

interface UseGetBoxesProps extends GetManyQueryPropsHook<Box> {
  shelf_id?: Shelf["shelf_id"];
}

export default function useGetBoxes({
  queryOptions = {},
  ...queryParams
}: UseGetBoxesProps = {}) {
  const request = useFetch<null, BoxesResponse>({
    URL: "boxes",
    method: "GET",
    queryParams,
  });
  const result = useQuery({
    ...queryOptions,
    queryKey: ["boxes"],
    queryFn: () => request(),
  });

  useEffect(() => {
    if (queryOptions.enabled) result.refetch();
  }, [queryParams.searchColumn, queryParams.searchQuery, queryParams.shelf_id]);

  return result;
}
