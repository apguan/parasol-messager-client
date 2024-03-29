// This is necessary as a shim
global.Buffer = global.Buffer || require("buffer").Buffer;

import { ENV, WEB3_AUTH_CLIENT_ID } from "@env";

import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { LOGIN_PROVIDER } from "@web3auth/react-native-sdk";
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";

import { SecureStoreHook } from "../utils/SecureStore";

const whiteLabel = {
  name: "Parasol Messenger",
  logoLight: "http://parasol.xyz/assets/img/Logo%20(@1x).png",
  defaultLanguage: "en",
  dark: false,
  theme: {
    primary: "#cddc39",
  },
};

const SDK_INIT_CONFIG = {
  clientId: WEB3_AUTH_CLIENT_ID,
  network: OPENLOGIN_NETWORK.TESTNET,
  whiteLabel,
};

export const USER_CREDENTIALS = "__USER_CREDENTIALS";

export const Web3AuthHook = () => {
  const { saveItem, getItem, deleteItem } = SecureStoreHook();
  const [web3Auth, setWeb3Auth] = useState();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const userCredentials = await getItem(USER_CREDENTIALS);

      if (userCredentials) {
        setUserInfo(userCredentials);
      }
    })();

    const authProvider = new Web3Auth(WebBrowser, SDK_INIT_CONFIG);
    setWeb3Auth(authProvider);
  }, []);

  const redirectUrl = AuthSession.makeRedirectUri({
    scheme: "parasolmessagingclient",
    preferLocalhost: ENV === "PRODUCTION" ? false : true,
    path: "redirect",
  });

  const login = async () => {
    const result = await web3Auth.login({
      loginProvider: LOGIN_PROVIDER.GOOGLE,
      redirectUrl,
    });

    if (result) {
      await saveItem(USER_CREDENTIALS, result);
      setUserInfo(result);
      return result;
    }

    return null;
  };

  const logout = async () => {
    await web3Auth.logout({ redirectUrl });
    await deleteItem(USER_CREDENTIALS);

    setUserInfo(null);
  };

  return {
    login,
    logout,
    userInfo,
    web3Auth,
  };
};
