import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Program from "../screens/Program";
import Stats from "../screens/Stats";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import CreateProgram from "../screens/CreateProgram";
import CreateWorkout from "../screens/CreateWorkout";
import ProgramModal from "../components/modal-components/ProgramModal";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerMode: "screen",
      }}
    >
      {screenName === "Program" ? (
        <Stack.Screen name={"StackWorkout"} component={Program} />
      ) : null}
      {screenName === "Stats" ? (
        <Stack.Screen name={"StackStats"} component={Stats} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"StackSearch"} component={Search} />
      ) : null}

      {screenName === "Profile" ? (
        <Stack.Screen name={"StackProfile"} component={Profile} />
      ) : null}
      <Stack.Screen name="CreateProgram" component={CreateProgram} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
      <Stack.Screen
        name="ProgramModal"
        component={ProgramModal}
        presentation="modal"
      />
    </Stack.Navigator>
  );
}
