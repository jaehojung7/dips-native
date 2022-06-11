import React from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`;

// const TitleContainer = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 5px;
// `;

// const ContainerTitle = styled.TextInput`
//   font-size: 20px;
//   font-weight: 600;
//   color: ${(props) => props.theme.fontColor};
// `;

export default function Container({ children }) {
  return (
    <DismissKeyboard>
      <Container>{children}</Container>
    </DismissKeyboard>
  );
}
