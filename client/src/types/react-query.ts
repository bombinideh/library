import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export interface RequestError {
  message: string;
  statusCode: number;
}

export type QueryOptions<T> = Omit<
  UseQueryOptions<T, RequestError>,
  "queryKey" | "queryFn"
>;

export type MutationOptions = Omit<UseMutationOptions, "mutationFn">;
