import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { Book } from "../types";

interface UseDeleteBookProps {
  bookId: Book["book_id"];
  setModalState: ModalStateProps["setShowState"];
  tableTitle: TableTitle;
}

export default function useDeleteBook({
  bookId,
  setModalState,
  tableTitle,
}: UseDeleteBookProps) {
  const request = useFetch<null, Book>({
    URL: `books/${bookId}`,
    method: "DELETE",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: book => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setModalState(false);

      emitNotification({
        text: successMessage(tableTitle, book.title, "DELETE"),
        variant: "success",
      });
    },
  });

  return { deleteBookMutation: mutateAsync, ...rest };
}
