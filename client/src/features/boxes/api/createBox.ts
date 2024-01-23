import { TableTitle } from "@/@types/table";
import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { Box } from "../@types";
import { CreateBoxData } from "../components/CreateBox";

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
