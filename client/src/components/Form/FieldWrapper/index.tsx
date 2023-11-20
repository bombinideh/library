import motionTransition from "@/utils/motionTransition";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useTheme } from "styled-components";
import { IField } from "../form";
import * as Styled from "./styles";

interface FieldWrapperProps {
  children: ReactNode;
  label?: string;
  id: IField["id"];
  error?: IField["error"];
  disabled?: IField["disabled"]
}

export default function FieldWrapper({
  children,
  label,
  id,
  error,
  disabled
}: FieldWrapperProps) {
  const { transitions } = useTheme();

  return (
    <Styled.Wrapper>
      {label && <Styled.Label htmlFor={id} $disabled={disabled}>{label}</Styled.Label>}

      {children}

      <AnimatePresence>
        {error?.message && (
          <Styled.Error
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={motionTransition(transitions.form)}
          >
            {error.message}
          </Styled.Error>
        )}
      </AnimatePresence>
    </Styled.Wrapper>
  );
}
