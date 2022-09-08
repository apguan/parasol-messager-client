import React, { useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import InputBox from "../components/ChatInput";
import ChatMessage from "../components/MessageItem";

import { MessagingContext } from "../context/Messages";
import { UserContext } from "../context/User";

export default MessagesScreen = ({ navigation, route }) => {
  const { roomId } = route.params;

  const { userInfo } = useContext(UserContext);
  const { sortedMessages, currentRoom } = useContext(MessagingContext);

  const me = userInfo?.userInfo?.email;

  return (
    <View style={styles.container}>
      <FlatList
        style={[styles.scrollView]}
        data={sortedMessages[currentRoom] || []}
        renderItem={({ item }) => <ChatMessage owner={me} message={item} />}
        inverted
      />
      <InputBox chatRoomID={roomId} owner={me} />
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
