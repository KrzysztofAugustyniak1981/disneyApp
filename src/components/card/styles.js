import styled from "styled-components";

export const CardWrapper = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 16px;
  text-align: center;
`;