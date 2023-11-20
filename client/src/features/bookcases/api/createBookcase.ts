import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { CreateBookcaseData } from "../components/CreateBookcase";
import { Bookcase } from "../types";

export default function useCreateBookcase(tableTitle: TableTitle) {
  const request = useFetch<CreateBookcaseData, Bookcase>({
    URL: "bookcases",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: bookcase => {
      queryClient.invalidateQueries({ queryKey: ["bookcases"] });

      emitNotification({
        text: successMessage(tableTitle, bookcase.name, "POST"),
        variant: "success",
      });
    },
  });

  return { createBookcaseMutation: mutateAsync, ...rest };
}
