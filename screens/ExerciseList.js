import React from "react";
import styled from "styled-components/native";
import DeleteExercise from "../components/DeleteExercise";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Platform } from "react-native";

const Container = styled.View`
  margin: 20px 10px;
`;

const ScrollContainer = styled.ScrollView`
  margin: 20px 10px;
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
  const { userId, exercises } = route.params;
  const renderItem = ({ item: exercise }) => {
    return <DeleteExercise exercise={exercise} />;
  };

  const headerComponent = (
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
  );

  return (
    <>
      {Platform.OS === "web" ? (
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <FlatList
            data={exercises}
            keyExtractor={(item, index) => "" + index}
            renderItem={renderItem}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            ListHeaderComponent={headerComponent}
          />
        </ScrollContainer>
      ) : (
        <Container>
          <FlatList
            data={exercises}
            extraData={exercises}
            keyExtractor={(item, index) => "" + index}
            renderItem={renderItem}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            ListHeaderComponent={headerComponent}
          />
        </Container>
      )}
    </>
  );
}
