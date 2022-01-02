import React, { useEffect } from "react";
import { Text, View } from "react-native";
import useUser from "../hooks/useUser";

export default function Profile({ navigation }) {
  const { data } = useUser();
  console.log(data.me.username);
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
    <View>
      <Text>프로필</Text>
    </View>
  );
}
