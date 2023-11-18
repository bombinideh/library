import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { CreateBookData } from "../components/CreateBook";
import { Book } from "../types";

export default function useCreateBook() {
  const request = useFetch<CreateBookData, Book>({
    URL: "books",
    method: "POST",
  });
  const { emitNotification } = useNotification();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: request,
    onSuccess: book => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      emitNotification({
        text: `O livro "${book.title}" foi criado!`,
        variant: "success",
      });
    },
  });

  return { createBookMutation: mutateAsync, ...rest };
}
