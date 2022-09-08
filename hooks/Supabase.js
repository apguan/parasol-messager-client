//shim for `Error: URLSearchParams.set is not implemented`
import "react-native-url-polyfill/auto";

import { useState, useEffect, useCallback, useMemo } from "react";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default SupabaseInterface = () => {
  const supabase = useMemo(
    () =>
      createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
        },
        detectSessionInUrl: false,
      }),
    []
  );

  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [sortedMessages, setSortedMessages] = useState({});
  const [usersOnline, setUsersOnline] = useState({});

  useEffect(() => {
    getRooms();
    getAllMessages();
  }, []);

  useEffect(() => {
    roomsSubscription();
    messageSubscription();

    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  useEffect(() => {
    presenceSubscription();
  }, [currentRoom]);

  const presenceSubscription = () => {
    const channel = supabase.channel("online-users");
    return channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const usersArr = [].concat(...Object.values(state));
        const roomBuckets = usersArr.reduce((acc, val) => {
          acc[val.room]
            ? (acc[val.room] = [...acc[val.room], val])
            : (acc[val.room] = [val]);
          return acc;
        }, {});

        setUsersOnline(roomBuckets);
      })
      .subscribe(async (status) => {
        await channel.track({ room: currentRoom });
      });
  };

  const roomsSubscription = () => {
    return supabase
      .channel("public:rooms")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        () => {
          getRooms();
        }
      )
      .subscribe();
  };

  const getRooms = async () => {
    const { data, error } = await supabase.from("rooms").select();

    if (error) return error;

    const setup = data.reduce((acc, val) => {
      acc[val.room_id] ? null : (acc[val.room_id] = []);
      return acc;
    }, {});

    setSortedMessages(setup);
    setRooms(data);
  };

  const messageSubscription = useCallback(() => {
    return supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setSortedMessages((oldState) => {
            const roomId = payload.new?.room_id;
            const oldRoomMessages = oldState[roomId] || [];
            const updatedRoomMessages = [payload.new, ...oldRoomMessages];

            return {
              ...oldState,
              [roomId]: updatedRoomMessages,
            };
          });
        }
      )
      .subscribe();
  }, [currentRoom]);

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
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) return error;

    const sorted = data.reduce((acc, val) => {
      acc[val.room_id]
        ? (acc[val.room_id] = [val, ...acc[val.room_id]])
        : (acc[val.room_id] = [val].filter(Boolean));
      return acc;
    }, {});

    setSortedMessages({ ...sorted });
  };

  const sendMessage = async (room_id, username, message, walletIsConnected) => {
    const { data, error } = await supabase.from("messages").insert([
      {
        username,
        message,
        room_id,
        ...(walletIsConnected && { connected_wallet: walletIsConnected }),
      },
    ]);

    if (error) return error;

    return data;
  };

  const saveTransactionHash = async (transaction_hash, room) => {
    const { data, error } = await supabase.from("multisig_wallet").insert([
      {
        transaction_hash,
        room,
      },
    ]);

    if (error) return error;

    return data;
  };

  const saveMultiSigWalletAddress = async (
    wallet_address,
    transaction_hash
  ) => {
    const { data, error } = await supabase
      .from("multisig_wallet")
      .update({ wallet_address })
      .match({ transaction_hash });

    if (error) return error;

    return data;
  };

  const roomHasMultiSigWallet = async (room) => {
    const { data, error } = await supabase
      .from("multisig_wallet")
      .select("*")
      .match({ room });

    if (error) return error;

    return data;
  };

  return {
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
  };
};


// const getMessages = async (roomId, reverse) => {
//   const { data, error } = await supabase
//     .from("messages")
//     .select("*, rooms!inner(*)")
//     .eq("room_id", roomId);

//   if (error) return error;

//   const finalData = reverse ? data : data.reverse();

//   setCurrentRoomContent([...finalData]);
// };