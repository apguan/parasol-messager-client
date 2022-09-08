import React, { useState, useEffect } from "react";
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

export default RoomListItem = ({ name, lastMessage, usersInRoom }) => {
  const [color, setColor] = useState(0);

  useEffect(() => {
    setColor(randomColorPicker());
  }, []);

  const randomColorPicker = () => {
    return Math.round(COLORS.length * Math.random());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      {usersInRoom && usersInRoom.length && (
        <FlatList
          style={styles.onlineIndicator}
          data={usersInRoom}
          renderItem={({ item }) => {
            return (
              <Ionicons name="person-circle" size={24} color={COLORS[color]} />
            );
          }}
          horizontal
        />
      )}
      <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
        {(lastMessage && lastMessage.message) ||
          "Come be the conversation starter!"}
      </Text>
      {lastMessage && lastMessage.created_at && (
        <Text>
          Active <TimeAgo time={lastMessage.created_at} />
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    borderWidth: 5,
    padding: 10,
  },
  onlineIndicator: { height: 20 },
  header: {
    fontSize: 24,
    fontFamily: "rt-mono-bold",
  },
  lastMessage: {
    width: "100%",
    fontSize: 14,
    color: "#696969",
    paddingVertical: 10,
  },
});
