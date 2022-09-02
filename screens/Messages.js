import React, { useState, useEffect, useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import InputBox from "../components/ChatInput";
import ChatMessage from "../components/MessageItem";

import { MessagingContext } from "../context/Messages";

export default MessagesScreen = ({ navigation, route }) => {
  const { roomId } = route.params;

  const { getMessages, sendMessage } = useContext(MessagingContext);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages(roomId);
      setMessages(msgs || []);
    };

    fetchMessages();
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage owner={"hotdoghelper"} message={item} />
        )}
        inverted
      />
      <InputBox chatRoomID={route.params.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    borderWidth: 2,
    padding: 5,
    backgroundColor: "red",
  },
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
