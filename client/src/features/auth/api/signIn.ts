import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import { AuthUserResponse } from "../@types";
import { SignInData } from "../components/SignInForm";

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
