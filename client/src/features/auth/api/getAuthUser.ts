import { UserResponse } from "@/features/users/types";
import useFetch from "@/hooks/useFetch";
import { QueryOptions } from "@/types/react-query";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(queryOptions: QueryOptions<UserResponse>) {
  const request = useFetch<null, UserResponse>({ URL: "me", method: "GET" });

  return useQuery({
    ...queryOptions,
    queryKey: ["authUser"],
    queryFn: () => request(),
  });
}
