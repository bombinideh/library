import queryClient from "@/api";
import { UserResponse } from "@/features/auth/types";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { TableTitle } from "@/types/table";
import { successMessage } from "@/utils/mutationMessages";
import { useMutation } from "@tanstack/react-query";
import { CreateUserData } from "../components/CreateUser";

export default function useCreateUser(tableTitle: TableTitle) {
  const request = useFetch<CreateUserData, UserResponse>({
    URL: "users",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: user => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      emitNotification({
        text: successMessage(tableTitle, user.name, "POST"),
        variant: "success",
      });
    },
  });

  return { createUserMutation: mutateAsync, ...rest };
}
