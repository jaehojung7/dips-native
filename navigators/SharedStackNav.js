import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Program from "../screens/Program";
import Workout from "../screens/Workout";
import Stats from "../screens/Stats";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import CreateProgram from "../screens/CreateProgram";
import CreateWorkout from "../screens/CreateWorkout";
import { useColorScheme } from "react-native";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  const scheme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerMode: "screen",
        cardStyle: { backgroundColor: scheme === "dark" ? "black" : "white" },
      }}
    >
      {screenName === "Program" ? (
        <Stack.Screen name={"StackProgram"} component={Program} />
      ) : null}
      {screenName === "Workout" ? (
        <Stack.Screen name={"StackWorkout"} component={Workout} />
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
    </Stack.Navigator>
  );
}
