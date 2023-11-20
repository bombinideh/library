import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface IField {
  label: string;
  id: string;
  type: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError | undefined;
  placeholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"]
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean
}
