import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { EditShelfData } from "../components/EditShelf";
import { Shelf } from "../types";

interface UseEditShelfProps {
  shelf_id: Shelf["shelf_id"];
  tableTitle: TableTitle;
}

export default function useEditShelf({ shelf_id, tableTitle }: UseEditShelfProps) {
  const request = useFetch<EditShelfData, Shelf>({
    URL: `shelfs/${shelf_id}`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: shelf => {
      queryClient.invalidateQueries({ queryKey: ["shelfs"] });

      emitNotification({
        text: successMessage(tableTitle, shelf.name, "PATCH"),
        variant: "success",
      });
    },
  });

  return { editShelfMutation: mutateAsync, ...rest };
}
