import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TimeAgo from "react-native-timeago";

const COLORS = [
  "#A974EC",
  "#E574EC",
  "#ECA974",
  "#ECE574",
  "#2CBDA5",
  "#2C8DBD",
  "#E09775",
];

const randomColorPicker = () => {
  return Math.round(COLORS.length * Math.random());
};

export default RoomListItem = ({ name, lastMessage, usersInRoom }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      {usersInRoom && usersInRoom.length && (
        <FlatList
          style={styles.onlineIndicator}
          data={usersInRoom}
          renderItem={({ item }) => {
            return (
              <Ionicons
                name="person-circle"
                size={20}
                color={COLORS[randomColorPicker()]}
              />
            );
          }}
          horizontal
        />
      )}
      <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
        {lastMessage.message || "Come be the conversation starter!"}
      </Text>
      {lastMessage.created_at && <TimeAgo time={lastMessage.created_at} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 5,
    padding: 10,
  },
  onlineIndicator: { height: 20 },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lastMessage: {
    width: "100%",
    fontSize: 14,
    color: "#696969",
    paddingVertical: 10,
  },
});
