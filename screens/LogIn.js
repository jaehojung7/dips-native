import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import AuthButton from "../components/AuthButton";
import { TextInput } from "../components/AuthInput";
import AuthLayout from "../components/AuthLayout";
import { getVariableValues } from "graphql/execution/values";

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
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const passwordRef = useRef();

  const loginCompleted = (data) => {
    console.log(data);
  };

  const [loginFunction, { loading }] = useMutation(LOGIN_MUTATION, {
    loginCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onSubmitValid = (submissionData) => {
    // console.log(submissionData, loading);
    // if (!loading) {
    //   loginFunction({
    //     variables: {
    //       ...submissionData,
    //     },
    //   });
    // }

    if (loading) {
      return;
    }

    const { email, password } = getValues();
    console.log(email, password);
    loginFunction({
      variables: { email, password },
    });
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
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            placeholderTextColor="gray"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => setValue("email", text)}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
            lastOne={true}
            placeholderTextColor="gray"
            onSubmitEditing={handleSubmit(onSubmitValid)}
            onChangeText={(text) => setValue("password", text)}
          />
        )}
      />
      <AuthButton
        text="로그인"
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onSubmitValid)}
      />
    </AuthLayout>
  );
}
