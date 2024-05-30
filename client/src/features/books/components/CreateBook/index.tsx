import { Column, TableTitle } from "@/@types/table";
import Modal, { ModalStateProps } from "@/components/Modal";
import { useState } from "react";
import { BookResponse } from "../../@types";
import CreateManyBook from "./CreateManyBook/CreateManyBook";
import CreateUniqueBook from "./CreateUniqueBook";
import * as Styled from "./styles";

interface CreateBookProps extends ModalStateProps {
  columns: Column<BookResponse>[];
  tableTitle: TableTitle;
}

type Method = "unique" | "many";

export default function CreateBook({
  tableTitle,
  columns,
  ...modalStates
}: CreateBookProps) {
  const [currentMethodName, setCurrentMethodName] = useState<Method>("unique");
  const [currentStepManyMethod, setCurrentStepManyMethod] = useState(0);
  const mutationProps = { tableTitle, columns, ...modalStates };
  const createMethods = [
    {
      method: "unique",
      text: "Único livro",
      formComponent: (
        <CreateUniqueBook {...mutationProps} formId="createUniqueBookForm" />
      ),
      modalAction: {
        text: `Cadastrar ${tableTitle.plural.toLowerCase()}`,
        form: "createUniqueBookForm",
      },
    },
    {
      method: "many",
      text: "Múltiplos livros",
      formComponent: (
        <CreateManyBook
          {...mutationProps}
          formId="createManyBookForm"
          currentStep={currentStepManyMethod}
          setCurrentStep={setCurrentStepManyMethod}
        />
      ),
      modalAction: {
        text: `Cadastrar ${tableTitle.plural.toLowerCase()}`,
        form: "createManyBookForm",
        disabled: currentStepManyMethod < 1,
      },
    },
  ] as const;
  const [currentMethod] = createMethods.filter(
    ({ method }) => method === currentMethodName,
  );

  return (
    <Modal
      {...modalStates}
      title={`Cadastrar ${tableTitle.singular.toLowerCase()}`}
      header={
        <Styled.Nav>
          {createMethods.map(({ method, text }) => (
            <Styled.NavItem key={method}>
              <Styled.NavButton
                variant="support"
                align="center"
                text={text}
                onClick={() => setCurrentMethodName(method)}
                $active={method === currentMethodName}
              />
            </Styled.NavItem>
          ))}
        </Styled.Nav>
      }
      action={currentMethod.modalAction}
    >
      {currentMethod.formComponent}
    </Modal>
  );
}
