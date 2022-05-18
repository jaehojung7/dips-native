import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      // initialRouteName="Search"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "left",
        headerTitleStyle: {
          color: "#FF7F50",
          fontSize: 26,
          fontWeight: "700",
          marginTop: 25,
          marginLeft: 10,
        },
        headerStyle: {
          shadowColor: "transparent",
          height: 70,
        },
        tabBarActiveTintColor: "#FF7F50",
        tabBarInactiveTintColor: "#797d7f",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      }}
    >
      <Tabs.Screen
        name="Workout"
        options={{
          // title: "프로그램",
          tabBarLabel: "Program",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Program" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Record"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart-o" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Record" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Exercise"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list-ul" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Exercise" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Setting"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Setting" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
