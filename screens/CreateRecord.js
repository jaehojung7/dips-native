import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MainSets from "./MainSets";
import Warmup from "./Warmup";
import DismissKeyboard from "../components/DismissKeyboard";
import styled from "styled-components/native";

const Container = styled.View`
  /* margin: 30px 25px 5px 25px; */
`;

const HeaderContainer = styled.View`
  margin: 50px 25px 5px 25px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const Tab = createMaterialTopTabNavigator();

export default function CreateRecord({ route }) {
  let { program } = route.params;
  if (program === undefined) {
    program = {};
  }
  let { workout } = route.params;
  if (workout === undefined) {
    workout = {};
  }
  const { exercises } = route.params;

  return (
    <DismissKeyboard>
      <>
        <HeaderContainer>{/* <Header>Record</Header> */}</HeaderContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16 },
            tabBarIndicatorStyle: { backgroundColor: "#42a5f5" },
          }}
        >
          <Tab.Screen
            name="MainSets"
            component={MainSets}
            options={{
              title: "Main Sets",
            }}
            initialParams={{ program, workout, exercises }}
          />

          <Tab.Screen
            name="Warmup"
            component={Warmup}
            options={{
              title: "Warm up",
            }}
            initialParams={{ workout, exercises }}
          />
        </Tab.Navigator>
      </>
    </DismissKeyboard>
  );
}
