import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { VStack } from "swiftui-react-native";

import Header from "./Header";

export default ProfileCard = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <VStack>
        <Header />
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
