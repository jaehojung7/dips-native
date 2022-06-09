import React, { useRef } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import AuthLayout from "../components/auth/AuthLayout";
import { gql, useMutation } from "@apollo/client";
import { AuthInput } from "../components/auth/AuthInput";
import styled from "styled-components/native";
import FormError from "../components/record-components/FormError";

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

const HeaderContainer = styled.View`
  margin: 25px 0;
  align-items: center;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

export default function CreateAccount({ navigation }) {
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onCompleted = (data) => {
    const {
      createAccount: { ok, id, error },
    } = data;
    const { email } = getValues();
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
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

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <HeaderContainer>
        <Header>Create your account</Header>
      </HeaderContainer>
      <Controller
        name="username"
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 4,
            message:
              "Username contains only letters and numbers, between 4 and 8 characters",
          },
          maxLength: {
            value: 8,
            message:
              "Username contains only letters and numbers, between 4 and 8 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthInput
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="next"
            placeholderTextColor="#999999"
            onSubmitEditing={() => onNext(emailRef)}
            onChangeText={(text) => setValue("username", text)}
            hasError={Boolean(errors?.username?.message)}
            onChange={clearLoginError}
          />
        )}
      />
      <FormError message={errors?.username?.message} />

      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Enter a valid email address",
          },
        }}
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
            hasError={Boolean(errors?.email?.message)}
            onChange={clearLoginError}
          />
        )}
      />
      <FormError message={errors?.email?.message} />

      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: "Password must be between 8 and 16 characters",
          },
          maxLength: {
            value: 16,
            message: "Password must be between 8 and 16 characters",
          },
          // pattern: {
          //   value:
          //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          //   message: "Password must contain 1 or more digit and uppercase characters ",
          // },
        }}
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
            hasError={Boolean(errors?.password?.message)}
            onChange={clearLoginError}
          />
        )}
      />
      <FormError message={errors?.password?.message} />

      <MainButton
        text="Sign up"
        loading={loading}
        disabled={!watch("username") || !watch("email") || !watch("password")}
        onPress={handleSubmit(onSubmitValid)}
      />
      <FormError message={errors?.result?.message} />
    </AuthLayout>
  );
}
