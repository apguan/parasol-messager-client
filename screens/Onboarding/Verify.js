import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "swiftui-react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import OnboardingTemplate from "./OnboardingTemplate";
import { TouchableOpacity } from "react-native-gesture-handler";

const CELL_COUNT = 4;
const CONTENT_TYPE = "oneTimeCode";

const Verify = () => {
  // TODO: connect to state
  const phoneNumber = "9259800550";
  const [code, setCode] = useState("");
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: onChangeText,
  });

  // TODO: clear the state when it hits 4 digits
  const onChangeText = (input) => {
    setCode(input);
    if (input.length === 4) {
      // validate this code
      // navigate to next screen
    }
  };

  const resendCode = () => {};

  return (
    <OnboardingTemplate
      previousScreen={"PhoneNumber"}
      nextScreen={"Username"}
      disableNext={code.length !== 4}
    >
      <View style={styles.verifyContainer}>
        <Text style={styles.message} fontSize={24} customFont={"satoshi-bold"}>
          Enter the 4-digit code sent to you at{" "}
          <Text fontSize={24} customFont={"satoshi-black"}>
            {phoneNumber}
          </Text>
        </Text>
        <CodeField
          {...codeFieldProps}
          hideKeyboard={false}
          autoFocus={true}
          value={code}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType={CONTENT_TYPE}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : "")}
            </Text>
          )}
        />
        <Text style={[styles.lineBreak, styles.helpText]} fontSize={14}>
          Didn't recieve the code?
        </Text>
        <TouchableOpacity onPress={resendCode}>
          <Text style={[styles.resend, styles.helpText]} fontSize={14}>
            Resend code via SMS
          </Text>
        </TouchableOpacity>
      </View>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  verifyContainer: {
    position: "absolute",
    top: 102,
  },
  message: {
    width: 319,
    height: 83,
    lineHeight: 32,
  },
  cell: {
    marginTop: 20,
    fontFamily: "satoshi-light",
    width: 67,
    height: 64,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#C2C2C2",
    marginHorizontal: 11 / 2,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    paddingTop: 5,
  },
  helpContainer: {
    height: 114,
    width: 293,
    alignItems: "center",
    justifyContent: "center",
  },
  lineBreak: {
    marginTop: 35,
  },
  helpText: {
    fontFamily: "satoshi-medium",
    lineHeight: 20,
  },
  resend: {
    color: "#476893",
  },
});

export default Verify;
