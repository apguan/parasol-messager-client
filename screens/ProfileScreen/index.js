import React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { VStack } from "swiftui-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import ProfilePicture from "../../components/Settings/ProfilePicture";
import SettingsSubcategory from "../../components/Settings/SettingsSubcategory";
import SettingsRow from "../../components/Settings/SettingsRow";

import DisplayName from "../../assets/icons/display_name.svg";
import Friends from "../../assets/icons/friends.svg";
import Logout from "../../assets/icons/logout.svg";
import Notifications from "../../assets/icons/notifications.svg";
import SoundHaptics from "../../assets/icons/sound_haptics.svg";
import TermsPrivacy from "../../assets/icons/terms_privacy.svg";
import Trashcan from "../../assets/icons/trashcan.svg";
import Wallet from "../../assets/icons/wallet.svg";
import Support from "../../assets/icons/support.svg";

export default Profile = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <VStack>
          <ProfilePicture />
          <SettingsSubcategory title={"PROFILE"}>
            <SettingsRow
              icon={<DisplayName />}
              title={"Display name"}
              content={"ash"}
              showDivider={true}
            />
            <SettingsRow
              title={"Wallet"}
              icon={<Wallet />}
              content={"0x6ADdeBf14F629F7A736A501175f83939F3050668"}
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
            <SettingsRow
              icon={<Support />}
              title={"Support"}
              showDivider={true}
            />
            <SettingsRow icon={<TermsPrivacy />} title={"Terms & privacy"} />
          </SettingsSubcategory>

          <View style={styles.spacer} />

          <SettingsSubcategory>
            <SettingsRow
              icon={<Trashcan />}
              title={"Delete account"}
              showDivider={true}
            />
            <SettingsRow icon={<Logout />} title={"Log out"} />
          </SettingsSubcategory>

          <View style={styles.footer} />
        </VStack>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 50,
  },
});
