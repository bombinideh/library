import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface IField {
  label: string;
  id: string;
  type: string;
  registration: UseFormRegisterReturn;
  error: FieldError | undefined;
  autoComplete?: string;
  autoFocus?: boolean;
}
