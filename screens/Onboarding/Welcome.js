import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image, VStack, Text } from "swiftui-react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useNavigation } from "@react-navigation/native";

const backgroundImage = require("../../assets/background/Background.png");
const logo = require("../../assets/logo.png");

//height of the distance from top to bottom sheet - bottomsheet height
const END_HEIGHT = 482 - 362;

const Welcome = () => {
  const slideRef = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const connector = useWalletConnect();

  useEffect(() => {
    slideUp();
  }, []);

  const slideUp = () => {
    Animated.timing(slideRef, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.075, 0.82, 0.2, 1.0),
    }).start();
  };

  const connectWallet = () => {
    // connector.connect();
    navigation.navigate("PhoneNumber");
  };

  return (
    <Animated.View style={styles.backgroundShader}>
      <StatusBar style="light" />
      <ImageBackground source={backgroundImage} style={styles.container}>
        <VStack alignment="center" style={styles.container}>
          <Image style={styles.logo} source={logo} />
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [
                  {
                    translateY: slideRef.interpolate({
                      inputRange: [0, 1],
                      outputRange: [482, 362 - END_HEIGHT],
                    }),
                  },
                ],
              },
            ]}
          >
            <VStack>
              <Text
                style={styles.welcomeText}
                customFont={"satoshi-bold"}
                fontSize={28}
              >
                Welcome to MSG!
              </Text>
              <TouchableOpacity style={styles.button} onPress={connectWallet}>
                <Text fontWeight="bold" fontSize={20} style={styles.buttonText}>
                  Connect Wallet
                </Text>
              </TouchableOpacity>
              <Text
                style={styles.agreement}
                fontSize={14}
                customFont={"satoshi-regular"}
              >
                By continuing, you agree to MSG's{" "}
                <Text
                  fontWeight="bold"
                  fontSize={14}
                  customFont={"satoshi-bold"}
                >
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text
                  fontWeight="bold"
                  fontSize={14}
                  customFont={"satoshi-bold"}
                >
                  Privacy Policy
                </Text>
              </Text>
            </VStack>
          </Animated.View>
        </VStack>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backgroundShader: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  logo: {
    height: 53,
    width: 63,
    position: "absolute",
    top: 350,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  welcomeText: {
    marginTop: 78,
  },
  button: {
    width: 343,
    height: 65,
    marginTop: 28,
    backgroundColor: "#1B3F70",
    borderRadius: 53,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: { color: "white", fontFamily: "satoshi-bold" },
  agreement: {
    height: 114,
    lineHeight: 20,
    width: 272,
    marginTop: 56 - 37,
  },
  bottomSheet: {
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    width: "100%",
    height: 362,
    backgroundColor: "white",
  },
});

export default Welcome;
