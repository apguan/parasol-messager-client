import React, { useContext, useEffect, useLayoutEffect } from "react";
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { MessagingContext } from "../context/Messages";
import RoomListItem from "../components/RoomListItem";
import RoomModal from "../components/RoomModal";

export default RoomScreen = ({ navigation }) => {
  const {
    rooms,
    sortedMessages,
    getAllMessages,
    setCurrentRoom,
    usersOnline,
    makeRoom,
    isMakingRoom,
    setIsMakingRoom,
  } = useContext(MessagingContext);

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
      <RoomModal
        makeRoom={makeRoom}
        isMakingRoom={isMakingRoom}
        setIsMakingRoom={setIsMakingRoom}
      />
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
    paddingVertical: 7,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
});
