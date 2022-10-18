import React, { useState } from "react";
import Animated, {
  ZoomInRotate,
  ZoomOutRotate,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const IconTray = ({ children, style, onPress = () => {} }) => {
  return (
    <AnimatedTouchableOpacity
      style={[style ? style : styles.trayIcons]}
      entering={ZoomInRotate.duration(300).damping(20)}
      exiting={ZoomOutRotate.duration(300).damping(8)}
      onPress={onPress}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

export default ChatInput = () => {
  const textInputHeight = useSharedValue(0);
  const animatedStyle = useSharedValue({ grow: 300, shrink: 259 + 36 });
  const [message, setMessage] = useState("");
  const showIconTray = Boolean(!message.length);

  const inputStyle = useAnimatedStyle(() => {
    const DURATION = {
      duration: 700,
      easing: Easing.inOut(Easing.quad),
    };

    const growContainer = interpolate(
      textInputHeight.value,
      [18, 120],
      [36, 160],
      { extrapolateRight: Extrapolate.CLAMP }
    );

    return {
      left: withTiming(message.length ? 31 : 74),
      width: message.length
        ? withTiming(animatedStyle.value.grow, DURATION)
        : withTiming(animatedStyle.value.shrink, {
            duration: 400,
            easing: Easing.inOut(Easing.quad),
          }),
      height: growContainer,
    };
  });

  const onSendPress = async () => {};

  const onInputChange = (input) => {
    setMessage(input);
  };

  const _changeSize = ({ nativeEvent }) => {
    textInputHeight.value = nativeEvent.contentSize.height;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      style={styles.keyboardAvoidance}
    >
      <Animated.View style={[styles.textInputContainer]}>
        {showIconTray ? (
          <Animated.View style={[styles.tray]}>
            <IconTray>
              <Feather name="camera" size={24} color="#999999" />
            </IconTray>
            <IconTray>
              <AntDesign name="picture" size={24} color="#999999" />
            </IconTray>
          </Animated.View>
        ) : (
          <IconTray>
            <Entypo name="chevron-right" size={24} color="#999999" />
          </IconTray>
        )}
        <AnimatedTextInput
          multiline
          placeholder={"Type message..."}
          style={[styles.textInput, inputStyle]}
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
  tray: {
    flexDirection: "row",
    marginLeft: 5,
  },
  textInputContainer: {
    width: 387,
    height: 48,
    maxHeight: 260,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "rgba(153, 153, 153, 0.3)",
    borderWidth: 1,
    height: 36,
    maxHeight: 240,
    marginVertical: 6,
    width: 249,
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 6,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 18,
    borderRadius: 18,
  },
  sendButton: {
    position: "absolute",
    backgroundColor: "#5048E5",
    borderRadius: 70,
    height: 32,
    width: 32,
    left: 345,
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
