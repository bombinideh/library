import Modal, { ModalStateProps } from "@/components/Modal";
import useDeleteBook from "../api/deleteBook";
import { Book } from "../types";

interface DeleteBookProps extends ModalStateProps {
  book: Book;
}

export default function DeleteBook({
  book,
  showState,
  setShowState,
}: DeleteBookProps) {
  const { deleteBookMutation } = useDeleteBook({
    bookId: book.book_id,
    setModalState: setShowState,
  });

  return (
    <Modal
      title={`Deletar livro #${book.book_id}`}
      action={{
        text: "Deletar livro",
        variant: "danger",
        onClick: () => deleteBookMutation(null),
      }}
      showState={showState}
      setShowState={setShowState}
    >
      <p>Tem certeza que deseja excluir este livro? Essa ação é irreversível.</p>
    </Modal>
  );
}
