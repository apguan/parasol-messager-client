import React from "react";
import { StyleSheet } from "react-native";
import { Spacer, Text, VStack } from "swiftui-react-native";

export default SettingsSubcategory = ({ title, children }) => {
  return (
    <VStack style={styles.parentContainer} alignment="leading">
      {Boolean(title) && (
        <Text fontSize={14} fontWeight={700} foregroundColor="#979797">
          {title}
        </Text>
      )}
      <Spacer />
      <VStack alignment="leading" style={styles.container}>
        {children}
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    width: 350,
  },
  container: {
    width: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.2)",
    paddingHorizontal: 16,
    borderRadius: 16,
  },
});
