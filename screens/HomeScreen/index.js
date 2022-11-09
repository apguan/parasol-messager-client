import React, { useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { VStack } from "swiftui-react-native";

import ChatListHeader from "../../components/ChatListScreen/ChatListHeader";
import ChatPreview from "../../components/ChatListScreen/ChatPreview";
import NewChat from "../../components/ChatListScreen/NewChat";

import { DATA } from "../../_fixtures/chatlist-preview";

const FlatListItem = ({ item }) => {
  return (
    <ChatPreview
      name={item.name}
      profileImage={item.profileImage}
      previewMessage={item.message}
      unreadCount={item.unread}
      isOnline={item.isOnline}
    />
  );
};

const FlatListSeparator = () => <View style={styles.flatListSeparator} />;

export default HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const dividerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <VStack style={styles.container} alignment="leading">
        <ChatListHeader
          profileImage={
            "https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125"
          }
        />
        {/* <Animated.View
          style={[
            styles.divider,
            {
              opacity: dividerOpacity,
            },
          ]}
        /> */}
        <Animated.FlatList
          style={[styles.listContainer]}
          StickyHeaderComponent={() => (
            <Animated.View
              style={[
                styles.divider,
                {
                  opacity: dividerOpacity,
                },
              ]}
            />
          )}
          // need to implement pull-to-refresh here
          data={DATA}
          ItemSeparatorComponent={FlatListSeparator}
          renderItem={FlatListItem}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  divider: {
    width: "100%",
    height: 0,
    borderWidth: 0.5,
    backgroundColor: "#D9D9D9",
    padding: 0,
    margin: 0,
  },
  flatListSeparator: {
    flex: 1,
    height: 1,
    width: "77%",
    left: "20%",
    backgroundColor: "rgba(217, 217, 217, 0.7)",
  },
});
