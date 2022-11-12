import React from "react";
import { StyleSheet } from "react-native";
import { VStack } from "swiftui-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import ChatWindow from "../../components/ChatView/ChatWindow";
import ChatInput from "../../components/ChatView/ChatInput";

export default ChatScreen = ({ navigation, route }) => {
  const { isOnline, name, profileImage } = route?.params;

  const navigateToChatdetail = () => {
    navigation.navigate("ChatDetails", {
      isOnline,
      name,
      profileImage,
    });
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <VStack>
        <Header
          profileImage={profileImage}
          title={name}
          action={navigateToChatdetail}
        />
        <ChatWindow />
        <ChatInput />
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});
