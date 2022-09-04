import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";
import { createContext, useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SupabaseInterface from "../hooks/Supabase";

const defaultValues = {
  rooms: [],
  currentRoom: "",
  usersOnline: {},
  getRooms: null,
  setCurrentRoom: null,
  makeRooms: null,
  sendMessage: null,
  sortedMessages: {},
};

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
  },
  detectSessionInUrl: false,
});

export const MessagingContext = createContext(defaultValues);

export const MessagingProvider = ({ children }) => {
  if (!supabase) {
    return null;
  }

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
  } = SupabaseInterface(supabase);

  return (
    <MessagingContext.Provider
      value={{
        supabase,
        rooms,
        currentRoom,
        sortedMessages,
        usersOnline,
        getRooms,
        setCurrentRoom,
        makeRoom,
        getAllMessages,
        sendMessage,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};
