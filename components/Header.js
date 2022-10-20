import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { HStack, Spacer, Text } from "swiftui-react-native";
import { useNavigation } from "@react-navigation/native";

export default Header = ({ profileImage, title }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <HStack alignment="center" style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <FontAwesome name="chevron-left" size={20} color="#999999" />
      </TouchableOpacity>
      <TouchableOpacity>
        {profileImage ? (
          <Image
            style={[styles.placeholder]}
            height={40}
            width={40}
            source={{ uri: profileImage }}
          />
        ) : (
          <View style={[styles.placeholder]}></View>
        )}
      </TouchableOpacity>
      <Text style={styles.title} fontSize={20} customFont={"satoshi-black"}>
        Bored and Hungry
      </Text>
      <Spacer />
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
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    lineHeight: 28,
    width: 236,
    textAlign: "left",
    paddingLeft: 10,
  },
  friendIcon: {
    width: 24,
    height: 24,
  },
  placeholder: {
    marginLeft: 10,
    borderRadius: 50,
    backgroundColor: "pink",
    height: 45,
    width: 45,
  },
});
