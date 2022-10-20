import React, { memo, useMemo } from "react";
import Animated from "react-native-reanimated";
import { FlatList, StyleSheet } from "react-native";

import ChatBubble from "./ChatBubble";

import { MESSAGES } from "../_fixtures/chat-messages";
import { View } from "react-native-animatable";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ChatWindow = () => {
  // TODO implement clustering
  const clusteredMessages = useMemo(() => MESSAGES.map((msg, idx) => msg));

  return (
    <AnimatedFlatList
      style={[styles.container]}
      data={clusteredMessages}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />;
      }}
      renderItem={({ item }) => {
        const isSender = item.sender !== "Parasol Bot";

        return (
          <ChatBubble
            message={item.message}
            sender={item.sender}
            isSender={isSender}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  separator: {
    height: 10,
  },
});

export default memo(ChatWindow);
