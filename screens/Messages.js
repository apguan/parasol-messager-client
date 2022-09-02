import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";

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
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView style={styles.scrollView}>
        {messages.map((message) => {
          return (
            <Text style={styles.messageView} key={message.id}>
              {message.message}
            </Text>
          );
        })}
      </ScrollView>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
