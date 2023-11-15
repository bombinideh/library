import styled from "styled-components";
import DefaultField from "../Field";

export const Field = styled(DefaultField)`
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSupport2};
  }
  &:placeholder-shown {
    text-overflow: ellipsis;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;
