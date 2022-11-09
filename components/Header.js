import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { HStack, Spacer, Text } from "swiftui-react-native";
import { useNavigation } from "@react-navigation/native";
import { HEADER_HEIGHT } from "../theme";

// the size of the touchable surface
const HIT_SLOP = { top: 15, bottom: 15, left: 15, right: 10 };

export default Header = ({
  profileImage,
  title,
  showBorder = false,
  style = {},
}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <HStack
      alignment="center"
      style={[styles.header, style, showBorder && { borderBottomWidth: 1 }]}
    >
      <TouchableOpacity hitSlop={HIT_SLOP} onPress={goBack}>
        <FontAwesome name="chevron-left" size={20} color="#999999" />
      </TouchableOpacity>
      <TouchableOpacity>
        {Boolean(profileImage) && (
          <Image
            style={[styles.placeholder]}
            height={40}
            width={40}
            source={{ uri: profileImage }}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.title} fontSize={20} customFont={"satoshi-black"}>
        {Boolean(title) && title}
      </Text>
      <Spacer />
    </HStack>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: HEADER_HEIGHT,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignContent: "flex-start",
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
