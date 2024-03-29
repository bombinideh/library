import { User } from "@/features/users/@types";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { AuthUserResponse } from "../@types";
import { ResetPasswordData } from "../components/ResetPasswordForm";

interface RequestBody extends ResetPasswordData {
  user_id: User["user_id"];
  token: string;
}

export default function useResetPassword() {
  const request = useFetch<RequestBody, AuthUserResponse>({
    URL: "reset-password",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { signIn } = useAuth();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: async authUser => {
      await emitNotification({
        text: "Sua senha foi atualizada. O login automático será feito",
        variant: "success",
      });

      signIn(authUser);
    },
  });

  return { resetPasswordMutation: mutateAsync, ...rest };
}
