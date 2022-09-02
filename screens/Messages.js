import React, { useState, useEffect, useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import InputBox from "../components/ChatInput";
import ChatMessage from "../components/MessageItem";

import { MessagingContext } from "../context/Messages";

export default MessagesScreen = ({ navigation, route }) => {
  const { roomId } = route.params;
  const { sortedMessages, currentRoom } = useContext(MessagingContext);

  return (
    <View style={styles.container}>
      <FlatList
        style={[styles.scrollView]}
        data={(sortedMessages[currentRoom] || []).reverse()}
        renderItem={({ item }) => (
          <ChatMessage owner={"hotdoghelper"} message={item} />
        )}
        inverted
      />
      <InputBox chatRoomID={roomId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingBottom: 20,
  },
  scrollView: { marginHorizontal: 10 },
  messageView: {
    flex: 1,
    width: "75%",
    margin: 5,
  },
  inputView: {
    flex: 1,
    width: "100%",
    height: 40,
    position: "absolute",
    bottom: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
