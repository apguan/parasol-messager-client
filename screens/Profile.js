import React, { useContext } from "react";
import { ScrollView, Button, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { UserContext } from "../context/User";
import ProfileCard from "../components/ProfileCard";

export default ProfileScreen = () => {
  const {
    login,
    logout,
    name,
    email,
    publicAddress,
    privateKey,
    profileImage,
    userInfo,
  } = useContext(UserContext);

  const showLoggedIn = async () => {
    const response = await login();
    Toast.show({
      type: "success",
      text1: "Success! You're logged in",
      text2: `Account: ${response.userInfo?.email}`,
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

  const copyPaste = () => {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Toast position="top" bottomOffset={20} />
      <ProfileCard
        profileImage={
          profileImage ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        name={name}
        email={email}
        publicAddress={publicAddress}
        privateKey={privateKey}
      />
      {!userInfo ? (
        <Button title="Connect to account" onPress={showLoggedIn} />
      ) : (
        <Button title="Disconnect" onPress={showLogoutMessage} color={"red"} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});
