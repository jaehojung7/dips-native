import React from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

const ButtonContainer = styled.TouchableOpacity`
  border-radius: 5px;
  padding: 5px 10px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

export default function AddSetButton({ onPress }) {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>
        <FontAwesome5 name="plus" size={17} />
      </ButtonText>
    </ButtonContainer>
  );
}
