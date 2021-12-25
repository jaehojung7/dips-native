import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import MainButton from "../components/MainButton";
import { TextInput } from "../components/AuthInput";
import AuthLayout from "../components/AuthLayout";
import { isLoggedInVar, logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
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
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={watch("email")}
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
      <MainButton
        text="로그인"
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onSubmitValid)}
      />
    </AuthLayout>
  );
}
