import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { VStack } from "swiftui-react-native";

export default ChatConfig = () => {
  const [groupName, setGroupName] = useState("");
  const [searchBarText, setSearchBarText] = useState("");

  const handleChange = (input) => {
    setGroupName(input);
  };

  const handleSearchBarChange = (input) => {
    setSearchBarText(input);
  };

  return (
    <VStack style={styles.container}>
      <View style={styles.pickerIcon} />
      <TextInput
        style={styles.groupInput}
        placeholder={"Add group name..."}
        value={groupName}
        onChangeText={handleChange}
      />
      <View style={styles.searchContainer}>
        <FontAwesome
          style={styles.searchIcon}
          name="search"
          size={16}
          color="rgba(0, 0, 0, 0.3)"
        />
        <TextInput
          style={styles.searchBarStyle}
          placeholder={"Search name, ENS, or address..."}
          value={searchBarText}
          onChangeText={handleSearchBarChange}
        />
      </View>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 44,
    height: 129,
    width: 215,
  },
  pickerIcon: {
    height: 87,
    width: 87,
    borderRadius: 80,
    backgroundColor: "#FFF7B1",
  },
  groupInput: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: "10%",
    marginHorizontal: 87.5,
    width: "100%",
    height: 32,
    fontFamily: "satoshi-black",
    fontSize: 24,
    lineHeight: 32,
    color: "rgba(0,0,0,0.3)",
  },
  searchContainer: {
    justifyContent: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  searchBarStyle: {
    backgroundColor: "#F7F7F7",
    fontFamily: "satoshi-bold",
    width: 350,
    height: 43,
    fontSize: 14,
    lineHeight: 19,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    paddingLeft: 40,
    paddingRight: 16,
  },
});
