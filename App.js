import AppLoading from "expo-app-loading";
import { React, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
};

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/favicon.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
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
    <AppearanceProvider>
      <ThemeProvider theme={scheme === "dark" ? darkTheme : lightTheme}>
        <NavigationContainer
          theme={scheme === "dark" ? MyDarkTheme : MyLightTheme}
        >
          <LoggedOutNav />
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
