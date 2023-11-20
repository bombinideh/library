import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { EditBookData } from "../components/EditBook";
import { Book } from "../types";

interface UseEditBookProps {
  book_id: Book["book_id"];
  tableTitle: TableTitle;
}

export default function useEditBook({ book_id, tableTitle }: UseEditBookProps) {
  const request = useFetch<EditBookData, Book>({
    URL: `books/${book_id}`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: book => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      emitNotification({
        text: successMessage(tableTitle, book.title, "PATCH"),
        variant: "success",
      });
    },
  });

  return { editBookMutation: mutateAsync, ...rest };
}
