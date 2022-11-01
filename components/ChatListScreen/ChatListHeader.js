import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { HStack, Spacer, Text } from "swiftui-react-native";
import { useNavigation } from "@react-navigation/native";

const PERSON = require("../../assets/add_person.png");

export default ChatListHeader = ({ profileImage }) => {
  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <HStack alignment="center" style={styles.header}>
      <TouchableOpacity onPress={goToProfile}>
        {profileImage ? (
          <Image
            style={[styles.placeholder, styles.profileIcon]}
            height={40}
            width={40}
            source={{ uri: profileImage }}
          />
        ) : (
          <View style={[styles.placeholder, styles.profileIcon]}></View>
        )}
      </TouchableOpacity>
      <Text style={styles.title} fontSize={24} customFont={"satoshi-black"}>
        Conversations
      </Text>
      <Spacer />
      <TouchableOpacity>
        <Image style={[styles.friendIcon]} source={PERSON} />
      </TouchableOpacity>
    </HStack>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 68,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignContent: "flex-start",
    backgroundColor: "white",
  },
  title: {
    lineHeight: 32,
    width: 266,
    textAlign: "left",
    paddingLeft: 10,
  },
  profileIcon: {
    borderRadius: 50,
  },
  friendIcon: {
    width: 24,
    height: 24,
  },
  placeholder: {
    backgroundColor: "pink",
    height: 45,
    width: 45,
  },
});
