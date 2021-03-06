import AppLoading from "expo-app-loading";
import { React, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styles";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    background: "black",
    card: "black",
    border: "#999999",
    text: "white",
  },
};

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    background: "#fbfbfb",
    card: "#fbfbfb",
    border: "#999999",
    text: "black",
  },
};

export default function App() {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onFinish = () => setLoading(false);
  const preloadAssets = () => {
    const fontsToLoad = [FontAwesome.font, FontAwesome5.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/favicon.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <ThemeProvider theme={scheme === "dark" ? darkTheme : lightTheme}>
          <NavigationContainer
            documentTitle={{
              formatter: (options, route) => `Dips`,
            }}
            theme={scheme === "dark" ? MyDarkTheme : MyLightTheme}
          >
            {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
