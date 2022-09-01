import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

// import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import ProfileScreen from "../screens/Profile";
import RoomScreen from "../screens/Rooms";
import MessagesScreen from "../screens/Messages";

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();

const NavigationTabs = () => {
  return (
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
        name="Chats"
        component={RoomScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="message-circle"
              size={size}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Settings"
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
  );
};

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Rooms">
      <Stack.Screen name="Rooms" component={NavigationTabs} />
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={({ route }) => ({
          title: route.params.chatName,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: "Settings",
        })}
      />
    </Stack.Navigator>
  );
};
