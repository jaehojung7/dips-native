import React, { useEffect } from "react";
import { logUserOut } from "../apollo";
import styled from "styled-components/native";

const Container = styled.View`
  justify-content: center;
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export default function Profile() {
  return (
    <Container>
      <Button onPress={() => logUserOut()}>
        <ButtonText>로그아웃</ButtonText>
      </Button>
    </Container>
  );
}
