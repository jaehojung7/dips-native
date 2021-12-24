import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";

export default function Workout({ navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}
