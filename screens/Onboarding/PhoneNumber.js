import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Text } from "swiftui-react-native";
import OnboardingTemplate from "./OnboardingTemplate";

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (input) => {
    setPhoneNumber(input);
  };

  return (
    <OnboardingTemplate
      previousScreen={"Welcome"}
      nextScreen={"Verify"}
      disableNext={!phoneNumber.length}
    >
      <Text style={styles.header} fontSize={24} customFont={"satoshi-bold"}>
        Verify your mobile number
      </Text>
      <View style={styles.inputContainer}>
        <Text fontSize={24} style={styles.prefix}>
          +1
        </Text>
        <TextInput
          style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={handleChange}
          keyboardType="numeric"
          dataDetectorTypes={"phoneNumber"}
          autoFocus={true}
        />
      </View>
      <Text style={styles.message} fontSize={14}>
        By continuing, you may receive an SMS for verification. Message and data
        rates apply
      </Text>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    width: 297,
    position: "absolute",
    top: 113,
  },
  inputContainer: {
    width: "100%",
    position: "absolute",
    top: 192,
  },
  prefix: {
    position: "absolute",
    zIndex: 2,
    fontFamily: "satoshi-medium",
    lineHeight: 40.5,
    fontSize: 30,
    paddingTop: 11,
    left: 39,
  },
  phoneInput: {
    zIndex: 1,
    height: 64,
    width: 349,
    left: 21,
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 25,
    fontSize: 30,
    lineHeight: 40.5,
    fontFamily: "satoshi-medium",
    padding: 18,
    paddingTop: 11,
    paddingLeft: 31 + 18 + 4,
    letterSpacing: 4,
  },
  message: {
    position: "absolute",
    top: 238,
    lineHeight: 20,
    width: 293,
    height: 114,
    marginTop: 46 - 11,
    fontFamily: "satoshi-medium",
    fontWeight: "500",
  },
  next: {
    backgroundColor: "#29E58B",
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 91,
    borderRadius: 53,
  },
});

export default PhoneNumber;
