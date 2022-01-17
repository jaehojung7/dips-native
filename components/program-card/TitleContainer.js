import styled from "styled-components/native";

const StyledTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

function TitleContainer({ children }) {
  return <StyledTitleContainer>{children}</StyledTitleContainer>;
}

export default TitleContainer;
