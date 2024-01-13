import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { Book } from "../types";

interface UseDeleteBookProps extends ModalStateProps {
  bookId: Book["book_id"];
  tableTitle: TableTitle;
}

export default function useDeleteBook({
  bookId,
  tableTitle,
  setShowModal,
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

      setShowModal(false);

      emitNotification({
        text: successMessage(tableTitle, book.title, "DELETE"),
        variant: "success",
      });
    },
  });

  return { deleteBookMutation: mutateAsync, ...rest };
}
