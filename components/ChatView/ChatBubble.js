import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "react-native-animatable";
import { VStack } from "swiftui-react-native";

export default ChatBubble = ({ message, sender, isSender }) => {
  return (
    <VStack
      style={styles.container}
      alignment={isSender ? "trailing" : "leading"}
    >
      <Text style={[styles.name]}>{sender}</Text>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isSender ? "#5048E5" : "rgba(217, 217, 217, 0.3)",
            color: isSender ? "white" : "#3F3F46",
          },
        ]}
      >
        <Text
          style={[
            {
              color: isSender ? "white" : "#3F3F46",
            },
          ]}
        >
          {message}
        </Text>
      </View>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: { width: 390 },
  name: {
    marginHorizontal: 20,
  },
  bubble: {
    maxWidth: 250,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
