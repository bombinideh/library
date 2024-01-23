import { TableTitle } from "@/@types/table";
import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { Book } from "../@types";
import { EditBookData } from "../components/EditBook";

interface UseEditBookProps extends ModalStateProps {
  book_id: Book["book_id"];
  tableTitle: TableTitle;
}

export default function useEditBook({
  book_id,
  tableTitle,
  setShowModal,
}: UseEditBookProps) {
  const request = useFetch<EditBookData, Book>({
    URL: `books/${book_id}`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: book => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      setShowModal(false);

      emitNotification({
        text: successMessage(tableTitle, book.title, "PATCH"),
        variant: "success",
      });
    },
  });

  return { editBookMutation: mutateAsync, ...rest };
}
