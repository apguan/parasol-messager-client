import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VStack } from "swiftui-react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const OnboardingTemplate = ({
  children,
  previousScreen,
  nextScreen,
  disableNext = true,
}) => {
  const navigation = useNavigation();

  // TouchbaleWithoutFeedback REQUIRES a <View> to work
  return (
    <TouchableWithoutFeedback accessible={false}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <VStack style={styles.container}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate(previousScreen)}
          >
            <Entypo name="chevron-small-left" size={40} color="#5D5B5D" />
          </TouchableOpacity>
          {children}
          <KeyboardAvoidingView
            behavior={"position"}
            keyboardVerticalOffset={235}
          >
            <TouchableOpacity
              style={[styles.nextTouchable, { opacity: disableNext ? 0.5 : 1 }]}
              onPress={() => navigation.navigate(nextScreen)}
              disabled={disableNext}
            >
              <View style={styles.next}>
                <AntDesign name="arrowright" size={40} color="white" />
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  back: {
    position: "absolute",
    left: 19,
    top: 41,
    height: 40,
    width: 40,
    borderRadius: 53,
    backgroundColor: "#F9F9FB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    zIndex: 3,
  },
  nextTouchable: {
    top: 200,
  },
  next: {
    backgroundColor: "#29E58B",
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 53,
  },
});

export default OnboardingTemplate;
