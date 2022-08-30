import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

import { Web3AuthHook } from "../hooks/Web3Auth";

export default ProfileScreen = () => {
  const { login, logout, loggedin } = Web3AuthHook();

  const showLoggedIn = async () => {
    const response = await login();
    Toast.show({
      type: "success",
      text1: "Success! You're logged in",
      text2: `Account: ${response.userInfo.email}`,
    });
  };

  const showLogoutMessage = async () => {
    await logout();
    Toast.show({
      type: "error",
      text1: "Disconnected your wallet",
      autoHide: true,
      visibilityTime: 4000,
    });
  };

  return (
    <View style={styles.container}>
      <Toast position="top" bottomOffset={20} />
      <Text>Profile Screen here</Text>
      <Button title="Connect to account" onPress={showLoggedIn} />
      <Button title="Disconnect" onPress={showLogoutMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
