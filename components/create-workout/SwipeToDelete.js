import React from "react";
import { TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  background-color: tomato;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: 700;
  margin: 0 5px;
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
      <TouchableOpacity onPress={onPress}>
        <ButtonText>Delete</ButtonText>
      </TouchableOpacity>
    );
  };
  return <Swipeable>{children}</Swipeable>;
}
