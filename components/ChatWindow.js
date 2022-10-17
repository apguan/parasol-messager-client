import React from "react";
import { FlatList, StyleSheet } from "react-native";

export default ChatWindow = () => {
  return <FlatList style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 351,
    height: 679,
    backgroundColor: "pink",
  },
});
