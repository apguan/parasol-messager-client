import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SupabaseInterface } from "../hooks/Supabase";

export default MessagesScreen = ({ navigation, route }) => {
  const { getMessages } = SupabaseInterface();
  const { roomId } = route.params;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages(roomId);
      setMessages(msgs || []);
    };

    fetchMessages();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {messages.map((message) => {
          return <Text key={message.id}>{message.message}</Text>;
        })}
      </ScrollView>
    </View>
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
  },
});
