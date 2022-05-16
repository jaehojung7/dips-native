import React, { useState } from "react";
import styled from "styled-components/native";
import DeleteExercise from "../components/DeleteExercise";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";

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

const ButtonContainer = styled.TouchableOpacity`
  margin: 10px 0;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  margin: 10px 15px 5px 0;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SearchExercise({ navigation }) {
  const { data, loading, refetch } = useQuery(ME_QUERY);
  const user = data?.me;
  const exercises = data?.me?.exercises;

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item: exercise }) => {
    return <DeleteExercise exercise={exercise} />;
  };

  const CreateExerciseButton = (
    <>
      <ButtonContainer
        onPress={() => navigation.navigate("CreateExercise", { user })}
      >
        <ButtonText>추가</ButtonText>
      </ButtonContainer>
      <BorderLine />
    </>
  );

  return (
    <Container>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        data={exercises}
        keyExtractor={(item, index) => "" + index}
        renderItem={renderItem}
        initialNumToRender={3}
        windowSize={3}
        ListHeaderComponent={CreateExerciseButton}
      />
    </Container>
  );
}
