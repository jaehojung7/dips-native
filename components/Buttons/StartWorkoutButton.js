import React from "react";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  /* border-radius: 30px; */
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.NavigateBackButton};
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

export default function StartWorkoutButton({ onPress, text }) {
  return (
    <Button onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
