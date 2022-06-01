import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Record from "../screens/Record";
import CreateRecord from "../screens/CreateRecord";
import ExerciseListModalRecord from "../screens/ExerciseListModalRecord";
import EditRecord from "../screens/EditRecord";
import Search from "../screens/Search";

const Stack = createStackNavigator();

export default function StackRecord({ screenName, data, loading, refetch }) {
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
      {screenName === "Record" ? (
        <Stack.Screen
          name={"StackRecord"}
          component={Record}
          initialParams={{ data, loading, refetch }}
        />
      ) : null}

      {screenName === "Search" ? (
        <Stack.Screen name={"StackSearch"} component={Search} />
      ) : null}

      <Stack.Screen
        name="ExerciseListModalRecord"
        component={ExerciseListModalRecord}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen name="CreateRecord" component={CreateRecord} />
      <Stack.Screen name="EditRecord" component={EditRecord} />
    </Stack.Navigator>
  );
}
