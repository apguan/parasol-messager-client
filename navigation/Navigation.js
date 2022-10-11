import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Onboarding screens here
import Welcome from "../screens/Onboarding/Welcome";
import PhoneNumber from "../screens/Onboarding/PhoneNumber";
import Username from "../screens/Onboarding/Username";
import Verify from "../screens/Onboarding/Verify";

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
    <AuthedStack.Navigator initialRouteName="Rooms">
      <AuthedStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={({ route }) => ({
          title: route.params.chatName,
        })}
      />
      <AuthedStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: "Settings",
        })}
      />
    </AuthedStack.Navigator>
  );
};
