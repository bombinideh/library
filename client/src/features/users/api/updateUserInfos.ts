import queryClient from "@/api";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { UserResponse } from "../@types";
import { UpdateUserInfosData } from "../components/UpdateUserInfosForm";

export default function useUpdateUserInfos() {
  const request = useFetch<UpdateUserInfosData, UserResponse>({
    URL: `users`,
    method: "PATCH",
  });
  const { emitNotification } = useNotification();
  const { user, setUser } = useAuth();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: updatedUser => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setUser({ ...user, ...updatedUser });

      emitNotification({
        text: "Suas informações foram atualizadas!",
        variant: "success",
      });
    },
  });

  return { updateUserInfosMutation: mutateAsync, ...rest };
}
