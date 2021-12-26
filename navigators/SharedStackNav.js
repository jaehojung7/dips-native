import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Program from "../screens/Program";
import CreateProgram from "../screens/CreateProgram";
import Workout from "../screens/Workout";
import Stats from "../screens/Stats";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerMode: "screen",
      }}
    >
      {screenName === "StackProgram" ? (
        <Stack.Screen name={"StackProgram"} component={Program} />
      ) : null}
      {screenName === "StackWorkout" ? (
        <Stack.Screen name={"StackWorkout"} component={Workout} />
      ) : null}
      {screenName === "StackStats" ? (
        <Stack.Screen name={"StackStats"} component={Stats} />
      ) : null}
      {screenName === "StackProfile" ? (
        <Stack.Screen name={"StackProfile"} component={Profile} />
      ) : null}
      <Stack.Screen name="CreateProgram" component={CreateProgram} />
    </Stack.Navigator>
  );
}
