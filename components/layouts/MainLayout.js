import React from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

const HeaderContainer = styled.View`
  margin: 40px 0 10px 15px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

export default function MainLayout({ children, title }) {
  return (
    <>
      <HeaderContainer>
        <Header>{title}</Header>
      </HeaderContainer>
      <DismissKeyboard>{children}</DismissKeyboard>
    </>
  );
}
