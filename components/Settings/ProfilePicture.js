import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { VStack } from "swiftui-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HEADER_HEIGHT } from "../../theme";

export default ProfilePicture = ({
  profileImage,
  username,
  userHandle,
  isEditable,
}) => {
  return (
    <VStack style={styles.container}>
      {profileImage ? (
        <Image
          style={styles.picture}
          height={100}
          width={100}
          source={{ uri: profileImage }}
        />
      ) : (
        <View style={styles.picture}></View>
      )}
      {isEditable && (
        <TouchableOpacity activeOpacity={0.8} style={styles.editButton}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={20}
            color="black"
          />
        </TouchableOpacity>
      )}
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
    left: HEADER_HEIGHT,
    top: HEADER_HEIGHT,
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
