// This is necessary as a shim
global.Buffer = global.Buffer || require("buffer").Buffer;
import { ENV, WEB3_AUTH_CLIENT_ID } from "@env";

import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { LOGIN_PROVIDER } from "@web3auth/react-native-sdk";
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";

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

export const Web3AuthHook = () => {
  const [web3Auth, setWeb3Auth] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const authProvider = new Web3Auth(WebBrowser, SDK_INIT_CONFIG);
    setWeb3Auth(authProvider);
  }, []);

  const redirectUrl = AuthSession.makeRedirectUri({
    scheme: "parasolmessagingclient",
    preferLocalhost: ENV === "PRODUCTION" ? false : true,
    path: "redirect",
  });

  const auth = web3Auth;

  const login = async () => {
    const result = await auth.login({
      loginProvider: LOGIN_PROVIDER.GOOGLE,
      redirectUrl,
    });

    console.log(result);
    setLoggedIn(true);
    return result;
  };

  const logout = async () => {
    await auth.logout({ redirectUrl });
    setLoggedIn(false);
  };

  return {
    web3Auth,
    login,
    logout,
    loggedIn,
  };
};
