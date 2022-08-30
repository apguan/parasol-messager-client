import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

import { Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import MessageScreen from "../screens/Messages";

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Messages" component={MessageScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const NavigationTabs = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: "#ffffff",
          inactiveTintColor: "#363234",
          activeBackgroundColor: "#454ADE",
        }}
        appearance={{
          floating: true,
          shadow: true,
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="home"
                size={size}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Messages"
          component={MessageScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="message-circle"
                size={size}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="settings"
                size={size}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
