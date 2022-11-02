import { memo } from "react";
import { Dimensions, Platform } from "react-native";
import { create } from "react-native-pixel-perfect";
// This is defined by the specs we have in figma:
// https://www.figma.com/file/lxyVjWWgCQtBDG4Ordqcxx/%C2%A0%F0%9F%92%AC-Messaging?node-id=546%3A12919
export const DESIGN_SIZE = {
  width: 390,
  height: 843,
};

export const perfectSize = create(DESIGN_SIZE);

export const isLargePhone = () => {
  const iphoneXLength = 812;
  const iphoneXSMaxLength = 896;
  const windowDimensions = Dimensions.get("window");

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (windowDimensions.width >= iphoneXLength ||
      windowDimensions.height >= iphoneXLength ||
      windowDimensions.width >= iphoneXSMaxLength ||
      windowDimensions.height >= iphoneXSMaxLength)
  );
};

const isLarge = isLargePhone();

export const DimensionsStyle = {
  safeAreaTopHeight: Platform.OS === "ios" ? (isLarge ? 44 : 20) : 0,
  safeAreaBottomHeight: Platform.OS === "ios" && isLarge ? 35 : 0,
  tabBarHeight: Platform.OS === "ios" ? 17 : 20,
  bottomAreaHeight: Platform.OS === "ios" && isLarge ? 34 : 0,
};
