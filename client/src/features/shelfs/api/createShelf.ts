import { TableTitle } from "@/@types/table";
import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { Shelf } from "../@types";
import { CreateShelfData } from "../components/CreateShelf";

interface UseCreateShelfProps extends ModalStateProps {
  tableTitle: TableTitle;
}

export default function useCreateShelf({
  tableTitle,
  setShowModal,
}: UseCreateShelfProps) {
  const request = useFetch<CreateShelfData, Shelf>({
    URL: "shelfs",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: shelf => {
      queryClient.invalidateQueries({ queryKey: ["shelfs"] });

      setShowModal(false);

      emitNotification({
        text: successMessage(tableTitle, shelf.name, "POST"),
        variant: "success",
      });
    },
  });

  return { createShelfMutation: mutateAsync, ...rest };
}
