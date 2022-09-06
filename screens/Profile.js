import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import { ethers } from "ethers";

import ProfileCard from "../components/ProfileCard";
import { Web3AuthHook } from "../hooks/Web3Auth";

export default ProfileScreen = () => {
  const { login, logout, loggedIn } = Web3AuthHook();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profileImg, setProfileImg] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [publicAddress, setPublicAddress] = useState();

  useEffect(() => {
    if (loggedIn) {
      const { name, email, profileImage } = loggedIn?.userInfo;
      const wallet = new ethers.Wallet(loggedIn.privKey);

      setName(name);
      setEmail(email);
      setPrivateKey(loggedIn.privKey);
      setProfileImg(profileImage);
      setPublicAddress(wallet.address);
    } else {
      setName(null);
      setEmail(null);
      setPrivateKey(null);
      setPublicAddress(null);
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Toast position="top" bottomOffset={20} />
      <ProfileCard
        profileImage={
          profileImg ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        name={name}
        email={email}
        publicAddress={publicAddress}
        privateKey={privateKey}
      />
      <Button title="Connect to account" onPress={showLoggedIn} />
      <Button title="Disconnect" onPress={showLogoutMessage} />
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
