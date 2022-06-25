import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const ButtonText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

export default function TextButton({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </TouchableOpacity>
  );
}
