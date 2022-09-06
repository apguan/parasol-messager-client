import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { MessagingContext } from "../context/Messages";

export default InputBox = ({ chatRoomID, owner }) => {
  const { sendMessage } = useContext(MessagingContext);
  const [message, setMessage] = useState("");

  const onSendPress = async () => {
    if (message) {
      await sendMessage(chatRoomID, owner, message); //TODO: add in wallet address from User context
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {/* <FontAwesome5 name="laugh-beam" size={24} color="grey" /> */}
          <TextInput
            placeholder={"Type a message"}
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          {/* <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
          {!message && (
            <Fontisto
              name="camera"
              size={24}
              color="grey"
              style={styles.icon}
            />
          )} */}
        </View>
        <TouchableOpacity onPress={onSendPress} disabled={!message}>
          <View
            style={[styles.buttonContainer, { opacity: !message ? 0.5 : 1 }]}
          >
            <MaterialIcons name="send" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 13,
    borderRadius: 25,
    marginRight: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: "blue",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
