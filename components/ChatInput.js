import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

export default ChatInput = () => {
  const textInputRef = useRef();

  const [message, setMessage] = useState("");

  const onSendPress = async () => {};

  const onInputChange = (input) => {
    setMessage(input);
  };

  const _changeSize = ({ nativeEvent }) => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      style={styles.keyboardAvoidance}
    >
      <TextInput
        ref={textInputRef}
        multiline
        placeholder={"Type message..."}
        style={styles.textInput}
        value={message}
        onChangeText={onInputChange}
        onContentSizeChange={_changeSize}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidance: {
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    marginHorizontal: 20,
    maxHeight: 60,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 54,
    borderRadius: 20,
    width: 349,
    backgroundColor: "rgba(217, 217, 217, 0.2)",
    fontSize: 12,
    lineHeight: 16.5,
    fontFamily: "satoshi-bold",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: "rgb(69, 169, 222)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
