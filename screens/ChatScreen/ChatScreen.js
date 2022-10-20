import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { VStack } from "swiftui-react-native";

import Header from "../../components/Header";
import ChatWindow from "../../components/ChatWindow";
import ChatInput from "../../components/ChatInput";

export default ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <VStack>
        <Header />
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
