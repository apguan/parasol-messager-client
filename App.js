// Import the required shims
import "@ethersproject/shims";

import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import { NavigationTabs } from "./navigation/RootNavigator";

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
    <>
      <NavigationTabs />
    </>
  );
}
