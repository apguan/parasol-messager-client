import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { UserContext } from "../context/User";
import SendTransaction from "../utils/SendTransaction";

export default TransactionModal = ({
  isTransacting,
  setIsTransacting,
  userAddresss,
}) => {
  const { userInfo } = useContext(UserContext);
  const { getBalance, sendEth } = SendTransaction(userInfo);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const balance = await getBalance();
      setBalance(balance);
    })();
  }, []);

  const submit = async () => {
    sendEth(balance);
    if (amount) {
      console.log(result);
      setIsTransacting(false);
    }
  };

  const cancel = () => {
    setAmount(0);
    setIsTransacting(false);
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle={"pageSheet"}
      visible={isTransacting}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Send Ethereum</Text>
        <Text style={[styles.title, { marginTop: 40 }]}>Balance: </Text>
        <Text style={styles.title}>{balance}</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setAmount}
          value={amount}
          keyboardType={"numeric"}
          placeholder="Amount"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={submit} disabled={!Boolean(amount)}>
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
    width: "60%",
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
