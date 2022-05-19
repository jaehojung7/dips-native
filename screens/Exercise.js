import React, { useState } from "react";
import styled from "styled-components/native";
import DeleteExercise from "../components/DeleteExercise";
import { FontAwesome5 } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import { FlatList, ActivityIndicator } from "react-native";

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

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const HeaderContainer = styled.View`
  margin: 40px 25px 15px 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const ButtonContainer = styled.TouchableOpacity``;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-weight: 600;
  text-align: right;
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Exercise({ navigation }) {
  const { data, loading, refetch } = useQuery(ME_QUERY);
  if (loading)
    return (
      <IndicatorContainer>
        <ActivityIndicator color="#FF7F50" />
      </IndicatorContainer>
    );
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

  return (
    <>
      <HeaderContainer>
        <Header>운동목록</Header>
        <ButtonContainer
          onPress={() => navigation.navigate("CreateExercise", { user })}
        >
          <ButtonText>
            <FontAwesome5 name="plus" size={16} />
          </ButtonText>
        </ButtonContainer>
      </HeaderContainer>

      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        data={exercises}
        keyExtractor={(item, index) => "" + index}
        renderItem={renderItem}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
      />
    </>
  );
}
