import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import TimeAgo from "react-native-timeago";

export default RoomListItem = ({ name, lastMessage }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{lastMessage.message}</Text>
      {lastMessage.created_at && <TimeAgo time={lastMessage.created_at} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
