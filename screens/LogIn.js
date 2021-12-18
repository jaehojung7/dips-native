import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Login({ navigation }) {
  return (
    <View>
      <Text>이메일</Text>
      <Text>비밀번호</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>가입하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
