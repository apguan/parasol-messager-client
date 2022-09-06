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
          <Text style={styles.info}>{name ? "Welcome back," : "Sign In"}</Text>
          {name && <Text style={styles.info}>{name}!</Text>}
        </View>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressHeader}>Public Address</Text>
        <Text style={styles.addressBody}>{checksumAddress(publicAddress)}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressHeader}>Private Key</Text>
        <TouchableOpacity
          onPress={() => setPrivateKeyMode((prevState) => !prevState)}
          style={[{ height: 90 }]}
        >
          <Text
            style={[
              styles.addressBody,
              privateKey && privateKeyMode && { fontSize: 22 },
            ]}
            numberOfLines={5}
            ellipsizeMode="middle"
          >
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
    alignItems: "center",
    marginVertical: 100,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  info: {
    padding: 2,
    minWidth: "60%",
    fontFamily: "rt-mono-bold",
    fontSize: 32,
  },
  addressContainer: {
    width: "80%",
    marginVertical: 10,
  },
  addressHeader: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "rt-mono-bold",
    textTransform: "lowercase",
  },
  addressBody: {
    fontSize: 18,
    fontFamily: "rt-mono-med",
  },
});
