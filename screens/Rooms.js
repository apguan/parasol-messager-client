import React, { useContext } from "react";
import {
  ScrollView,
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

const lastMessage = {
  username: "hotdoghelper",
  message: "this is the first message!",
  created_at: "2022-08-31 08:12:32+00",
  connected_wallet: true,
  is_deleted: false,
};

export default RoomScreen = ({ navigation }) => {
  const { rooms, sortedMessages } = useContext(MessagingContext);

  const goToRoomId = (roomId, chatName) => {
    navigation.navigate("Messages", {
      roomId,
      chatName,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {rooms.map((room) => {
          const roomMessages = sortedMessages[room.room_id];
          const lastMessageToDisplay = roomMessages
            ? roomMessages[roomMessages.length - 1]
            : {};

          return (
            <TouchableOpacity
              style={{ padding: 10 }}
              key={room.room_id}
              onPress={() => goToRoomId(room.room_id, room.name)}
            >
              <RoomListItem
                name={room.name}
                lastMessage={lastMessageToDisplay}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
    borderWidth: 2,
  },
});
