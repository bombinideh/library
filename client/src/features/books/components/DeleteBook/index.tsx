import Modal, { ModalStateProps } from "@/components/Modal";
import useDeleteBook from "../../api/deleteBook";
import { Book } from "../../types";

interface DeleteBookProps extends ModalStateProps {
  book: Book;
}

export default function DeleteBook({ book, ...rest }: DeleteBookProps) {
  const { deleteBookMutation } = useDeleteBook(book.book_id);

  return (
    <Modal
      title={`Deletar livro #${book.book_id}`}
      action={{
        text: "Deletar livro",
        variant: "danger",
        onClick: () => deleteBookMutation(null),
      }}
      {...rest}
    >
      <p>Tem certeza que deseja excluir este livro? Essa ação é irreversível.</p>
    </Modal>
  );
}
