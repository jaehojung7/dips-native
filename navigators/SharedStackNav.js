import React from "react";
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
import SettingPrograms from "../screens/SettingPrograms";
import EditRecord from "../screens/EditRecord";
import Search from "../screens/Search";
import ExerciseList from "../screens/ExerciseList";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName, route }) {
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
        <Stack.Screen name={"StackProgram"} component={Program} />
      ) : null}
      {screenName === "Record" ? (
        <Stack.Screen name={"StackRecord"} component={Record} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"StackSearch"} component={Search} />
      ) : null}

      {screenName === "Setting" ? (
        <Stack.Screen name={"StackSetting"} component={Setting} />
      ) : null}
      <Stack.Screen name="CreateRecord" component={CreateRecord} />

      <Stack.Screen
        name="CreateExercise"
        component={CreateExercise}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ExerciseListModalProgram"
        component={ExerciseListModalProgram}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseListModalRecord"
        component={ExerciseListModalRecord}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen name="CreateProgram" component={CreateProgram} />
      <Stack.Screen name="EditProgram" component={EditProgram} />
      <Stack.Screen name="SeeProgram" component={SeeProgram} />
      <Stack.Screen name="SettingPrograms" component={SettingPrograms} />
      <Stack.Screen name="ExerciseList" component={ExerciseList} />
      <Stack.Screen name="EditRecord" component={EditRecord} />
    </Stack.Navigator>
  );
}
