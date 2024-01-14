import { TableTitle } from "@/@types/table";
import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { Box } from "../@types";
import { EditBoxData } from "../components/EditBox";

interface UseEditBoxProps extends ModalStateProps {
  box_id: Box["box_id"];
  tableTitle: TableTitle;
}

export default function useEditBox({
  box_id,
  tableTitle,
  setShowModal,
}: UseEditBoxProps) {
  const request = useFetch<EditBoxData, Box>({
    URL: `boxes/${box_id}`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: shelf => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });

      setShowModal(false);

      emitNotification({
        text: successMessage(tableTitle, shelf.name, "PATCH"),
        variant: "success",
      });
    },
  });

  return { editBoxMutation: mutateAsync, ...rest };
}
