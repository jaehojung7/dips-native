import React from "react";
import { logUserOut } from "../apollo";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 20px 15px 15px 5px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;
const Button = styled.TouchableOpacity`
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export default function Setting() {
  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <Header>Setting</Header>
        </HeaderContainer>
        <Button onPress={() => logUserOut()}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </Container>
    </DismissKeyboard>
  );
}
