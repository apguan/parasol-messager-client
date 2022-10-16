import React, { useCallback, useMemo, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { HStack, Text } from "swiftui-react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import ChatConfig from "./ChatModal/ChatConfig";

const CustomBottomSheetHandle = () => {
  return <View style={styles.handleStyle} />;
};

export default NewChat = () => {
  const bottomSheetRef = useRef(null);
  const [open, setOpen] = useState(1);

  const snapPoints = useMemo(() => [1, 750], []);

  const handleSheetChanges = useCallback((index) => {
    if (index === 0) {
      setOpen(0);
    }
    return;
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        style={styles.backdrop}
        pressBehavior={"none"}
      />
    ),
    []
  );

  const clearKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setOpen(1)}
      >
        <HStack>
          <AntDesign name="plus" size={20} color="white" />
          <Text
            style={styles.buttonText}
            fontSize={14}
            customFont={"satoshi-black"}
          >
            New Chat
          </Text>
        </HStack>
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        style={styles.container}
        backgroundStyle={styles.contentContainer}
        handleStyle={styles.handleStyle}
        index={open}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        handleComponent={CustomBottomSheetHandle}
        backdropComponent={renderBackdrop}
        pressBehavior={"none"}
      >
        <TouchableWithoutFeedback onPress={clearKeyboard} accessible={true}>
          <View style={styles.bottomSheetContainer}>
            <ChatConfig />
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },
  contentContainer: {
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  handleStyle: {
    width: 30,
    height: 4,
    margin: 10,
    borderRadius: 3,
    backgroundColor: "#D9D9D9",
  },
  buttonContainer: {
    position: "absolute",
    top: 721,
    backgroundColor: "#7069E9",
    justifyContent: "center",
    alignContent: "center",
    height: 56,
    width: 135,
    borderRadius: 50,
    shadowColor: "rgba(31, 41, 55, 0.08)",
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    lineHeight: 19,
  },
  backdrop: {
    color: "rgba(0,0,0,0.2)",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: -100,
  },
  bottomSheetContainer: {
    height: "100%",
    width: 390,
  },
});
