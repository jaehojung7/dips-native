import React from "react";
import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const Button = styled.TouchableOpacity`
  padding: 5px 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

export default function ExpandSetButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <ButtonText>
        <FontAwesome5 name="angle-down" size={25} />
      </ButtonText>
    </Button>
  );
}
