import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { CreateUniqueBookData } from "../components/CreateBook/CreateUniqueBook";
import { Book } from "../types";

export default function useCreateUniqueBook(tableTitle: TableTitle) {
  const request = useFetch<CreateUniqueBookData, Book>({
    URL: "books",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: book => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      emitNotification({
        text: successMessage(tableTitle, book.title, "POST"),
        variant: "success",
      });
    },
  });

  return { createUniqueBookMutation: mutateAsync, ...rest };
}
