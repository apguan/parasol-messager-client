import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import TimeAgo from "react-native-timeago";

export default RoomListItem = ({ name, lastMessage, usersInRoom }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <FlatList data={usersInRoom} renderItem={({ item }) => {}} horizontal />
      <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
        {lastMessage.message}
      </Text>
      {lastMessage.created_at && <TimeAgo time={lastMessage.created_at} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    margin: 1,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
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
