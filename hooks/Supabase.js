//shim for `Error: URLSearchParams.set is not implemented`
import "react-native-url-polyfill/auto";

import { useState, useEffect, useCallback } from "react";

export default SupabaseInterface = (supabase) => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sortedMessages, setSortedMessages] = useState({});

  useEffect(() => {
    getRooms();
    getAllMessages();

    roomsSubscription();
    messageSubscription();

    return () => {
      supabase.removeAllChannels();
    };
  }, []);

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

  const getAllMessages = async () => {
    const { data, error } = await supabase.from("messages").select("*");

    if (error) return error;

    const sorted = data.reduce((acc, val) => {
      acc[val.room_id]
        ? (acc[val.room_id] = [...acc[val.room_id], val])
        : (acc[val.room_id] = [val]);
      return acc;
    }, {});

    setSortedMessages(sorted);
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

  return { rooms, sortedMessages, makeRoom, getMessages, sendMessage };
};
