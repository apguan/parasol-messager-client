//shim for `Error: URLSearchParams.set is not implemented`
import "react-native-url-polyfill/auto";

import { useState, useEffect, useCallback } from "react";

export default SupabaseInterface = (supabase) => {
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
        const usersArr = [].concat(...Object.values(channel.presenceState()));
        const roomBuckets = usersArr.reduce((acc, val) => {
          acc[val.room]
            ? (acc[val.room] = [...acc[val.room], val])
            : (acc[val.room] = [val]);
          return acc;
        }, {});

        setUsersOnline(roomBuckets);
      })
      .subscribe(async (status) => {
        await channel.track({ username: "hotdoghelper", room: currentRoom });
      });
  };

  const getRooms = async () => {
    const { data, error } = await supabase.from("rooms").select();

    if (error) return error;

    setRooms([...data]);
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

  const messageSubscription = useCallback(() => {
    return supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          getRooms();
          getAllMessages();
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

  const sendMessage = async (roomId, username, message, walletIsConnected) => {
    const { data, error } = await supabase.from("messages").insert([
      {
        username,
        message,
        room_id: roomId,
        connected_wallet: walletIsConnected,
      },
    ]);

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