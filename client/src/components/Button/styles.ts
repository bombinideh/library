import styled from "styled-components";
import { ButtonProps } from ".";

interface WrapperProps {
  $variant: ButtonProps["variant"];
}

export const Wrapper = styled.button<WrapperProps>``;
