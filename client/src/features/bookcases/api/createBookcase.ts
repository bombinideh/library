import { TableTitle } from "@/@types/table";
import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { Bookcase } from "../@types";
import { CreateBookcaseData } from "../components/CreateBookcase";

interface UseCreateBookcaseProps extends ModalStateProps {
  tableTitle: TableTitle;
}

export default function useCreateBookcase({
  tableTitle,
  setShowModal,
}: UseCreateBookcaseProps) {
  const request = useFetch<CreateBookcaseData, Bookcase>({
    URL: "bookcases",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: bookcase => {
      queryClient.invalidateQueries({ queryKey: ["bookcases"] });

      setShowModal(false);

      emitNotification({
        text: successMessage(tableTitle, bookcase.name, "POST"),
        variant: "success",
      });
    },
  });

  return { createBookcaseMutation: mutateAsync, ...rest };
}
