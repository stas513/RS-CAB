import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { colors } from "../utils/theme";
import { hp,wp } from "../utils";
import PhoneInput from "@components/PhoneInput";

const RHFPhoneInput = ({  name, control, placeholder, errors }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <PhoneInput
            flagSize={hp(3)}
            containerStyle={{
              width: wp(72),
              height: hp(5),
              borderRadius: 5,
              marginLeft: -6,
            }}
            defaultCode="US"
            keyboardType="phone-pad"
            placeholder={placeholder}
            onChangeFormattedText={onChange}
          />
        )}
      />
      {!!errors[name] && (
        <Text style={{ color: colors.red, fontSize: hp(1.5),marginTop:hp(2) }}>
          {errors[name].message}
        </Text>
      )}
    </>

  );
};

export default RHFPhoneInput;
