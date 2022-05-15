import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
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

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0 15px 0;
`;

const SearchExerciseTab = styled.TextInput`
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  width: 75%;
  font-size: 15px;
`;

const AddExerciseButton = styled.TouchableOpacity`
  border-radius: 30px;
  width: 10%;
  margin-left: 5px;
  padding: 5px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
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

  const SearchBox = (
    <SearchContainer>
      <SearchExerciseTab placeholder="운동 검색하기" />
      <AddExerciseButton
        onPress={() => navigation.navigate("CreateExercise", { user })}
      >
        <ButtonText>
          <FontAwesome5 name="plus" size={17} />
        </ButtonText>
      </AddExerciseButton>
    </SearchContainer>
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
        ListHeaderComponent={SearchBox}
      />
    </Container>
  );
}
