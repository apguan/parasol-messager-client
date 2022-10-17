import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { HStack, Spacer, VStack } from "swiftui-react-native";

const BASE_COLOR = "#5048E5";
const NEW_COLOR = "#D1D5DB";

export default SuggestedContact = ({
  profileImage,
  name,
  username,
  identifier,
  isSelected,
  selectContact,
}) => {
  const [select, setSelect] = useState(false);

  return (
    <TouchableOpacity onPress={() => setSelect(!select)}>
      <HStack style={styles.container}>
        {profileImage ? (
          <Image
            style={styles.imageBase}
            height={48}
            width={48}
            source={{ uri: profileImage }}
          />
        ) : (
          <View style={styles.imageBase} />
        )}
        <VStack style={styles.textContainer} alignment="leading">
          <Text style={[styles.textBase, { fontFamily: "satoshi-bold" }]}>
            {name ? name : "Unknown Name"}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.textBase, { color: "rgba(0,0,0,0.5)" }]}
            ellipsizeMode={"tail"}
          >
            {username ? username : "Unknown username"} •{" "}
            {identifier ? identifier : "Unknown identifier"}
          </Text>
        </VStack>
        <Spacer />
        {/* Selector */}
        <Animated.View
          style={[
            styles.outterSelector,
            { borderColor: select ? BASE_COLOR : NEW_COLOR },
          ]}
        >
          <Animated.View
            style={[styles.innerSelector, { opacity: select ? 1 : 0 }]}
          />
        </Animated.View>
      </HStack>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    minHeight: 48,
  },
  textBase: {
    fontSize: 14,
    fontFamily: "satoshi-regular",
  },
  textContainer: {
    marginLeft: 10,
    width: 262,
  },
  imageBase: {
    height: 48,
    width: 48,
    borderRadius: 48,
    backgroundColor: "#d9d9d9",
  },

  outterSelector: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerSelector: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: BASE_COLOR,
  },
});
