import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Program from "../screens/Program";
import CreateProgram from "../screens/CreateProgram";
import SeeProgram from "../screens/SeeProgram";
import EditProgram from "../screens/EditProgram";
import ExerciseListModalProgram from "../screens/ExerciseListModalProgram";
import ProgramList from "../screens/ProgramList";

const Stack = createStackNavigator();

export default function StackProgram({ screenName, data, loading }) {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTitle: "",
        headerTransparent: true,
        headerStyle: { shadowColor: "transparent" },
      }}
    >
      {screenName === "Program" ? (
        <Stack.Screen
          name={"StackProgram"}
          component={Program}
          initialParams={{ data, loading }}
        />
      ) : null}

      <Stack.Screen
        name="ExerciseListModalProgram"
        component={ExerciseListModalProgram}
        options={{ presentation: "modal", headerShown: false }}
      />

      <Stack.Screen name="CreateProgram" component={CreateProgram} />
      <Stack.Screen name="EditProgram" component={EditProgram} />
      <Stack.Screen name="SeeProgram" component={SeeProgram} />
      <Stack.Screen name="ProgramList" component={ProgramList} />
    </Stack.Navigator>
  );
}
