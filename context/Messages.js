import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";
import { createContext, useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SupabaseInterface from "../hooks/Supabase";

const defaultValues = {
  rooms: [],
  messages: [],
  makeRooms: null,
  getMessages: null,
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
    messages,
    sortedMessages,
    makeRoom,
    getMessages,
    sendMessage,
  } = SupabaseInterface(supabase);

  return (
    <MessagingContext.Provider
      value={{
        rooms,
        messages,
        sortedMessages,
        makeRoom,
        getMessages,
        sendMessage,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};
