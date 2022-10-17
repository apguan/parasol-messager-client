import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HStack, Spacer, VStack } from "swiftui-react-native";
import { useNavigation } from "@react-navigation/native";

export default ChatPreview = ({
  profileImage,
  name,
  previewMessage,
  unreadCount,
  isOnline,
  time,
}) => {
  const navigation = useNavigation();

  const onChangeNavigation = () => {
    // TODO: need to inject props here to allow for appropriate transition
    navigation.navigate("ChatScreen");
  };

  return (
    <TouchableOpacity onPress={onChangeNavigation}>
      <HStack style={styles.container}>
        <View>
          <Image
            style={styles.profile}
            source={{
              uri: profileImage,
            }}
          />
          <View
            style={[styles.statusIndicator, { opacity: isOnline ? 1 : 0 }]}
          />
        </View>
        <VStack style={[styles.previewTextContainer]}>
          <HStack>
            <Text
              style={styles.previewTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <Spacer />
            <Text style={[styles.timeStyle, styles.textDropShadow]}>
              {time ? time : "00:00 AM"}
            </Text>
          </HStack>
          <HStack>
            <Text
              style={styles.previewMessage}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {previewMessage}
            </Text>
            <Spacer />
            <View
              style={[
                styles.unreadNotificationContainer,
                styles.dropShadow,
                { opacity: unreadCount ? 1 : 0 },
              ]}
            >
              <Text
                style={[styles.notificationText, styles.textDropShadow]}
                fontSize={6}
              >
                {unreadCount}
              </Text>
            </View>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    width: 350,
    marginVertical: 7.5,
    marginHorizontal: 20,
  },
  dropShadow: {
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  textDropShadow: {
    textShadowOffset: {
      width: 4,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowRadius: 20,
  },
  profile: {
    height: 48,
    width: 48,
    borderRadius: 59,
    backgroundColor: "#DBE4F2",
  },
  previewTextContainer: {
    width: 286,
    height: 42,
    marginLeft: 16,
    paddingRight: 0,
  },
  previewTitle: {
    fontFamily: "satoshi-bold",
    fontSize: 16,
    lineHeight: 22,
    maxWidth: 199,
    textAlign: "left",
  },
  previewMessage: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "satoshi-regular",
    color: "#999999",
    width: 221,
  },
  statusIndicator: {
    position: "absolute",
    left: 36,
    top: 36,
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#29E58B",
    borderWidth: 3,
    borderColor: "white",
  },
  timeStyle: {
    color: "#999999",
    marginBottom: 7.5,
    minWidth: 41,
    lineHeight: 15,
    height: 15,
    fontSize: 11,
    fontFamily: "satoshi-regular",
  },
  unreadNotificationContainer: {
    marginLeft: 19,
    height: 18,
    minWidth: 20,
    borderRadius: 60,
    backgroundColor: "#665FE8",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 2,
  },
  notificationText: {
    color: "white",
    fontSize: 10,
    lineHeight: 14,
    minWidth: 4,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "satoshi-bold",
  },
});

