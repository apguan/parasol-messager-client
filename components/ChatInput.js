import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import ChatModal from "./ChatModal";
import Safe from "../utils/Multisig";
import { MessagingContext } from "../context/Messages";
import { UserContext } from "../context/User";

export default ChatInput = ({ navigation, chatRoomID, owner }) => {
  const {
    sendMessage,
    saveTransactionHash,
    saveMultiSigWalletAddress,
    roomHasMultiSigWallet,
  } = useContext(MessagingContext);
  const { userInfo, publicAddress } = useContext(UserContext);

  const { createProxy } = Safe(
    userInfo,
    chatRoomID,
    saveTransactionHash,
    saveMultiSigWalletAddress
  );

  const [canCreateMultisig, setCanCreateMultisig] = useState(false);
  const [createSafeLoading, setCreateSafeLoading] = useState(false);
  const [address, setAddress] = useState("");

  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    (async () => {
      const result = await roomHasMultiSigWallet(chatRoomID);
      const hasWallet = Boolean(Array.isArray(result) && result.length !== 0);

      navigation.setOptions({
        headerRight: () => {
          if (hasWallet) {
            setAddress(result[0].wallet_address);
            setCanCreateMultisig(!hasWallet);
            return (
              <MaterialCommunityIcons
                name="vote-outline"
                size={24}
                color="grey"
              />
            );
          }

          return (
            <MaterialCommunityIcons
              name="safe-square-outline"
              onPress={createSafe}
              size={24}
              color="grey"
            />
          );
        },
      });
    })();
  }, [navigation]);

  const onSendPress = async () => {
    if (message) {
      await sendMessage(chatRoomID, owner, message, publicAddress);
      setMessage("");
    }
  };

  const createSafe = async () => {
    setCreateSafeLoading(true);
    const address = await createProxy();

    if (address) {
      setAddress(address);
      const timer = setTimeout(() => {
        setCanCreateMultisig(false);
        setCreateSafeLoading(false);

        // now set the top button
        navigation.setOptions({
          headerRight: () => (
            <MaterialCommunityIcons
              name="vote-outline"
              size={24}
              color="grey"
            />
          ),
        });
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: "100%" }}
    >
      <View style={styles.container}>
        <ChatModal isVisible={createSafeLoading} address={address} />
        <View style={styles.mainContainer}>
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
            style={[styles.buttonContainer, { opacity: !message ? 0.25 : 1 }]}
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
    backgroundColor: "rgb(69, 169, 222)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
