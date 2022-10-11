import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { Text } from "swiftui-react-native";
import OnboardingTemplate from "./OnboardingTemplate";

const Username = () => {
  const [username, setUsername] = useState("");

  const handleChange = (input) => {
    //TODO send username to backend
    setUsername(input);
  };

  return (
    <OnboardingTemplate
      previousScreen={"PhoneNumber"}
      nextScreen={""}
      disableNext={!username.length}
    >
      <Text style={styles.message} fontSize={24} customFont={"satoshi-bold"}>
        Please choose your username so your friends can find you
      </Text>
      <TextInput
        style={styles.usernameInput}
        placeholder={"username"}
        autoFocus={true}
        onChangeText={handleChange}
      />
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  message: {
    position: "absolute",
    top: 102,
    width: 319,
    lineHeight: 32,
  },
  usernameInput: {
    position: "absolute",
    top: 220,
    width: 319,
    height: 64,
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 25,
    textAlign: "center",
    fontFamily: "satoshi-bold",
    fontSize: 20,
    lineHeight: 20,
  },
});

export default Username;
