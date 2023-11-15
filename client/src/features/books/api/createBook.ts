import queryClient from "@/api";
import useFetch from "@/hooks/useFetch";
import useNotification from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import { CreateBookData } from "../components/CreateBook";
import { Book } from "../types";

interface Body
  extends Omit<CreateBookData, "bookcase_name" | "shelf_name" | "box_name"> {
  bookcase_id: Book["bookcase_id"];
  shelf_id: Book["shelf_id"];
  box_id: Book["box_id"];
}

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
        text: `O livro ${book.title} foi criado!`,
        variant: "success",
      });
    },
  });

  return { createBookMutation: mutateAsync, ...rest };
}
