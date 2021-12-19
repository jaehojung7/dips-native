import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/AuthButton";
import AuthLayout from "../components/AuthLayout";
import { TextInput } from "../components/AuthInput";
import ColorText from "../styles";

export default function CreateAccount() {
  const { register, handleSubmit, setValue } = useForm();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onDone = () => {
    alert("done!");
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        returnKeyType="next"
        placeholderTextColor="gray"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
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
      <AuthButton text="계정 만들기" disabled={false} onPress={() => null} />
    </AuthLayout>
  );
}
