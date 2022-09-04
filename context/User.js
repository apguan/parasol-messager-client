import { createContext } from "react";

import { Web3AuthHook } from "../hooks/Web3Auth";

const defaultValues = {
  privateKey: "",
  publicAddress: "",
  identityObj: {},
};

const UserContext = createContext(defaultValues);

export default UserProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};
