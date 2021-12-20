import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/AuthButton";
import { TextInput } from "../components/AuthInput";
import AuthLayout from "../components/AuthLayout";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const passwordRef = useRef();
  const onCompleted = (data) => {
    console.log(data);
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
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
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="로그인"
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
