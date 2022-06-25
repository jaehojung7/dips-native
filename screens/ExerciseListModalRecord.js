import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import TextButton from "../components/Buttons/TextButton";

const ModalContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.modalBackground};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 15px;
`;

const HeaderTitle = styled.Text`
  font-size: 23px;
  color: ${(props) => props.theme.mainColor};
  font-weight: 700;
`;

const ExerciseTitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 15px;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
`;

const ExerciseBodypart = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.gray};
  margin-top: 3px;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function ExerciseListModalRecord({
  exercises,
  setValue,
  setModalVisible,
  recordExerciseIndexState,
}) {
  const renderItem = ({ item: exercise }) => {
    return (
      <>
        <ExerciseTitleContainer
          onPress={() => {
            setValue(
              `recordExercises[${recordExerciseIndexState}].exercise`,
              exercise.exercise
            );
            setModalVisible(false);
          }}
        >
          <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
          <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>
        </ExerciseTitleContainer>
        <BorderLine />
      </>
    );
  };

  return (
    <ModalContainer>
      <Header>
        <HeaderTitle>Exercises</HeaderTitle>
        <TextButton
          text="Close"
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </Header>
      <FlatList
        data={exercises}
        keyExtractor={(exercise, index) => "" + index}
        renderItem={renderItem}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
      />
    </ModalContainer>
  );
}
