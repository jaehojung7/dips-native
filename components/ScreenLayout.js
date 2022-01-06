import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "./DismissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
`;

export default function ScreenLayout({ loading, children }) {
  return (
    <DismissKeyboard>
      <Container>
        {loading ? <ActivityIndicator color="white" /> : children}
      </Container>
    </DismissKeyboard>
  );
}
