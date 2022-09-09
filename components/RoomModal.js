import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

import { UserContext } from "../context/User";

const LIMIT = 40;

export default RoomModal = ({ isMakingRoom, setIsMakingRoom, makeRoom }) => {
  const { email } = useContext(UserContext);
  const [name, setName] = useState("");
  const [charLeft, setCharLeft] = useState(LIMIT);

  const handleOnChange = (text) => {
    const diff = LIMIT - text.length;
    if (diff >= 0) {
      setCharLeft(diff);
      setName(text);
    }
  };

  const submit = async () => {
    if (name) {
      const result = await makeRoom(name, email);
      console.log(result);
      if (!result) {
        setName("");
        setCharLeft(LIMIT);
        setIsMakingRoom(false);
      }
    }
  };

  const cancel = () => {
    setName("");
    setCharLeft(LIMIT);
    setIsMakingRoom(false);
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle={"pageSheet"}
      visible={isMakingRoom}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create your room</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={handleOnChange}
          value={name}
          placeholder="name..."
        />
        <Text style={styles.limiter}>characters left: {charLeft}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={submit} disabled={!Boolean(name)}>
            <Text style={[styles.buttonStyle, { color: "#1681FF" }]}>
              Create
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancel}>
            <Text style={[styles.buttonStyle, { color: "red" }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "rt-mono-bold",
    fontSize: 22,
  },
  limiter: {
    fontFamily: "rt-mono-thin",
    fontSize: 12,
    marginTop: 10,
  },
  inputStyle: {
    fontSize: 24,
    fontFamily: "rt-mono-bold",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: "90%",
    textAlign: "center",
    borderWidth: 2,
  },
  image: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "rt-mono-med",
    fontSize: 20,
    marginTop: 20,
  },
  buttonStyle: {
    fontFamily: "rt-mono-med",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    width: "50%",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
  },
});
