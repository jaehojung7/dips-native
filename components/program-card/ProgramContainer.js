import styled from "styled-components/native";

const StyledProgramContainer = styled.View`
  justify-content: center;
  margin: 5px 5px 20px 5px;
  border: 1px solid #797d7f;
  border-radius: 5px;
  padding: 10px;
`;

function ProgramContainer({ children }) {
  return <StyledProgramContainer>{children}</StyledProgramContainer>;
}

export default ProgramContainer;
