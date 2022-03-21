import { React, useState, useCallback } from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Exercise from "../components/Exercise";
import { gql, useQuery } from "@apollo/client";
import { RefreshControl } from "react-native";

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

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

const ExerciseContainer = styled.View`
  margin-top: 15px;
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SearchExercise({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  // 종목이 많아서 loading 이 길어질 경우 loading 을 어떻게 사용할지 생각해 볼 것
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Container
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SearchContainer>
        <SearchExerciseTab placeholder="운동 검색하기" />
        <AddExerciseButton
          onPress={() =>
            navigation.navigate("CreateExercise", { userid: data?.me.id })
          }
        >
          <ButtonText>
            <FontAwesome5 name="plus" size={17} />
          </ButtonText>
        </AddExerciseButton>
      </SearchContainer>

      <ExerciseContainer>
        {data?.me?.exercises.map((exercise) => (
          <Exercise exercise={exercise} key={exercise.id} />
        ))}
      </ExerciseContainer>
    </Container>
  );
}
