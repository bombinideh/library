import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { CreateBoxData } from "../components/CreateBox";
import { Box } from "../types";

interface UseCreateBoxProps extends ModalStateProps {
  tableTitle: TableTitle;
}

export default function useCreateBox({
  tableTitle,
  setShowModal,
}: UseCreateBoxProps) {
  const request = useFetch<CreateBoxData, Box>({
    URL: "boxes",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: box => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });

      setShowModal(false);

      emitNotification({
        text: successMessage(tableTitle, box.name, "POST"),
        variant: "success",
      });
    },
  });

  return { createBoxMutation: mutateAsync, ...rest };
}
