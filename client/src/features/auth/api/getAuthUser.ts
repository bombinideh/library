import useFetch from "@/hooks/useFetch";
import { QueryOptions } from "@/types/react-query";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types";

export default function useGetUser(queryOptions: QueryOptions<User>) {
  const request = useFetch<null, User>({ URL: "me", method: "GET" });

  return useQuery({
    ...queryOptions,
    queryKey: ["user"],
    queryFn: () => request(),
  });
}
