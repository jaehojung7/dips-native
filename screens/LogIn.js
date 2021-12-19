import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/AuthButton";
import { TextInput } from "../components/AuthInput";
import AuthLayout from "../components/AuthLayout";

export default function Login({ navigation }) {
  const passwordRef = useRef();
  const onDone = () => {
    alert("done!");
  };
  return (
    <AuthLayout>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        placeholderTextColor="gray"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor="gray"
        onSubmitEditing={onDone}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton text="로그인" disabled={false} onPress={() => null} />
    </AuthLayout>
  );
}
