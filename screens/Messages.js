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
import { SupabaseInterface } from "../hooks/Supabase";

export default MessageScreen = () => {
  const { supabaseClient } = SupabaseInterface();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Detail Screen here</Text>
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
});
