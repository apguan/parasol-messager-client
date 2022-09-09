import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/MessageItem";

import { MessagingContext } from "../context/Messages";
import { UserContext } from "../context/User";

export default MessagesScreen = ({ navigation, route }) => {
  const { roomId } = route.params;

  const { userInfo } = useContext(UserContext);
  const { sortedMessages, currentRoom } = useContext(MessagingContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    dedupe();
  }, []);

  const me = userInfo?.userInfo?.email;

  const dedupe = () => {
    const uniqueAddresses = (sortedMessages[currentRoom] || []).reduce(
      (acc, val) => {
        acc[val.connected_wallet] = val.username;
        return acc;
      },
      {}
    );
    setUsers(uniqueAddresses);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={[styles.scrollView]}
        data={sortedMessages[currentRoom] || []}
        renderItem={({ item }) => <ChatMessage owner={me} message={item} />}
        inverted
      />
      <ChatInput
        chatRoomID={roomId}
        owner={me}
        navigation={navigation}
        userAddresss={users}
      />
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
