// Import the required shims
import "@ethersproject/shims";

import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { RootNavigator } from "./navigation/RootNavigator";
import MessagingProvider from "./context/Messages";
import UserProvider from "./context/User";

export default function App() {
  const [fontsLoaded] = useFonts({
    "rt-mono-thin": require("./assets/Roboto_Mono/RobotoMono-Light.ttf"),
    "rt-mono-med": require("./assets/Roboto_Mono/RobotoMono-Medium.ttf"),
    "rt-mono-bold": require("./assets/Roboto_Mono/RobotoMono-Bold.ttf"),
  });

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <UserProvider>
        <MessagingProvider>
          <RootNavigator />
        </MessagingProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
