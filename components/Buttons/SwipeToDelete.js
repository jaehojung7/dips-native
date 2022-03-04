import React from "react";
import { TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  margin-left: 13px;
  justify-content: center;
  margin-top: -15px;
`;

const ButtonText = styled.Text`
  color: tomato;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

export default function SwipeToDelete({ children }) {
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Button onPress={onPress}>
        <ButtonText>Delete</ButtonText>
      </Button>
    );
  };
  return <Swipeable>{children}</Swipeable>;
}
