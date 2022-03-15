import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchProgram from "./SearchProgram";
import SearchExercise from "./SearchExercise";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Tab = createMaterialTopTabNavigator();

const HeaderContainer = styled.View`
  margin: 50px 25px 5px 25px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

export default function SearchTab() {
  return (
    <DismissKeyboard>
      <>
        <HeaderContainer>
          <Header>검색</Header>
        </HeaderContainer>

        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16 },
            tabBarIndicatorStyle: { backgroundColor: "#42a5f5" },
          }}
        >
          <Tab.Screen
            name="SearchProgram"
            component={SearchProgram}
            options={{
              title: "프로그램",
            }}
          />

          <Tab.Screen
            name="SearchExercise"
            component={SearchExercise}
            options={{
              title: "운동 목록",
            }}
          />
        </Tab.Navigator>
      </>
    </DismissKeyboard>
  );
}
