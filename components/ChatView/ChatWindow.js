import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Animated from "react-native-reanimated";
import { FlatList, StyleSheet, View } from "react-native";

import ChatBubble from "./ChatBubble";

import { MESSAGES } from "../../_fixtures/chat-messages";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ChatWindow = () => {
  const flatListRef = useRef();
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    handleScrollDown();
  }, []);

  // TODO: implement clustering to determine the start/end of a group of messages
  // this will allow us to render in the heads/tails of message bubbles correctly
  const clusteredMessages = useMemo(
    () => MESSAGES.map((msg) => msg).reverse(),
    []
  );

  const pauseAutoScroll = ({ nativeEvent }) => {
    const marginOfError = 20;
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
    const pauseScrolling =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - marginOfError;
    setScrollUp(pauseScrolling);
  };

  const handleScrollDown = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <>
      <AnimatedFlatList
        ref={flatListRef}
        onContentSizeChange={handleScrollDown}
        onLayout={() => scrollUp && handleScrollDown()}
        style={[styles.container]}
        data={clusteredMessages}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onScroll={pauseAutoScroll}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingHorizontal: 20,
  },
  arrowDown: {
    position: "absolute",
    alignSelf: "center",
    top: 680,
    height: 30,
    width: 30,
  },
  separator: {
    height: 10,
  },
});

export default memo(ChatWindow);
