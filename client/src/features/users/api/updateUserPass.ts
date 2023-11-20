import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserPassData } from "../components/UpdateUserPassForm";
import { UserResponse } from "../types";

export default function useUpdateUserPass() {
  const request = useFetch<UpdateUserPassData, UserResponse>({
    URL: `users/reset-password`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: () => {
      emitNotification({
        text: "Sua senha foi alterada!",
        variant: "success",
      });
    },
  });

  return { updateUserPassMutation: mutateAsync, ...rest };
}
