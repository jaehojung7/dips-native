import React from "react";
import styled from "styled-components/native";
import DeleteExercise from "../components/DeleteExercise";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Platform, ScrollView } from "react-native";
import { Header, HeaderContainer } from "../components/layouts/MainContainer";
import DismissKeyboard from "../components/DismissKeyboard";

const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 16px;
  font-weight: 700;
  text-align: right;
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
          <FontAwesome5 name="plus" size={14} />
          <ButtonText> Add</ButtonText>
        </ButtonText>
      </ButtonContainer>
    </HeaderContainer>
  );

  return (
    <DismissKeyboard>
      {Platform.OS === "web" ? (
        <ScrollView
          style={{ marginHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={exercises}
            keyExtractor={(item, index) => "" + index}
            renderItem={renderItem}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            ListHeaderComponent={headerComponent}
          />
        </ScrollView>
      ) : (
        <FlatList
          style={{ marginTop: 5, marginHorizontal: 10 }}
          data={exercises}
          extraData={exercises}
          keyExtractor={(item, index) => "" + index}
          renderItem={renderItem}
          initialNumToRender={50}
          maxToRenderPerBatch={50}
          ListHeaderComponent={headerComponent}
        />
      )}
    </DismissKeyboard>
  );
}
