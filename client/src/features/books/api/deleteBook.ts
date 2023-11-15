import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { Book } from "../types";

export default function useDeleteBook(bookId: Book["book_id"]) {
  const request = useFetch<null, Book>({
    URL: `books/${bookId}`,
    method: "DELETE",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: book => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      emitNotification({
        text: `O livro "${book.title}" foi deletado!`,
        variant: "success",
      });
    },
  });

  return { deleteBookMutation: mutateAsync, ...rest };
}
