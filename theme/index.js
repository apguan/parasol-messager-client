import { useState, useEffect } from "react";
import { create } from "react-native-pixel-perfect";
import { Keyboard } from "react-native";

// This is defined by the specs we have in figma:
// https://www.figma.com/file/lxyVjWWgCQtBDG4Ordqcxx/%C2%A0%F0%9F%92%AC-Messaging?node-id=546%3A12919
export const DESIGN_SIZE = {
  width: 390,
  height: 843,
};

export const perfectSize = create(DESIGN_SIZE);

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    const hide = Keyboard.addListener("keyboardDidHide", keyboardDidHide);

    // cleanup function
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const keyboardDidShow = (frames) => {
    setKeyboardHeight(frames.endCoordinates.height);
  };

  const keyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  return keyboardHeight;
};

export const HEADER_HEIGHT = 68;
export const INPUT_MIN_HEIGHT = 36;

export const COLORS = {
  transparentWhite: "rgba(255, 255, 255, 0.97)",
};