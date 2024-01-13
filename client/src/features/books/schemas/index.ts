import { z } from "zod";

const intAndPositiveNumber = (initialMessage: string) => {
  return (val: string, ctx: z.RefinementCtx) => {
    if (!val.length) return val;

    const num = Number(val);

    if (isNaN(num)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${initialMessage} deve ser um número.`,
      });

      return z.NEVER;
    }

    if (num < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${initialMessage} deve ser maior que 0.`,
      });

      return z.NEVER;
    }

    if (!Number.isInteger(num)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${initialMessage} deve ser um inteiro.`,
      });

      return z.NEVER;
    }

    return num;
  };
};

export const bookSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  author: z.string().min(1, "O autor é obrigatório."),
  publisher: z.string().min(1, "A editora é obrigatória."),
  number_pages: z
    .string()
    .min(1, "O nº de páginas é obrigatório.")
    .transform(intAndPositiveNumber("O nº de páginas")),
  year_publication: z
    .string()
    .transform(intAndPositiveNumber("O ano de publicação")),
  amount: z.string().transform(intAndPositiveNumber("As unidades")),
  observation: z.string(),
});

export const relationShipsSchema = z.object({
  bookcase_id: z.string().min(1, "Uma estante é obrigatória."),
  shelf_id: z.string().min(1, "Uma prateleira é obrigatória."),
  box_id: z.string().min(1, "Uma caixa é obrigatória."),
});
