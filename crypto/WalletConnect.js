import * as React from "react";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WalletModal from "../components/WalletModal";

export default WalletConnect = ({ isVisible = false, children }) => {
  return (
    <WalletConnectProvider
      clientMeta={{
        description: "Log into MSG!",
        url: "https://parasol.xyz",
        icons: ["http://parasol.xyz/assets/img/Logo%20(@1x).png"],
        name: "WalletConnect",
      }}
      redirectUrl={"parasolmessagingclient://redirect"}
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
      // // bridge="https://bridge.walletconnect.org"
      // renderQrcodeModal={({
      //   walletServices,
      //   visible,
      //   visiblility,
      //   connectToWalletService,
      // }) => {
      //   return isVisible ? <WalletModal /> : null;
      // }}
    >
      {children}
    </WalletConnectProvider>
  );
};
