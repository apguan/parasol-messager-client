import React from "react";
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
import { SupabaseInterface } from "../hooks/Supabase";
import RoomListItem from "../components/RoomListItem";

const lastMessage = {
  username: "hotdoghelper",
  message: "this is the first message!",
  created_at: "2022-08-31 08:12:32+00",
  connected_wallet: true,
  is_deleted: false,
};

export default RoomScreen = ({ navigation }) => {
  const { rooms } = SupabaseInterface();

  const goToRoomId = (roomId) => {
    navigation.navigate("Messages", {
      roomId,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {rooms.map((room) => {
          return (
            <TouchableOpacity
              key={room.room_id}
              onPress={() => goToRoomId(room.room_id)}
            >
              <RoomListItem
                name={room.name}
                owner={room.owner}
                lastMessage={lastMessage}
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