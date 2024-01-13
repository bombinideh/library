import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { CreateShelfData } from "../components/CreateShelf";
import { Shelf } from "../types";

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
