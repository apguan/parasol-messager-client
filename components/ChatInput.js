import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

const MESSAGE_ICON = require("../assets/smilie-message-icon.png");
const DURATION = { duration: 250 };

export default ChatInput = () => {
  const [message, setMessage] = useState("");
  const inputStyle = useAnimatedStyle(() => ({
    width: withTiming(message.length ? 320 : 349, DURATION),
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(message.length ? 1 : 0, DURATION),
  }));

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
      <Animated.View style={[styles.textInputContainer, inputStyle]}>
        <TextInput
          multiline
          placeholder={"Type message..."}
          style={[styles.textInput]}
          value={message}
          onChangeText={onInputChange}
          onContentSizeChange={_changeSize}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Animated.Image
            style={[buttonStyle]}
            height={23}
            width={23}
            source={MESSAGE_ICON}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Imaged
            height={24}
            width={24}
            style={styles.icon}
            source={MESSAGE_ICON}
          />
        </TouchableOpacity> */}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidance: {
    width: "100%",
  },
  textInputContainer: {
    width: "100%",
    maxHeight: 60,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  textInput: {
    width: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.2)",
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "satoshi-bold",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 54,
    borderRadius: 20,
  },
  sendButton: {
    height: 44,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: -36,
    left: 305,
    height: 24,
    width: 26,
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
