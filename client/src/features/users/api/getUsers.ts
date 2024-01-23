import { GetManyQueryPropsHook } from "@/@types/api";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { UserResponse, UsersResponse } from "../@types";

export default function useGetUsers({
  queryOptions = {},
  ...queryParams
}: GetManyQueryPropsHook<UserResponse> = {}) {
  const request = useFetch<null, UsersResponse>({
    URL: "users",
    method: "GET",
    queryParams,
  });
  const result = useQuery({
    ...queryOptions,
    queryKey: ["users"],
    queryFn: () => request(),
  });

  return result;
}
