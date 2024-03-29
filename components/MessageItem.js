import React from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";

export default ChatMessage = ({ message, owner }) => {
  const isMyMessage = () => {
    return message.username === owner;
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
            backgroundColor: isMyMessage() ? "rgba(69, 169, 222, .5)" : "white",
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}
      >
        <Text style={[styles.name, { color: "#5B6269" }]}>
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
    borderRadius: 20,
    padding: 15,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {},
  time: {
    paddingVertical: 1,
    alignSelf: "flex-end",
    color: "grey",
  },
});
