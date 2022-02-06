import { FlatList, Modal, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useState } from "react";
import SeeProgram from "./SeeProgram";

const TitleContainer = styled.View``;

const ProgramTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  margin: 15px 0 15px 15px;
  font-weight: 600;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function SearchProgram({ route, navigation }) {
  const { programs } = route.params;
  const renderProgram = ({ item: program }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SeeProgram", { program });
        }}
      >
        <TitleContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          <BorderLine />
        </TitleContainer>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={programs}
        keyExtractor={(program, index) => "" + index}
        renderItem={renderProgram}
        initialNumToRender={10}
        // windowSize={3}
      />
    </>
  );
}
