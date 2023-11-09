import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import { SignInData } from "../components/SignInForm";
import { AuthUserResponse } from "../types";

export default function useSignIn() {
  const request = useFetch<SignInData, AuthUserResponse>({
    URL: "sign-in",
    method: "POST",
  });
  const { signIn } = useAuth();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: authUser => signIn(authUser),
  });

  return { signInMutation: mutateAsync, ...rest };
}
