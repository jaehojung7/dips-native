import React from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

const Button = styled.TouchableOpacity`
  border-radius: 5px;
  /* border: ${(props) => props.theme.orange}; */
  padding: 5px 10px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

export default function DeleteSetButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <ButtonText>
        <FontAwesome5 name="minus" size={18} />
      </ButtonText>
    </Button>
  );
}
