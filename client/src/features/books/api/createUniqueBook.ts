import { TableTitle } from "@/@types/table";
import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { Book } from "../@types";
import { CreateUniqueBookData } from "../components/CreateBook/CreateUniqueBook";

interface UseCreateUniqueBookProps extends ModalStateProps {
  tableTitle: TableTitle;
}

export default function useCreateUniqueBook({
  tableTitle,
  setShowModal,
}: UseCreateUniqueBookProps) {
  const request = useFetch<CreateUniqueBookData, Book>({
    URL: "books",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: book => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      setShowModal(false);

      emitNotification({
        text: successMessage(tableTitle, book.title, "POST"),
        variant: "success",
      });
    },
  });

  return { createUniqueBookMutation: mutateAsync, ...rest };
}
