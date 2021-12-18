import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Workout from "../screens/Workout";
import Stats from "../screens/Stats";
import Plan from "../screens/Plan";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator initialRouteName="Workout">
      <Tabs.Screen name="Plan" component={Plan} />
      <Tabs.Screen name="Workout" component={Workout} />
      <Tabs.Screen name="Stats" component={Stats} />
    </Tabs.Navigator>
  );
}
