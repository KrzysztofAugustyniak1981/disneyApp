import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid gray;
  border-top-color: ${({ theme }) => theme.buttonBackground};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 100px auto;
`;

function Loader() {
    return <Spinner />;
}

export default Loader;