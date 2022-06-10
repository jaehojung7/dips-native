import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: "",
        headerTransparent: true,
        headerStyle: { shadowColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        option={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        option={{ title: "Sign up" }}
      />
    </Stack.Navigator>
  );
}
