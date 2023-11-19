import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { EditBoxData } from "../components/EditBox";
import { Box } from "../types";

interface UseEditBoxProps {
  box_id: Box["box_id"];
  tableTitle: TableTitle;
}

export default function useEditBox({ box_id, tableTitle }: UseEditBoxProps) {
  const request = useFetch<EditBoxData, Box>({
    URL: `boxes/${box_id}`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: shelf => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });

      emitNotification({
        text: successMessage(tableTitle, shelf.name, "PATCH"),
        variant: "success",
      });
    },
  });

  return { editBoxMutation: mutateAsync, ...rest };
}
