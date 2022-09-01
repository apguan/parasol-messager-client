// Import the required shims
import "@ethersproject/shims";

import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import { RootNavigator } from "./navigation/RootNavigator";
import { MessagingProvider } from "./context/Messages";

export default function App() {
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <MessagingProvider>
        <RootNavigator />
      </MessagingProvider>
    </NavigationContainer>
  );
}
