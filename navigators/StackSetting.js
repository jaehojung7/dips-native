import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Setting from "../screens/Setting";
import SeeProgram from "../screens/SeeProgram";
import CreateExercise from "../screens/CreateExercise";
import ProgramList from "../screens/ProgramList";
import ExerciseList from "../screens/ExerciseList";

const Stack = createStackNavigator();

export default function StackSetting({ screenName, data, loading, refetch }) {
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
      {screenName === "Setting" ? (
        <Stack.Screen
          name={"StackSetting"}
          component={Setting}
          initialParams={{ data, loading, refetch }}
        />
      ) : null}

      <Stack.Screen
        name="CreateExercise"
        component={CreateExercise}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen name="ProgramList" component={ProgramList} />
      <Stack.Screen name="ExerciseList" component={ExerciseList} />
      <Stack.Screen name="SeeProgram" component={SeeProgram} />
    </Stack.Navigator>
  );
}
