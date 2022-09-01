//shim for `Error: URLSearchParams.set is not implemented`
import "react-native-url-polyfill/auto";

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const options = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
  },
  detectSessionInUrl: false,
};

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, options);

export const SupabaseInterface = () => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    roomsSubscription();
    messageSubscription();

    return () => {
      supabase.removeAllChannels();
    };
  }, [supabase]);

  const getRooms = async () => {
    const { data, error } = await supabase.from("rooms").select();

    if (error) return error;

    setRooms([...data]);
  };

  const roomsSubscription = useCallback(() => {
    return supabase
      .channel("public:rooms")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rooms" },
        (payload) => {
          const room = payload.new;
          setRooms([room, ...rooms]);
        }
      )
      .subscribe();
  }, [rooms]);

  const messageSubscription = useCallback(() => {
    return supabase.channel("public:messages").on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        setMessages([...messages, payload]);
      }
    );
  }, [messages]);

  const makeRoom = async (name, owner) => {
    const { data, error } = await supabase.from("rooms").insert([
      {
        name,
        owner,
      },
    ]);

    if (error) return error;

    return data;
  };

  const getMessages = async (roomId) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*, rooms!inner(*)")
      .eq("room_id", roomId);

    if (error) return error;

    return data;
  };

  const sendMessage = async (roomId, message, walletIsConnected) => {
    await supabase.from("messages").insert([
      {
        message,
        room_id: roomId,
        connected_wallet: walletIsConnected,
      },
    ]);

    return;
  };

  return { supabase, rooms, makeRoom, getMessages, sendMessage };
};
