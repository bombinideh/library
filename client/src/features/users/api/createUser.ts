import queryClient from "@/api";
import { ModalStateProps } from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { CreateUserData } from "../components/CreateUser";
import { UserResponse } from "../types";

interface UseCreateUserProps extends ModalStateProps {
  tableTitle: TableTitle;
}

export default function useCreateUser({
  tableTitle,
  setShowModal,
}: UseCreateUserProps) {
  const request = useFetch<CreateUserData, UserResponse>({
    URL: "users",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: user => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      setShowModal(false);

      emitNotification({
        text: successMessage(tableTitle, user.name, "POST"),
        variant: "success",
      });
    },
  });

  return { createUserMutation: mutateAsync, ...rest };
}
