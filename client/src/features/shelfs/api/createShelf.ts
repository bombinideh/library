import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { CreateShelfData } from "../components/CreateShelf";
import { Shelf } from "../types";

export default function useCreateShelf(tableTitle: TableTitle) {
  const request = useFetch<CreateShelfData, Shelf>({
    URL: "shelfs",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: shelf => {
      queryClient.invalidateQueries({ queryKey: ["shelfs"] });

      emitNotification({
        text: successMessage(tableTitle, shelf.name, "POST"),
        variant: "success",
      });
    },
  });

  return { createShelfMutation: mutateAsync, ...rest };
}
