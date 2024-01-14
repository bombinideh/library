import { TableTitle } from "@/@types/table";
import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { Book } from "../@types";
import { CreateManyBookData } from "../components/CreateBook/CreateManyBook/CreateManyBook";

interface UseCreateManyBookProps extends ModalStateProps {
  tableTitle: TableTitle;
}

export default function useCreateManyBook({
  tableTitle,
  setShowModal,
}: UseCreateManyBookProps) {
  const request = useFetch<CreateManyBookData, Book[]>({
    URL: "books/many",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      setShowModal(false);

      emitNotification({
        text: `Os ${tableTitle.plural.toLowerCase()} foram criados!`,
        variant: "success",
      });
    },
  });

  return { createManyBookMutation: mutateAsync, ...rest };
}
