import React, { useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

import { VStack } from "swiftui-react-native";

import ChatListHeader from "../../components/ChatListScreen/ChatListHeader";
import ChatPreview from "../../components/ChatListScreen/ChatPreview";
import NewChat from "../../components/ChatListScreen/NewChat";

const DATA = [
  {
    id: 0,
    profileImage:
      "https://t3.ftcdn.net/jpg/03/31/02/74/240_F_331027429_mLSNlEUafthRQp8XXXxokPmgDVkOob9R.jpg",
    name: "MSG Bot",
    message: "Beepboop. Welcome, Avatar Aang. Excited to see you join MSG bot",
    unread: 1,
    isOnline: true,
  },
  {
    id: 1,
    profileImage:
      "https://terrigen-cdn-dev.marvel.com/content/prod/2x/102_gza1510_comp_v002.1032_0.jpg",
    name: "Groot",
    message: "Does 11AM work?",
    unread: 10,
    isOnline: true,
  },
  {
    id: 2,
    profileImage:
      "https://s.yimg.com/os/creatr-uploaded-images/2022-04/61254c10-c4e2-11ec-b6eb-8947bb0d6d4e",
    name: "BAYC #1363",
    message: "This is a really long string that will serve as the preview",
    unread: 12,
    isOnline: true,
  },
  {
    id: 3,
    profileImage:
      "https://static.wikia.nocookie.net/villains/images/f/f0/MotoJojo.png/revision/latest/scale-to-width-down/1200?cb=20190118162531",
    name: "Mojo Jojo",
    message: "This is a really long string that will serve as the preview",
    unread: 3,
    isOnline: true,
  },
  {
    id: 4,
    profileImage:
      "https://comicyears.com/wp-content/uploads/2022/06/scarlet-witch-movie-4.webp",
    name: "Scarlette",
    message: "This is a really long string that will serve as the preview",
    unread: 100,
    isOnline: true,
  },
  {
    id: 5,
    profileImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR8AAACwCAMAAAABtJrwAAAAY1BMVEUAAAAAAAH+//X////8/f8AAAWQk5n+/P7//vrAw9Hr7/IBAAchIjT+//n///2YnKvBxMofJCuYnab6//y5vcGQlZmRk52Xm6AOFR6enaMgIzAhIjUAABzn7Oz4/fjY3N/BwtQflb/gAAACTUlEQVR4nO3UUXOTQBhG4Q8WwgZk1cZErVr9/7/S3cQ2MHbObXtxnguG4Yo5vEv0ZShrn9deOznnNZcU/TQMp7UM2ksplZJqn+utXjOkEk/py+F8PlwuB22da5S59knpa+hV3+Z6vlqfMbplGbWzxOc5TbXP9+gi2pNOd3U0//o8RDe2Pi5oqzZ5vP1/bn26ennrb/aejNc++bnP0rVTphf1//NhTuu2j+5e+pTyMZaxW1zPnn2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh9mH2YfZh92HOflB5iHMM+G11V+/y47qf2ibFNSBttM9f9nNp+XM9/liUe55TjVC5v/Srv1c9fqcRT+v2pOR7/HHXXmgytzyk1a6+dW5YSa66VSkllXbPuapJpKjnWetNM2qnbqbvJfwGv15DCzk+pBQAAAABJRU5ErkJggg==",
    name: "BLM Bro",
    message: "This is a really long string that will serve as the preview",
    unread: 0,
    isOnline: true,
  },
  {
    id: 6,
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLdsnof-vT1CnXRsg9RIn4HdvLwACv-O2zEw&usqp=CAU",
    name: "Turtle Power!",
    message: "This is a really long string that will serve as the preview",
    unread: 0,
    isOnline: true,
  },
  {
    id: 7,
    profileImage:
      "https://terrigen-cdn-dev.marvel.com/content/prod/2x/102_gza1510_comp_v002.1032_0.jpg",
    name: "Groot",
    message: "This is a really long string that will serve as the preview",
    unread: 0,
    isOnline: true,
  },
];

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
