import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { VStack } from "swiftui-react-native";

import Header from "../components/Header";
import ProfilePicture from "../components/Settings/ProfilePicture";
import SettingsSubcategory from "../components/Settings/SettingsSubcategory";
import SettingsRow from "../components/Settings/SettingsRow";

import DisplayName from "../assets/icons/display_name.svg";
import Friends from "../assets/icons/friends.svg";
import Logout from "../assets/icons/logout.svg";
import Notifications from "../assets/icons/notifications.svg";
import SoundHaptics from "../assets/icons/sound_haptics.svg";
import TermsPrivacy from "../assets/icons/terms_privacy.svg";
import Trashcan from "../assets/icons/trashcan.svg";
import Wallet from "../assets/icons/wallet.svg";
import Support from "../assets/icons/support.svg";

export default Profile = ({}) => {
  return (
    <Animated.View style={styles.container}>
      <Header showBorder={false} />
      <Animated.ScrollView style={styles.scrollView}>
        <VStack>
          <ProfilePicture />
          <SettingsSubcategory title={"PROFILE"}>
            <SettingsRow
              icon={<DisplayName />}
              title={"Display name"}
              content={"ash"}
            />
            <SettingsRow
              title={"Wallet"}
              icon={<Wallet />}
              content={"0x6ADdeBf14F629F7A736A501175f83939F3050668"}
              actionButton={
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={"rgba(0,0,0,0.3)"}
                />
              }
            />
            <SettingsRow
              icon={<Friends />}
              title={"Friends"}
              content={"1000"}
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

          <SettingsSubcategory title={"PREFERENCES"}>
            <SettingsRow
              icon={<Notifications />}
              title={"Notifications"}
              actionButton={
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={"rgba(0,0,0,0.3)"}
                />
              }
            />
            <SettingsRow
              icon={<SoundHaptics />}
              title={"Sound & Haptics"}
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

          <SettingsSubcategory title={"ACCOUNT & SUPPORT"}>
            <SettingsRow icon={<Support />} title={"Support"} />
            <SettingsRow icon={<TermsPrivacy />} title={"Terms & privacy"} />
          </SettingsSubcategory>

          <View style={styles.spacer} />

          <SettingsSubcategory>
            <SettingsRow icon={<Trashcan />} title={"Delete account"} />
            <SettingsRow icon={<Logout />} title={"Log out"} />
          </SettingsSubcategory>

          <View style={styles.footer} />
        </VStack>
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollView: {
    width: "100%",
  },
  spacer: {
    height: 20,
  },
  footer: {
    height: 75,
  },
});
