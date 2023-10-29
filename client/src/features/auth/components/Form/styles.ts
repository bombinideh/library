import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings[20]};
  text-align: left;
`;
