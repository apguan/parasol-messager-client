import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen here</Text>

      <StatusBar style="auto" />
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
});
