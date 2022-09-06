import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ethers } from "ethers";

export default ProfileCard = ({
  name,
  profileImage,
  email,
  publicAddress,
  privateKey,
}) => {
  const [privateKeyMode, setPrivateKeyMode] = useState(true);

  const starOutPrivateKey = () => {
    if (privateKeyMode) {
      return privateKey && privateKey.replace(/./g, "*");
    }
    return privateKey;
  };

  const checksumAddress = (address) => {
    return address && ethers.utils.getAddress(address);
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.profileImg}
          source={{
            uri: profileImage,
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.info}>Welcome back,</Text>
          <Text style={styles.info}>{name}!</Text>
        </View>
      </View>
      <View>
        <Text>Public Address</Text>
        <Text>{checksumAddress(publicAddress)}</Text>
      </View>
      <View style={{ width: "80%" }}>
        <TouchableOpacity
          onPress={() => setPrivateKeyMode((prevState) => !prevState)}
        >
          <Text>Private Key</Text>
          <Text numberOfLines={1} ellipsizeMode="middle">
            {starOutPrivateKey()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    height: 250,
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  info: {
    padding: 2,
    fontWeight: "bold",
    fontSize: 32,
  },
});
