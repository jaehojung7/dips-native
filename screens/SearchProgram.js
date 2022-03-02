import { FlatList, Modal, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useState } from "react";
import SeeProgram from "./SeeProgram";

const Container = styled.ScrollView`
  margin: 0 10px;
`;
const ProgramContainer = styled.View``;
const TitleContainer = styled.TouchableOpacity``;

const ProgramTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  margin: 13px 5px;
  font-weight: 600;
`;

const ListContainer = styled.View`
  /* margin: 10px 0; */
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
    <Container>
      <ListContainer>
        {programs.map((program, programIndex) => {
          return (
            <ProgramContainer key={programIndex}>
              <TitleContainer
                onPress={() => {
                  navigation.navigate("SeeProgram", { program });
                }}
              >
                <ProgramTitle>{program.title}</ProgramTitle>
              </TitleContainer>
              <BorderLine />
            </ProgramContainer>
          );
        })}
      </ListContainer>

      {/* <FlatList
        data={programs}
        keyExtractor={(program, index) => "" + index}
        renderItem={renderProgram}
        initialNumToRender={10}
        // windowSize={3}
      /> */}
    </Container>
  );
}
