import React, { useEffect, useState } from "react";
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
  const { login, logout, loggedIn } = Web3AuthHook();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profileImg, setProfileImg] = useState();
  const [privateKey, setPrivateKey] = useState();

  useEffect(() => {
    if (loggedIn) {
      const { name, email, profileImage } = loggedIn?.userInfo;
      setName(name);
      setEmail(email);
      setPrivateKey(loggedIn.privKey);
      setProfileImg(profileImage);
    } else {
      setName(null);
      setEmail(null);
      setPrivateKey(null);
      setProfileImg(null);
    }
  }, [loggedIn]);

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
  console.log(profileImg);
  return (
    <View style={styles.container}>
      <Toast position="top" bottomOffset={20} />
      <Image
        style={styles.tinyLogo}
        source={{
          uri:
            profileImg ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        }}
      />
      <Text>{name}</Text>
      <Text>{email}</Text>
      <Text>{privateKey}</Text>
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
