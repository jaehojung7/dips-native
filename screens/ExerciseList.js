import React, { useState } from "react";
import styled from "styled-components/native";
import DeleteExercise from "../components/DeleteExercise";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList } from "react-native";

const HeaderContainer = styled.View`
  margin: 40px 25px 15px 15px;
  align-items: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
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
      <HeaderContainer>
        {/* <Header>Exercise</Header> */}
        <ButtonContainer
          onPress={() => navigation.navigate("CreateExercise", { userId })}
        >
          <ButtonText>
            <FontAwesome5 name="plus" size={16} />
          </ButtonText>
          <ButtonText style={{ marginLeft: 10 }}>Create exercise</ButtonText>
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
