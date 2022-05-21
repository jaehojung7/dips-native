import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import AuthLayout from "../components/auth/AuthLayout";
import { logUserIn } from "../apollo";
import styled from "styled-components/native";
import { AuthInput } from "../components/auth/AuthInput";

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
  font-size: 20px;
  font-weight: 700;
`;

export default function Login({ route }) {
  const { register, handleSubmit, setValue, getValues, watch, control } =
    useForm({
      defaultValues: {
        email: route.params?.email,
      },
    });
  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const {
      login: { ok, token, error },
    } = data;
    if (ok) {
      await logUserIn(token);
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
      <HeaderContainer>
        <Header>Log in</Header>
      </HeaderContainer>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthInput
            value={watch("email")}
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
        text="로그인"
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onSubmitValid)}
      />
    </AuthLayout>
  );
}
