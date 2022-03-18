import React, { useRef } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import AuthLayout from "../components/auth/AuthLayout";
import { gql, useMutation } from "@apollo/client";
import { AuthInput } from "../components/auth/AuthInput";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, getValues, control } = useForm();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onCompleted = (data) => {
    const {
      createAccount: { ok, id },
    } = data;
    console.log(ok, id);
    const { email } = getValues();
    if (ok) {
      navigation.navigate("LogIn", {
        email,
      });
    }
  };

  const [createAccountFunction, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { username, email, password } = getValues();
    createAccountFunction({
      variables: { username, email, password },
    });
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
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthInput
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="next"
            placeholderTextColor="#999999"
            onSubmitEditing={() => onNext(emailRef)}
            onChangeText={(text) => setValue("username", text)}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthInput
            ref={emailRef}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            placeholderTextColor="#999999"
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
          <AuthInput
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
            lastOne={true}
            placeholderTextColor="#999999"
            onSubmitEditing={handleSubmit(onSubmitValid)}
            onChangeText={(text) => setValue("password", text)}
          />
        )}
      />
      <MainButton
        text="계정 만들기"
        disabled={false}
        loading={loading}
        onPress={handleSubmit(onSubmitValid)}
      />
    </AuthLayout>
  );
}
