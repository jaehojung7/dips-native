import React from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

const Button = styled.TouchableOpacity`
  padding: 5px 10px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  /* text-align: center; */
`;

export default function ExpandSetButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <ButtonText>
        <FontAwesome5 name="angle-down" size={23} />
      </ButtonText>
    </Button>
  );
}
