import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";
import Workout from "../screens/Workout";
import CreateWorkout from "../screens/CreateWorkout";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{ title: "로그인" }}
      />
      <Stack.Screen
        name="Workout"
        component={CreateWorkout}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ title: "가입하기" }}
      />
    </Stack.Navigator>
  );
}
