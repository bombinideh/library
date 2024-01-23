import { GetManyQueryPropsHook } from "@/@types/api";
import { Shelf } from "@/features/shelfs/@types";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BoxResponse, BoxesResponse } from "../@types";

interface UseGetBoxesProps extends GetManyQueryPropsHook<BoxResponse> {
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
  }, [queryParams.shelf_id]);

  return result;
}
