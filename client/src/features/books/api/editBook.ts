import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { EditBookData } from "../components/EditBook";
import { Book } from "../types";

export default function useEditBook(bookId: Book["book_id"]) {
  const request = useFetch<EditBookData, Book>({
    URL: `books/${bookId}`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: book => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      emitNotification({
        text: `O livro "${book.title}" foi editado!`,
        variant: "success",
      });
    },
  });

  return { editBookMutation: mutateAsync, ...rest };
}
