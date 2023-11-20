import { UserResponse } from "@/features/auth/types";
import useFetch from "@/hooks/useFetch";
import { GetManyQueryPropsHook } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { UsersResponse } from "../types";

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
