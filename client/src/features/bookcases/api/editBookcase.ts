import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { EditBookcaseData } from "../components/EditBookcase";
import { Bookcase } from "../types";

interface UseEditBookcaseProps {
  bookcase_id: Bookcase["bookcase_id"];
  tableTitle: TableTitle;
}

export default function useEditBookcase({
  bookcase_id,
  tableTitle,
}: UseEditBookcaseProps) {
  const request = useFetch<EditBookcaseData, Bookcase>({
    URL: `bookcases/${bookcase_id}`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: bookcase => {
      queryClient.invalidateQueries({ queryKey: ["bookcases"] });

      emitNotification({
        text: successMessage(tableTitle, bookcase.name, "PATCH"),
        variant: "success",
      });
    },
  });

  return { editBookcaseMutation: mutateAsync, ...rest };
}
