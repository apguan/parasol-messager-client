import React from "react";
import { StyleSheet } from "react-native";
import { VStack, RoundedRectangle, HStack, Text } from "swiftui-react-native";
import { EvilIcons } from "@expo/vector-icons";

const WalletModal = ({ children }) => {
  return (
    <VStack style={styles.container}>
      <HStack>
        <EvilIcons name="question" size={24} color="black" />
        <Text>Connect Wallet</Text>
        <EvilIcons name="close" size={24} color="black" />
      </HStack>
      <RoundedRectangle>{children}</RoundedRectangle>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 397,
    width: 351,
    top: 213,
    backgroundColor: "white",
    borderRadius: 40,
  },
});

export default WalletModal;
