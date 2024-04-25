import { StyleSheet, TextInput, View } from "react-native";
import React, { useRef } from "react";
import { hp, wp } from "../utils";

const OtpInput = ({otpCode,setOtpCode}) => {

    const inputRefs = [];

    for (let i = 0; i < 6; i++) {
      inputRefs.push(useRef(null));
    }

    const focusNextInput = (index) => {
      if (index < 5) {
        inputRefs[index + 1].current.focus();
      }
    };

    const focusPreviousInput = (index) => {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    };

    const handleInputChange = (text, index) => {
      if (text.length > 0) {
        focusNextInput(index);
        const newOtpCode = [...otpCode];
        newOtpCode[index] = text;
        setOtpCode(newOtpCode);
      } else {
        focusPreviousInput(index);
        const newOtpCode = [...otpCode];
        newOtpCode[index] = text;
        setOtpCode(newOtpCode);
      }
    };

    const handleBackspacePress = (index) => {
      if (index > 0) {
        inputRefs[index].current.clear();
        focusPreviousInput(index);
      }
    };

  return (
    <View style={styles.inputConatiner}>
      <TextInput
        style={styles.input}
        maxLength={1}
        keyboardType="numeric"
        placeholder="-"
        placeholderTextColor="black"
        ref={inputRefs[0]}
        onChangeText={(text) => handleInputChange(text, 0)}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspacePress(0);
          }
        }}
      />
      <TextInput
        style={styles.input}
        maxLength={1}
        keyboardType="numeric"
        placeholder="-"
        placeholderTextColor="black"
        ref={inputRefs[1]}
        onChangeText={(text) => handleInputChange(text, 1)}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspacePress(1);
          }
        }}
      />
      <TextInput
        style={styles.input}
        maxLength={1}
        keyboardType="numeric"
        placeholder="-"
        placeholderTextColor="black"
        ref={inputRefs[2]}
        onChangeText={(text) => handleInputChange(text, 2)}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspacePress(2);
          }
        }}
      />
      <TextInput
        style={styles.input}
        maxLength={1}
        keyboardType="numeric"
        placeholder="-"
        placeholderTextColor="black"
        ref={inputRefs[3]}
        onChangeText={(text) => handleInputChange(text, 3)}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspacePress(3);
          }
        }}
      />
      <TextInput
        style={styles.input}
        maxLength={1}
        keyboardType="numeric"
        placeholder="-"
        placeholderTextColor="black"
        ref={inputRefs[4]}
        onChangeText={(text) => handleInputChange(text, 4)}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspacePress(4);
          }
        }}
      />
      <TextInput
        style={styles.input}
        maxLength={1}
        keyboardType="numeric"
        placeholder="-"
        placeholderTextColor="black"
        ref={inputRefs[5]}
        onChangeText={(text) => handleInputChange(text, 5)}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspacePress(4);
          }
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
 inputConatiner: {
    flexDirection: "row",
    marginVertical: hp(3),
    justifyContent: "flex-start",
  },
  input: {
    width: wp(10),
    height: hp(5),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    textAlign: "center",
    marginRight: wp(2),
    fontSize: wp(4.66),
    fontWeight: "bold",
  },
})
export default OtpInput;
