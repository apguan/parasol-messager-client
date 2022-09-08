import React, { useContext, useEffect } from "react";
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { MessagingContext } from "../context/Messages";
import RoomListItem from "../components/RoomListItem";
import { useFocusEffect } from "@react-navigation/native";


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
          const lastMessageToDisplay = roomMessages ? roomMessages[0] : {};

          const usersInRoom = usersOnline[item.room_id];

          return (
            <TouchableOpacity
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
