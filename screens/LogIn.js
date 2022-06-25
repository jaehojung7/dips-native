import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import client, { logUserIn } from "../apollo";
import styled from "styled-components/native";
import FormError from "../components/record-components/FormError";
import AuthLayout, { AuthInput } from "../components/layouts/AuthLayout";
import { SuccessMessage } from "../components/layouts/MainContainer";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
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
  font-size: 50px;
  font-weight: 800;
  margin-bottom: 30px;
`;

const Subtitle = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 20px;
  font-weight: 600;
`;

const SignupLink = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.mainColor};
  font-weight: 600;
  margin-top: 5px;
  text-align: center;
`;

export default function Login({ navigation, route }) {
  const successMessage = route.params?.successMessage;
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({});
  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const {
      login: { ok, token, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
    if (ok) {
      await logUserIn(token).then(() => client.resetStore());
    }
  };

  const [loginFunction, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onSubmitValid = (submissionData) => {
    // Prevents login function from working in case the user clicks the button twice
    if (loading) {
      return;
    }
    const { email, password } = getValues();
    loginFunction({
      variables: { email, password },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <HeaderContainer>
        <Header>Dips</Header>
        <Subtitle>Squat, dip, lift your workout</Subtitle>
      </HeaderContainer>
      {successMessage ? (
        <SuccessMessage>{successMessage}</SuccessMessage>
      ) : null}
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            placeholderTextColor="#999999"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => setValue("email", text)}
            onChange={clearLoginError}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
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
            onChange={clearLoginError}
          />
        )}
      />

      <FormError message={errors?.result?.message} />
      <MainButton
        text="Log in"
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onSubmitValid)}
      />

      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <SignupLink>Create account</SignupLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
