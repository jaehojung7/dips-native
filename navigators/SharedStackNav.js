import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Program from "../screens/Program";
import Record from "../screens/Record";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import CreateRecord from "../screens/CreateRecord";
import CreateProgram from "../screens/CreateProgram";
import SeeProgram from "../screens/SeeProgram";
import EditProgram from "../screens/EditProgram";
import CreateExercise from "../screens/CreateExercise";
import ExerciseListModalProgram from "../screens/ExerciseListModalProgram";
import ExerciseListModalRecord from "../screens/ExerciseListModalRecord";
import SearchExercise from "../screens/SearchExercise";

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
        <Stack.Screen name={"StackSearch"} component={SearchExercise} />
      ) : null}

      {screenName === "Profile" ? (
        <Stack.Screen name={"StackProfile"} component={Profile} />
      ) : null}
      <Stack.Screen name="CreateRecord" component={CreateRecord} />

      <Stack.Screen
        name="CreateExercise"
        component={CreateExercise}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseListModalProgram"
        component={ExerciseListModalProgram}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseListModalRecord"
        component={ExerciseListModalRecord}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen name="CreateProgram" component={CreateProgram} />
      <Stack.Screen name="EditProgram" component={EditProgram} />
      <Stack.Screen
        name="SeeProgram"
        component={SeeProgram}
        // options={{
        //   headerBackTitleVisible: false,
        //   headerTintColor: "#42a5f5",
        //   headerShown: true,
        //   title: "프로그램 이름",
        //   headerTitleStyle: {
        //     fontSize: 22,
        //     fontWeight: "700",
        //   },
        //   headerTitleContainerStyle: {
        //     marginTop: 15,
        //   },
        //   headerLeftContainerStyle: {
        //     marginTop: 15,
        //   },
        //   headerStyle: {
        //     shadowColor: "transparent",
        //   },
        // }}
      />
    </Stack.Navigator>
  );
}
