import React from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Button = styled.TouchableOpacity`
  border-radius: 30px;
  margin-right: 5px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

export default function NavigateBackButton({ onPress }) {
  const navigation = useNavigation();
  return (
    <Button onPress={() => navigation.goBack()}>
      <MaterialIcons name="navigate-before" size={33} color="#42a5f5" />
    </Button>
  );
}
