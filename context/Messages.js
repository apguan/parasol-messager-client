import { createContext } from "react";
import SupabaseInterface from "../hooks/Supabase";

const defaultValues = {
  supabase: () => {},
  rooms: [],
  messages: [],
  makeRooms: (name, owner) => {},
  getMessages: (roomId) => {},
  sendMessage: (roomId, message, walletIsConnected) => {},
};

export const MessagingContext = createContext(defaultValues);

export const MessagingProvider = ({ children }) => {
  const { supabase, rooms, messages, makeRoom, getMessages, sendMessage } =
    SupabaseInterface();

  return (
    <MessagingContext.Provider
      value={{
        supabase,
        rooms,
        messages,
        makeRoom,
        getMessages,
        sendMessage,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};
