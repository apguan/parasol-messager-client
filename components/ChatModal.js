import React, { useState } from "react";
import { View, Text, Modal, Image, StyleSheet } from "react-native";

export default ChatModal = ({ isVisible, address }) => {
  return (
    <Modal
      animationType="slide"
      presentationStyle={"pageSheet"}
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/bank-vault-loading.gif")}
          style={styles.image}
          height={"25%"}
          width={"50%"}
        />
        {address ? (
          <Text style={styles.loadingText}>Done!</Text>
        ) : (
          <Text style={styles.loadingText}>Generating multi-sig wallet</Text>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 200,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "rt-mono-med",
    fontSize: 20,
    marginTop: 20,
  },
});
