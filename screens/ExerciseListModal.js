import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import Exercise from "../components/Exercise";

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

const Container = styled.View`
  padding-bottom: 15px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

export default function ExerciseListModal({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  const exercises = data?.me?.exercises;

  const renderItem = ({ item: exercise }) => {
    return <Exercise exercise={exercise} />;
  };

  const SearchBox = (
    <SearchContainer>
      {/* <SearchExerciseTab placeholder="운동 검색하기" /> */}
      <Button onPress={() => navigation.goBack()}>
        <ButtonText>닫기</ButtonText>
      </Button>
    </SearchContainer>
  );

  return (
    <Container>
      <FlatList
        data={exercises}
        keyExtractor={(exercise, index) => "" + index}
        renderItem={renderItem}
        initialNumToRender={3}
        windowSize={3}
        ListHeaderComponent={SearchBox}
      />
    </Container>
  );
}
