import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { VStack } from "swiftui-react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ProfilePicture = ({ image, username, userHandle }) => {
  return (
    <VStack style={styles.container}>
      <View style={styles.picture}></View>
      <TouchableOpacity activeOpacity={0.8} style={styles.editButton}>
        <MaterialCommunityIcons name="pencil-outline" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.username}>{username || "Placeholder Name"}</Text>
      <Text style={styles.userHandle}>{userHandle || "@placholder"}</Text>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", paddingBottom: 73 },
  picture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#E8A7FF",
  },
  editButton: {
    position: "absolute",
    left: 68,
    top: 68,
    height: 32,
    width: 32,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(153, 153, 153, 0.3)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    position: "absolute",
    top: 110,
    color: "black",
    lineHeight: 32,
    fontSize: 24,
    fontFamily: "satoshi-black",
  },
  userHandle: {
    position: "absolute",
    top: 144,
    color: "#999999",
    lineHeight: 27,
    fontSize: 20,
    fontFamily: "satoshi-bold",
  },
});