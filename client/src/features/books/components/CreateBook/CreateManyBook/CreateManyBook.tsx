import { Column, TableTitle } from "@/@types/table";
import Button from "@/components/Elements/Button";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import { ModalStateProps } from "@/components/Modal";
import { BookResponse } from "@/features/books/@types";
import useCreateManyBook from "@/features/books/api/createManyBook";
import RelationshipFields from "@/features/misc/components/RelationshipFields";
import nonNullData from "@/utils/nonNullData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { bookSchema, relationShipsSchema } from "../../../schemas";
import * as Styled from "./styles";

interface CreateManyBookProps extends ModalStateProps {
  tableTitle: TableTitle;
  formId: string;
  columns: Column<BookResponse>[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const schema = relationShipsSchema.merge(
  z.object({
    books: z.array(bookSchema).min(1, "Insira pelo menos um livro"),
  }),
);

export type CreateManyBookData = z.infer<typeof schema>;

type BookData = z.infer<typeof bookSchema>;

export default function CreateManyBook({
  tableTitle,
  formId,
  columns,
  currentStep,
  setCurrentStep,
  ...modalStates
}: CreateManyBookProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    resetField,
    control,
  } = useForm<CreateManyBookData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "books",
  });
  const totalPages = getValues().books?.length;
  const currentBookIndex = currentStep - 1;
  const isLastStep = currentStep >= totalPages || !totalPages;
  const nextPage = async () => {
    let isValidated: boolean;

    if (currentStep < 1) {
      isValidated = await trigger(["bookcase_id", "shelf_id", "box_id"], {
        shouldFocus: true,
      });
    } else {
      isValidated = await trigger(`books.${currentBookIndex}`, {
        shouldFocus: true,
      });
    }

    if (isValidated && isLastStep) {
      const emptyBook = columns.reduce((acc, { key }) => {
        acc[key as keyof BookData] = "";

        return acc;
      }, {} as BookData);

      append(emptyBook);
      setCurrentStep(currentStep + 1);
    } else if (isValidated) {
      setCurrentStep(currentStep + 1);
    }
  };
  const { createManyBookMutation } = useCreateManyBook({
    tableTitle,
    ...modalStates,
  });

  useEffect(() => {
    return () => {
      setCurrentStep(0);
    };
  }, []);

  return (
    <>
      <Form
        id={formId}
        onSubmit={handleSubmit(({ books, ...relationshipIds }) => {
          createManyBookMutation({
            ...relationshipIds,
            books: books.map(book => nonNullData(book)),
          });
        })}
      >
        {currentStep < 1 ? (
          <RelationshipFields
            {...{ register, errors, getValues, setValue, trigger, resetField }}
          />
        ) : (
          <Styled.BookFields key={fields[currentBookIndex].id}>
            {Object.keys(fields[currentBookIndex]).map((key, index) => {
              if (key !== "id")
                return (
                  <InputField
                    key={key}
                    id={key}
                    label={columns[index].title}
                    type="text"
                    registration={register(
                      `books.${currentBookIndex}.${key as keyof BookData}`,
                    )}
                    error={errors.books?.[currentBookIndex]?.[key as keyof BookData]}
                  />
                );
            })}
          </Styled.BookFields>
        )}
      </Form>

      <Styled.Pagination>
        <Styled.Buttons>
          {!!currentStep && (
            <>
              <Button
                variant="support"
                text="Voltar"
                onClick={() => setCurrentStep(currentStep - 1)}
              />
            </>
          )}

          {currentStep >= 1 && totalPages > 1 && (
            <Button
              variant="danger"
              text="Excluir livro atual"
              onClick={() => {
                if (isLastStep) setCurrentStep(currentStep - 1);

                remove(currentBookIndex);
              }}
            />
          )}

          <Button
            variant={isLastStep ? "primary" : "support"}
            text={isLastStep ? "Novo livro" : "Próximo"}
            onClick={nextPage}
          />
        </Styled.Buttons>

        {!!totalPages && (
          <Styled.Infos>
            {!!currentStep && <span>Página {currentStep}</span>}

            <span>
              {totalPages}
              {`\n`}
              {totalPages > 1
                ? tableTitle.plural.toLowerCase()
                : tableTitle.singular.toLowerCase()}
              {`\n`}
              no total
            </span>
          </Styled.Infos>
        )}
      </Styled.Pagination>
    </>
  );
}
