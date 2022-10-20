import React, { useCallback, useMemo, useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { HStack, Text } from "swiftui-react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import ChatConfig from "../ChatConfig";
import SuggestedContact from "../SuggestedContact";

import { CONTACTS } from "../../_fixtures/contacts";

const CustomBottomSheetHandle = () => {
  return <View style={styles.handleStyle} />;
};

export default NewChat = () => {
  const bottomSheetRef = useRef(null);
  const [open, setOpen] = useState(0);

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
          <Entypo name="plus" size={20} color="white" />
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
            <FlatList
              style={[styles.listContainer]}
              data={CONTACTS}
              ListHeaderComponent={() => (
                <Text style={styles.listHeader}>Suggestions</Text>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => {
                return (
                  <SuggestedContact
                    name={item.username}
                    identifier={item.address}
                    profileImage={item.profileUrl}
                  />
                );
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.createButtonContainer}>
          <Text style={styles.createButtonText}>Create Group</Text>
        </TouchableOpacity>
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
  listHeader: {
    textAlign: "left",
    marginBottom: 20,
    paddingLeft: 20,
    color: "#979797",
  },
  listContainer: {
    top: 120,
    height: 370,
    width: "100%",
    flexGrow: 0,
  },
  separator: {
    height: 20,
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
    width: 390,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonContainer: {
    position: "absolute",
    top: 630,
    borderRadius: 20,
    marginHorizontal: 20,
    backgroundColor: "#7069E9",
    width: 350,
  },
  createButtonText: {
    color: "white",
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "satoshi-bold",
    paddingVertical: 18.5,
  },
});
