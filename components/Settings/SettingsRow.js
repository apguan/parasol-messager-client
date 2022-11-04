import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { HStack, Spacer, Text as SwiftText } from "swiftui-react-native";

export default SettingsRow = ({
  icon,
  title,
  content,
  actionButton,
  showDivider,
}) => {
  return (
    <TouchableOpacity style={[styles.container]}>
      <HStack>
        <View style={styles.icon}>{icon}</View>
        <SwiftText
          style={styles.title}
          customFont={"satoshi-bold"}
          fontSize={14}
        >
          {title}
        </SwiftText>
        <Spacer />
        {Boolean(content) && (
          <>
            <Text
              style={styles.content}
              numberOfLines={1}
              ellipsizeMode={"middle"}
            >
              {content}
            </Text>
          </>
        )}
        {Boolean(actionButton) && (
          <>
            {!content && <Spacer />}
            {actionButton}
          </>
        )}
      </HStack>
      <View style={showDivider && styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  icon: {
    height: 26,
    width: 26,
    marginVertical: 12,
    marginRight: 10,
  },
  title: {
    lineHeight: 19,
    color: "rgba(0,0,0,0.8)",
  },
  content: {
    width: 157,
    color: "rgba(0,0,0,0.4)",
    fontFamily: "satoshi-bold",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    width: "90%",
    left: "10%",
  },
});
