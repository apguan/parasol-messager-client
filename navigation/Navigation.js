import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Onboarding screens here
import Welcome from "../screens/Onboarding/Welcome";
import PhoneNumber from "../screens/Onboarding/PhoneNumber";
import Username from "../screens/Onboarding/Username";
import Verify from "../screens/Onboarding/Verify";

// Authenticated 
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ChatScreen from "../screens/ChatScreen/ChatScreen";

import ProfileScreen from "../screens/Profile";
import MessagesScreen from "../screens/Messages";

const OnboardingStack = createNativeStackNavigator();
const AuthedStack = createNativeStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardingStack.Screen name="Welcome" component={Welcome} />
      <OnboardingStack.Screen name="PhoneNumber" component={PhoneNumber} />
      <OnboardingStack.Screen name="Verify" component={Verify} />
      <OnboardingStack.Screen name="Username" component={Username} />
    </OnboardingStack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <AuthedStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthedStack.Screen name="HomeScreen" component={HomeScreen} />
      <AuthedStack.Screen name="ChatScreen" component={ChatScreen} />
    </AuthedStack.Navigator>
  );
};
