import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { colors } from "../utils/theme";
import { hp } from "../utils";
const RHFTextInput = ({ style, name, control, placeholder, errors,secureTextEntry,keyboardType },props) => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            style={style}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType?keyboardType:null}

          />
        )}
      />
      {!!errors[name] && (
        <Text style={{ color: colors.red, fontSize: hp(1.5) }}>
          {errors[name].message}
        </Text>
      )}
    </View>
  );
};

export default RHFTextInput;
