import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { useMutation } from "@tanstack/react-query";
import { CreateManyBookData } from "../components/CreateBook/CreateManyBook/CreateManyBook";
import { Book } from "../types";

export default function useCreateManyBook(tableTitle: TableTitle) {
  const request = useFetch<CreateManyBookData, Book[]>({
    URL: "books/many",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      emitNotification({
        text: `Os ${tableTitle.plural.toLowerCase()} foram criados!`,
        variant: "success",
      });
    },
  });

  return { createManyBookMutation: mutateAsync, ...rest };
}
