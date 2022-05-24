import React, { useState } from "react";
import styled from "styled-components/native";
import DeleteExercise from "../components/DeleteExercise";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList } from "react-native";

const Container = styled.View`
  margin: 20px 10px 0 10px;
`;

const HeaderContainer = styled.View`
  margin: 50px 15px 10px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 18px;
  font-weight: 600;
`;

export default function ExerciseList({ navigation, route }) {
  const { userId } = route.params;
  const { exercises } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({ item: exercise }) => {
    return <DeleteExercise exercise={exercise} />;
  };

  return (
    <>
      <Container>
        <HeaderContainer>
          <Header>Exercises</Header>
          <ButtonContainer
            onPress={() => navigation.navigate("CreateExercise", { userId })}
          >
            <ButtonText>
              <FontAwesome5 name="plus" size={15} />
            </ButtonText>
            <ButtonText style={{ marginLeft: 5 }}>New exercise</ButtonText>
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
      </Container>
    </>
  );
}
