import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import TimeAgo from "react-native-timeago";

export default RoomListItem = ({ name, owner, lastMessage }) => {
  return (
    <View>
      <Text>{owner}</Text>
      <Text>{name}</Text>
      <Text>{lastMessage.text}</Text>
      <TimeAgo time={lastMessage.createdAt} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
