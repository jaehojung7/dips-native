import React, { useState } from "react";
import styled from "styled-components/native";
import { gql, useQuery } from "@apollo/client";
import { FlatList, Modal } from "react-native";
import { Controller } from "react-hook-form";

const ME_QUERY = gql`
  query me {
    me {
      id
      exercises {
        id
        exercise
        bodyPart
      }
    }
  }
`;

const ModalContainer = styled.View`
  flex: 1;
  padding: 10px 0;
  background-color: ${(props) => props.theme.cardColor};
`;

const Container = styled.View`
  padding-bottom: 5px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin: 20px 0 15px 0;
`;

const Button = styled.TouchableOpacity`
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 17px;
  font-weight: 600;
  text-align: center;
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

const SearchExerciseTab = styled.TextInput`
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  width: 75%;
  font-size: 15px;
`;

export default function ExerciseListModal({
  navigation,
  setModalVisible,
  setSelectedExercise,
  setValue,
  workoutIndex,
  workoutSetIndex,
}) {
  const { data, loading } = useQuery(ME_QUERY);
  const exercises = data?.me?.exercises;

  const renderItem = ({ item: exercise }) => {
    return (
      <Container>
        <ExerciseTitleContainer
          onPress={() => {
            setSelectedExercise(exercise.exercise);
            setValue(
              `workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].exercise`,
              exercise.exercise
            );
            setModalVisible(false);
          }}
        >
          <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
          <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>
        </ExerciseTitleContainer>
        <BorderLine />
      </Container>
    );
  };

  const SearchBox = (
    <SearchContainer>
      <SearchExerciseTab placeholder="운동 검색하기" />
      <Button
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <ButtonText>닫기</ButtonText>
      </Button>
    </SearchContainer>
  );

  return (
    <ModalContainer>
      <FlatList
        data={exercises}
        keyExtractor={(exercise, index) => "" + index}
        renderItem={renderItem}
        initialNumToRender={3}
        windowSize={3}
        ListHeaderComponent={SearchBox}
      />
    </ModalContainer>
  );
}
