import { createContext } from "react";

import SupabaseInterface from "../hooks/Supabase";

const defaultValues = {
  rooms: [],
  currentRoom: "",
  usersOnline: {},
  getRooms: null,
  setCurrentRoom: null,
  makeRooms: null,
  sendMessage: null,
  saveTransactionHash: null,
  saveMultiSigWalletAddress: null,
  roomHasMultiSigWallet: null,
  sortedMessages: {},
};
export const MessagingContext = createContext(defaultValues);

export default MessagingProvider = ({ children }) => {
  const {
    rooms,
    currentRoom,
    sortedMessages,
    usersOnline,
    getRooms,
    setCurrentRoom,
    makeRoom,
    getAllMessages,
    sendMessage,
    saveTransactionHash,
    saveMultiSigWalletAddress,
    roomHasMultiSigWallet,
  } = SupabaseInterface();

  return (
    <MessagingContext.Provider
      value={{
        rooms,
        currentRoom,
        sortedMessages,
        usersOnline,
        getRooms,
        setCurrentRoom,
        makeRoom,
        getAllMessages,
        sendMessage,
        saveTransactionHash,
        saveMultiSigWalletAddress,
        roomHasMultiSigWallet,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};
