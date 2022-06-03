import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import StackProgram from "./StackProgram";
import StackSetting from "./StackSetting";
import StackRecord from "./StackRecord";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const scheme = useColorScheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        // headerTitleAlign: "left",
        // headerTitleStyle: {
        //   color: "#FF7F50",
        //   fontSize: 26,
        //   fontWeight: "700",
        //   marginTop: 25,
        //   marginLeft: 10,
        // },
        // headerStyle: {
        //   shadowColor: "transparent",
        //   height: 70,
        // },
        tabBarActiveTintColor: scheme === "dark" ? "#FF7F50" : "#2389da",
        tabBarInactiveTintColor: "#797d7f",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      }}
    >
      <Tabs.Screen
        name="Programs"
        options={{
          tabBarLabel: "Programs",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={22} color={color} />
          ),
        }}
      >
        {() => <StackProgram screenName="Program" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Records"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart-o" size={22} color={color} />
          ),
        }}
      >
        {() => <StackRecord screenName="Record" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={22} color={color} />
          ),
        }}
      >
        {() => <StackRecord screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={22} color={color} />
          ),
        }}
      >
        {() => <StackSetting screenName="Setting" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
