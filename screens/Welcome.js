import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ColorText from "../styles";

export default function Welcome({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ColorText>Welcome</ColorText>
      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <View>
          <ColorText>로그인</ColorText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Workout")}>
        <View>
          <ColorText>운동하기</ColorText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <ColorText>가입하기</ColorText>
        </View>
      </TouchableOpacity>
    </View>
  );
}
