import Modal, { ModalStateProps } from "@/components/Modal";
import { TableTitle } from "@/types/table";
import useDeleteBook from "../api/deleteBook";
import { BookResponse } from "../types";

interface DeleteBookProps extends ModalStateProps {
  book: BookResponse;
  tableTitle: TableTitle;
}

export default function DeleteBook({
  tableTitle,
  book,
  ...modalStates
}: DeleteBookProps) {
  const { deleteBookMutation } = useDeleteBook({
    bookId: book.book_id,
    tableTitle,
    ...modalStates,
  });

  return (
    <Modal
      title={`Deletar ${tableTitle.singular.toLowerCase()} #${book.book_id}`}
      action={{
        text: `Deletar ${tableTitle.singular.toLowerCase()}`,
        variant: "danger",
        onClick: () => deleteBookMutation(null),
      }}
      {...modalStates}
    >
      <p>Tem certeza que deseja excluir este livro? Essa ação é irreversível.</p>
    </Modal>
  );
}
