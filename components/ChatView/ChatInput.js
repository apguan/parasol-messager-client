import React, { useMemo, useState } from "react";
import Animated, {
  ZoomInRotate,
  ZoomOutRotate,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withTiming,
  interpolate,
  Extrapolate,
  withSpring,
} from "react-native-reanimated";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";

import { DimensionsStyle } from "../../theme";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const DURATION = {
  duration: 300,
  easing: Easing.inOut(Easing.quad),
};

const SPRING_CONFIG = {
  stiffness: 150,
  mass: 0.75,
  damping: 15,
};

const AnimatedButtons = ({ children, style, onPress = () => {} }) => {
  return (
    <AnimatedTouchableOpacity
      style={[style ? style : styles.trayIcons]}
      entering={ZoomInRotate.duration(300).damping(20)}
      exiting={ZoomOutRotate.duration(300)}
      onPress={onPress}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

export default ChatInput = () => {
  const textInputHeight = useSharedValue(0);
  const animatedInputStyle = useSharedValue({
    grow: 240,
    shrink: 245,
  });
  const animatedInputContainerStyle = useSharedValue({
    grow: 300,
    shrink: 295,
  });

  const keyboardAvoidanceDistance = useMemo(
    () => 20 + DimensionsStyle.bottomAreaHeight,
    [DimensionsStyle.bottomAreaHeight]
  );

  const [message, setMessage] = useState("");
  const showIconTray = Boolean(!message.length);

  const inputBarStyle = useAnimatedStyle(() => {
    const growContainer = interpolate(
      textInputHeight.value,
      [18, 126],
      [48, 156],
      { extrapolateRight: Extrapolate.CLAMP }
    );

    return {
      height: withSpring(growContainer, SPRING_CONFIG),
    };
  });

  const inputContainerStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(message.length ? 40 : 80),
      width: message.length
        ? withTiming(animatedInputContainerStyle.value.grow, DURATION)
        : withTiming(animatedInputContainerStyle.value.shrink, {
            duration: 400,
            easing: Easing.inOut(Easing.quad),
          }),
    };
  });

  const inputStyle = useAnimatedStyle(() => {
    const growContainer = interpolate(
      textInputHeight.value,
      [18, 126],
      [36, 144],
      { extrapolateRight: Extrapolate.CLAMP }
    );

    return {
      width: message.length
        ? withTiming(animatedInputStyle.value.grow, DURATION)
        : withTiming(animatedInputStyle.value.shrink, {
            duration: 400,
            easing: Easing.inOut(Easing.quad),
          }),
      height: withSpring(growContainer, SPRING_CONFIG),
    };
  });

  const stickerStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(message.length ? 309 : 344),
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
      keyboardVerticalOffset={keyboardAvoidanceDistance}
      style={styles.keyboardAvoidance}
    >
      <Animated.View style={[styles.textBarContainer, inputBarStyle]}>
        <Animated.View style={[styles.tray]}>
          {showIconTray ? (
            <>
              <AnimatedButtons>
                <Feather name="camera" size={24} color="#999999" />
              </AnimatedButtons>
              <AnimatedButtons>
                <AntDesign name="picture" size={24} color="#999999" />
              </AnimatedButtons>
            </>
          ) : (
            <AnimatedButtons>
              <Entypo name="chevron-right" size={24} color="#999999" />
            </AnimatedButtons>
          )}
        </Animated.View>
        <Animated.View style={[styles.textInputContainer, inputContainerStyle]}>
          <AnimatedTextInput
            multiline={true}
            placeholder={"Type message..."}
            style={[styles.textInput, inputStyle]}
            value={message}
            onChangeText={onInputChange}
            onContentSizeChange={_changeSize}
          />
        </Animated.View>
        <AnimatedTouchableOpacity style={[styles.stickerButton, stickerStyle]}>
          <AntDesign name="smileo" size={24} color="#896BFF" />
        </AnimatedTouchableOpacity>
        {!showIconTray && (
          <AnimatedButtons style={[styles.sendButton]} onPress={onSendPress}>
            <AntDesign name="arrowup" size={24} color="white" />
          </AnimatedButtons>
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
    position: "absolute",
    bottom: 0,
    marginBottom: 8,
    marginHorizontal: 5,
  },
  textBarContainer: {
    zIndex: 5,
    backgroundColor: "white",
    elevation: 5,
    width: 387,
    height: 48,
    maxHeight: 260,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textInputContainer: {
    left: 34,
    marginVertical: 6,
    minHeight: 36,
    bottom: 0,
    position: "absolute",
    backgroundColor: "white",
    borderColor: "rgba(153, 153, 153, 0.3)",
    borderRadius: 22,
    borderWidth: 1,
  },
  textInput: {
    left: 12,
    minHeight: 36,
    bottom: 0,
    maxHeight: 240,
    fontSize: 16,
    paddingTop: 10,
    lineHeight: 18,
  },
  sendButton: {
    position: "absolute",
    backgroundColor: "#5048E5",
    borderRadius: 70,
    height: 32,
    width: 32,
    left: 345,
    bottom: 0,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  trayIcons: {
    margin: 6,
    height: 24,
    width: 24,
  },
  stickerButton: {
    position: "absolute",
    bottom: 0,
    marginBottom: 13,
  },
});
