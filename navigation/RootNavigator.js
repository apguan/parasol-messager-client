import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import MessageScreen from "../screens/Messages";

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();

export const ContactsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Messages">
      <Stack.Screen name="Messages" component={MessageScreen} />
      <Stack.Screen name="Friends" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export const MessagesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Friends">
      <Stack.Screen name="Messages" component={MessageScreen} />
      <Stack.Screen name="Friends" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Messages" component={MessageScreen} />
      <Stack.Screen name="Friends" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
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
          tabButtonLayout: "vertical",
        }}
      >
        <Tabs.Screen
          name="Messages"
          component={MessagesNavigator}
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
          name="Friends"
          component={ContactsNavigator}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign
                name="contacts"
                size={size}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileNavigator}
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
