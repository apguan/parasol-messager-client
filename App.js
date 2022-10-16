import React, { useEffect } from "react";
import { EnvironmentProvider } from "swiftui-react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { OnboardingNavigator, RootNavigator } from "./navigation/Navigation.js";
import WalletConnect from "./crypto/WalletConnect.js";

export default function App() {
  const [fontsLoaded] = useFonts({
    "satoshi-black": require("./assets/font/Satoshi-Black.otf"),
    "satoshi-bold": require("./assets/font/Satoshi-Bold.otf"),
    "satoshi-regular": require("./assets/font/Satoshi-Regular.otf"),
    "satoshi-medium": require("./assets/font/Satoshi-Medium.otf"),
    "satoshi-light": require("./assets/font/Satoshi-Light.otf"),
  });

  const isAuthenticated = true;

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
      <EnvironmentProvider>
        <WalletConnect>
          {isAuthenticated ? <RootNavigator /> : <OnboardingNavigator />}
        </WalletConnect>
      </EnvironmentProvider>
    </NavigationContainer>
  );
}
