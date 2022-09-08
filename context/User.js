import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import { Web3AuthHook } from "../hooks/Web3Auth";

const defaultValues = {
  web3Client: null,
  name: "",
  email: "",
  profileImage: "",
  privateKey: "",
  publicAddress: "",
  userInfo: null,
  login: null,
  logout: null,
};

export const UserContext = createContext(defaultValues);

export default UserProvider = ({ children }) => {
  const { login, logout, userInfo, web3Client } = Web3AuthHook();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [publicAddress, setPublicAddress] = useState();

  useEffect(() => {
    if (userInfo) {
      const { name, email, profileImage } = userInfo?.userInfo;
      const wallet = new ethers.Wallet(userInfo?.privKey);

      setName(name);
      setEmail(email);
      setPrivateKey(userInfo?.privKey);
      setProfileImage(profileImage);
      setPublicAddress(wallet.address);
    } else {
      setName(null);
      setEmail(null);
      setPrivateKey(null);
      setPublicAddress(null);
      setProfileImage(null);
    }
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{
        web3Client,
        name,
        email,
        privateKey,
        profileImage,
        publicAddress,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
