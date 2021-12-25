import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Program from "../screens/Program";
import CreateProgram from "../screens/CreateProgram";

const Stack = createStackNavigator();

export default function ProgramNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Program" component={Program} />
      <Stack.Screen name="CreateProgram" component={CreateProgram} />
    </Stack.Navigator>
  );
}
