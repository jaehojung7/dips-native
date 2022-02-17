import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Program from "../screens/Program";
import Stats from "../screens/Stats";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Workout from "../screens/Workout";
import CreateProgram from "../screens/CreateProgram";
import SeeProgram from "../screens/SeeProgram";
import EditProgram from "../screens/EditProgram";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerMode: "screen",
      }}
    >
      {screenName === "Program" ? (
        <Stack.Screen name={"StackProgram"} component={Program} />
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
      <Stack.Screen name="StackWorkout" component={Workout} />
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
