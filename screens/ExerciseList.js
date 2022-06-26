import React from "react";
import styled from "styled-components/native";
import DeleteExercise from "../components/DeleteExercise";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Platform, ScrollView, View } from "react-native";
import MainLayout from "../components/layouts/MainLayout";

const HeaderContainer = styled.View`
  margin: 10px;
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
  font-size: 16px;
  font-weight: 700;
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
    <MainLayout>
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
        <View style={{ marginHorizontal: 10 }}>
          <FlatList
            data={exercises}
            extraData={exercises}
            keyExtractor={(item, index) => "" + index}
            renderItem={renderItem}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            ListHeaderComponent={headerComponent}
            persistentScrollbar={false}
          />
        </View>
      )}
    </MainLayout>
  );
}
