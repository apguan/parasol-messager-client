import React from "react";
import { View, StyleSheet } from "react-native";
import { VStack } from "swiftui-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import Header from "../../components/Header";
import ProfilePicture from "../../components/Settings/ProfilePicture";
import SettingsSubcategory from "../../components/Settings/SettingsSubcategory";
import SettingsRow from "../../components/Settings/SettingsRow";

import Members from "../../assets/icons/members.svg";
import Pinned from "../../assets/icons/pinned_messages.svg";
import Media from "../../assets/icons/media.svg";
import Mute from "../../assets/icons/mute_chat.svg";
import LeaveGroup from "../../assets/icons/leave_group.svg";
import Animated from "react-native-reanimated";

export default ChatDetails = ({ route, navigation }) => {
  const { name, profileImage, isOnline } = route?.params;

  return (
    <SafeAreaView>
      <Header />
      <Animated.View spacer={styles.container}>
        <VStack>
          <ProfilePicture
            profileImage={profileImage}
            username={name}
            isEditable={false}
          />
          <SettingsSubcategory>
            <SettingsRow
              icon={<Members />}
              title={"View members"}
              showDivider={true}
              actionButton={
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={"rgba(0,0,0,0.3)"}
                />
              }
            />
            <SettingsRow
              title={"View pinned messages"}
              icon={<Pinned />}
              showDivider={true}
              actionButton={
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={"rgba(0,0,0,0.3)"}
                />
              }
            />
            <SettingsRow
              icon={<Media />}
              title={"View media"}
              actionButton={
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={"rgba(0,0,0,0.3)"}
                />
              }
            />
          </SettingsSubcategory>

          <View style={styles.spacer} />

          <SettingsSubcategory>
            <SettingsRow
              icon={<Mute />}
              title={"Mute chat"}
              showDivider={true}
              actionButton={
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={"rgba(0,0,0,0.3)"}
                />
              }
            />
            <SettingsRow
              title={"Leave group"}
              icon={<LeaveGroup />}
              actionButton={
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={"rgba(0,0,0,0.3)"}
                />
              }
            />
          </SettingsSubcategory>
        </VStack>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  spacer: {
    height: 20,
  },
});
