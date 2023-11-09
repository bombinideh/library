import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordData } from "../components/ForgotPasswordForm";

interface RequestBody extends ForgotPasswordData {
  url: string;
}

interface ResponseBody {
  message: string;
}

export default function useForgotPassword() {
  const request = useFetch<RequestBody, ResponseBody>({
    URL: "forgot-password",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: data => emitNotification({ text: data.message, variant: "success" }),
  });

  return { forgotPasswordMutation: mutateAsync, ...rest };
}
