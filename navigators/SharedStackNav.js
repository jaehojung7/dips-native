import React from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Program from "../screens/Program";
import Record from "../screens/Record";
import Setting from "../screens/Setting";
import CreateRecord from "../screens/CreateRecord";
import CreateProgram from "../screens/CreateProgram";
import SeeProgram from "../screens/SeeProgram";
import EditProgram from "../screens/EditProgram";
import CreateExercise from "../screens/CreateExercise";
import ExerciseListModalProgram from "../screens/ExerciseListModalProgram";
import ExerciseListModalRecord from "../screens/ExerciseListModalRecord";
import ProgramList from "../screens/ProgramList";
import EditRecord from "../screens/EditRecord";
import Search from "../screens/Search";
import ExerciseList from "../screens/ExerciseList";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName, route }) {
  const scheme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTitle: "",
        headerTitleAlign: "left",
        headerTitleStyle: {
          color: scheme === "dark" ? "#FF7F50" : "#2389da",
          fontSize: 25,
          fontWeight: "700",
          marginLeft: 7,
        },
        headerStyle: { shadowColor: "transparent" },
      }}
    >
      {screenName === "Program" ? (
        <Stack.Screen
          name={"StackProgram"}
          component={Program}
          options={{ headerTitle: "Program" }}
        />
      ) : null}
      {screenName === "Record" ? (
        <Stack.Screen
          name={"StackRecord"}
          component={Record}
          options={{ headerTitle: "Record" }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen
          name={"StackSearch"}
          component={Search}
          options={{ headerTitle: "Search" }}
        />
      ) : null}

      {screenName === "Setting" ? (
        <Stack.Screen
          name={"StackSetting"}
          component={Setting}
          options={{ headerTitle: "Settings" }}
        />
      ) : null}
      <Stack.Screen name="CreateRecord" component={CreateRecord} />

      <Stack.Screen
        name="CreateExercise"
        component={CreateExercise}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ExerciseListModalProgram"
        component={ExerciseListModalProgram}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="ExerciseListModalRecord"
        component={ExerciseListModalRecord}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="CreateProgram" component={CreateProgram} />
      <Stack.Screen name="EditProgram" component={EditProgram} />
      <Stack.Screen name="SeeProgram" component={SeeProgram} />
      <Stack.Screen name="ProgramList" component={ProgramList} />
      <Stack.Screen name="ExerciseList" component={ExerciseList} />
      <Stack.Screen name="EditRecord" component={EditRecord} />
    </Stack.Navigator>
  );
}
