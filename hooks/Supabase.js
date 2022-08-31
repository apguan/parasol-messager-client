//shim for `Error: URLSearchParams.set is not implemented`
import "react-native-url-polyfill/auto";

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const SupabaseInterface = () => {
  const [supabaseClient, setSupabaseClient] = useState();

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
      detectSessionInUrl: false,
    });
    setSupabaseClient(client);
  }, []);

  const getRooms = async () => {
    return;
  };

  return { supabaseClient };
};
