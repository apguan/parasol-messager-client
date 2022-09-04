import React, { useContext, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Touchable,
} from "react-native";
import { MessagingContext } from "../context/Messages";
import RoomListItem from "../components/RoomListItem";
import { useFocusEffect } from "@react-navigation/native";

const lastMessage = {
  username: "hotdoghelper",
  message: "this is the first message!",
  created_at: "2022-08-31 08:12:32+00",
  connected_wallet: true,
  is_deleted: false,
};

export default RoomScreen = ({ navigation }) => {
  const { rooms, sortedMessages, getAllMessages, setCurrentRoom, usersOnline } =
    useContext(MessagingContext);

  useFocusEffect(() => {
    setCurrentRoom("");
  });

  useEffect(() => {
    getAllMessages();
  }, [rooms]);

  const goToRoomId = (roomId, chatName) => {
    setCurrentRoom(roomId);
    navigation.navigate("Messages", {
      roomId,
      chatName,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scrollView}
        data={rooms}
        keyExtractor={(room) => room.room_id}
        renderItem={({ item }) => {
          const roomMessages = sortedMessages[item.room_id];
          const lastMessageToDisplay = roomMessages
            ? roomMessages[roomMessages.length - 1]
            : {};

          const usersInRoom = usersOnline[item.room_id];

          return (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => goToRoomId(item.room_id, item.name)}
            >
              <RoomListItem
                name={item.name}
                lastMessage={lastMessageToDisplay}
                usersInRoom={usersInRoom}
              />
            </TouchableOpacity>
          );
        }}
      />
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
  },
});
