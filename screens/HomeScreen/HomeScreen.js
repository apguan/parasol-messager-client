import React, { useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

import { VStack } from "swiftui-react-native";

import ChatListHeader from "../../components/ChatListScreen/ChatListHeader";
import ChatPreview from "../../components/ChatListScreen/ChatPreview";
import NewChat from "../../components/ChatListScreen/NewChat";

import { DATA } from "../../_fixtures/chatlist-preview";

export default HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const dividerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={styles.container}>
      <VStack style={styles.container} alignment="leading">
        <ChatListHeader
          profileImage={
            "https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125"
          }
        />
        <Animated.View
          style={[
            styles.divider,
            {
              opacity: dividerOpacity,
            },
          ]}
        />
        <Animated.FlatList
          style={[styles.listContainer]}
          // need to implement pull-to-refresh here
          data={DATA}
          ItemSeparatorComponent={() => (
            <View style={styles.flatListSeparator} />
          )}
          renderItem={({ item }) => {
            return (
              <ChatPreview
                name={item.name}
                profileImage={item.profileImage}
                previewMessage={item.message}
                unreadCount={item.unread}
                isOnline={item.isOnline}
              />
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
            }
          )}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id.toString()}
        />
        <NewChat />
      </VStack>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#D9D9D9",
    padding: 0,
    margin: 0,
  },
  flatListSeparator: {
    height: 1,
    width: 290,
    backgroundColor: "#D9D9D9",
    left: 80,
  },
});
