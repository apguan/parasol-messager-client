import React, { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomInRotate,
  ZoomOutRotate,
  useAnimatedStyle,
  Easing,
  withTiming,
} from "react-native-reanimated";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";

const DURATION = { duration: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) };

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const IconTray = ({ children, style, onPress = () => {} }) => {
  return (
    <AnimatedTouchableOpacity
      style={[style ? style : styles.trayIcons]}
      entering={ZoomInRotate.duration(275).damping(5)}
      exiting={ZoomOutRotate.duration(275).damping(8)}
      onPress={onPress}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

export default ChatInput = () => {
  const [textInputHeight, setTextInputHeight] = useState(0);
  const [message, setMessage] = useState("");
  const showIconTray = Boolean(!message.length);

  const inputStyle = useAnimatedStyle(() => ({
    width: withTiming(message.length ? 291 : 259, DURATION),
  }));

  const inputGrowStyle = useAnimatedStyle(() => ({
    marginBottom: withTiming(textInputHeight > 20 ? 33 : 6),
    height: withTiming(textInputHeight > 20 ? 72 : 36),
  }));

  const onSendPress = async () => {};

  const onInputChange = (input) => {
    setMessage(input);
  };

  const _changeSize = ({ nativeEvent }) => {
    setTextInputHeight(nativeEvent.contentSize.height);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      style={styles.keyboardAvoidance}
    >
      <Animated.View style={[styles.textInputContainer]}>
        {showIconTray ? (
          <>
            <IconTray>
              <AntDesign name="pluscircle" size={24} color="#999999" />
            </IconTray>
            <IconTray>
              <Feather name="camera" size={24} color="#999999" />
            </IconTray>
            <IconTray>
              <AntDesign name="picture" size={24} color="#999999" />
            </IconTray>
          </>
        ) : (
          <IconTray>
            <Entypo name="chevron-right" size={24} color="#999999" />
          </IconTray>
        )}
        <AnimatedTextInput
          multiline
          placeholder={"Type message..."}
          style={[styles.textInput, inputStyle, inputGrowStyle]}
          value={message}
          onChangeText={onInputChange}
          onContentSizeChange={_changeSize}
        />
        {!showIconTray && (
          <IconTray style={[styles.sendButton]} onPress={onSendPress}>
            <AntDesign name="arrowup" size={24} color="white" />
          </IconTray>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidance: {
    width: "100%",
  },
  textInputContainer: {
    width: 387,
    height: 48,
    maxHeight: 80,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "rgba(153, 153, 153, 0.3)",
    fontFamily: "satoshi-regular",
    borderWidth: 1,
    height: 36,
    maxHeight: 60,
    marginVertical: 6,
    width: 259,
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 6,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: "#5048E5",
    borderRadius: 70,
    height: 32,
    width: 32,
    left: 10,
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
  trayIcons: {
    margin: 6,
    height: 24,
    width: 24,
  },
});
