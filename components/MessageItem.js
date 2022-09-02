import React from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";

export default ChatMessage = (props) => {
  const { message, owner } = props;

  const isMyMessage = () => {
    return message.username !== owner;
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: isMyMessage() ? "row-reverse" : "row" },
      ]}
    >
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}
      >
        <Text style={styles.name}>
          {isMyMessage() ? "Me" : message.username}
        </Text>
        <Text style={styles.message}>{message.message}</Text>
        <Text style={styles.time}>{moment(message.created_at).fromNow()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  messageBox: {
    maxWidth: "90%",
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {},
  time: {
    alignSelf: "flex-end",
    color: "grey",
  },
});
