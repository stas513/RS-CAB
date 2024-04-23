import React from "react";
import { View, StyleSheet, Image, TextInput, Text } from "react-native";
import Driver3 from "@assets/UserFlow/Drivers/Driver3.png";

import { Ionicons } from "@expo/vector-icons";

function Chat() {
  return (
    <View style={styles.Container}>
      <View style={styles.inroCon}>
        <Image source={Driver3} />
        <Text>Jerry Johns</Text>
        <Text style={styles.noteText}>
          Note : Reply to your message can be deleyed as drivers don't reply
          while driving.
        </Text>
      </View>
      <View style={styles.chatView}></View>
      <View style={styles.inputcont}>
        <View style={styles.inputConChild}>
          <TextInput style={styles.input} />
          <Ionicons style={styles.sendIcon} name="send" size={24} color="black" />
        </View>
      </View>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: "2%",
  },
  inroCon: {
    flex: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
  },
  chatView: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  inputcont: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1%", paddingHorizontal: "2%"

  },
  noteText: {
    textAlign: "center",
    paddingHorizontal: "7%",
    fontSize: 13
  },
  input: {
    flexGrow: 1,
    paddingLeft: 30,
    paddingVertical: "3%",
    color: "red"
  },
  sendIcon: {
    marginRight: "2%",
  },
  inputConChild: {
    borderWidth: 1,
    borderRadius: 50,

    alignItems: "center",
    flexDirection: "row",

  }
});
