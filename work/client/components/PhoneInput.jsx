import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import CountryPicker, {
  getCallingCode,
  DARK_THEME,
  DEFAULT_THEME,
  CountryModalProvider,
  Flag,
} from "react-native-country-picker-modal";
import { PhoneNumberUtil } from "google-libphonenumber";
import { hp, wp } from "@utils";

const dropDown =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==";
const phoneUtil = PhoneNumberUtil.getInstance();

const PhoneInput = ({
  defaultCode,
  value,
  defaultValue,
  onChangeCountry,
  onChangeFormattedText,
  onChangeText,
  withShadow,
  withDarkTheme,
  codeTextStyle,
  textInputProps,
  textInputStyle,
  autoFocus,
  placeholder,
  disableArrowIcon,
  flagButtonStyle,
  containerStyle,
  textContainerStyle,
  countryPickerProps = {},
  filterProps = {},
  countryPickerButtonStyle,
  layout = "first",
  flagSize,
  disabled,
}) => {
  const [code, setCode] = useState(defaultCode ? undefined : "91");
  const [number, setNumber] = useState(value || defaultValue || "");
  const [modalVisible, setModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState(defaultCode || "IN");

  useEffect(() => {
    if (defaultCode) {
      const fetchCallingCode = async () => {
        const fetchedCode = await getCallingCode(defaultCode);
        setCode(fetchedCode);
      };
      fetchCallingCode();
    }
  }, [defaultCode]);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCode(country.callingCode[0]);
    if (onChangeCountry) {
      onChangeCountry(country);
    }
    if (onChangeFormattedText) {
      if (country.callingCode[0]) {
        onChangeFormattedText(`+${country.callingCode[0]}${number}`);
      } else {
        onChangeFormattedText(number);
      }
    }
    setModalVisible(false);
  };

  const onChangeTextHandler = (text) => {
    setNumber(text);
    if (onChangeText) {
      onChangeText(text);
    }
    if (onChangeFormattedText) {
      const formattedText = code && text.length > 0 ? `+${code}${text}` : text;
      onChangeFormattedText(formattedText);
    }
  };

  const renderDropdownImage = () => {
    return (
      <Image
        source={{ uri: dropDown }}
        resizeMode="contain"
        style={styles.dropDownImage}
      />
    );
  };

  const renderFlagButton = () => {
    if (layout === "first") {
      return <Flag countryCode={countryCode} flagSize={flagSize} />;
    }
    return <View />;
  };

  return (
    <CountryModalProvider>
      <View
        style={[
          styles.container,
          withShadow ? styles.shadow : {},
          containerStyle ? containerStyle : {},
        ]}
      >
        <TouchableOpacity
          style={[
            styles.flagButtonView,
            layout === "second" ? styles.flagButtonExtraWidth : {},
            flagButtonStyle ? flagButtonStyle : {},
            countryPickerButtonStyle ? countryPickerButtonStyle : {},
          ]}
          disabled={disabled}
          onPress={() => setModalVisible(true)}
        >
          <CountryPicker
            onSelect={onSelect}
            withEmoji
            withFilter
            withFlag
            filterProps={filterProps}
            countryCode={countryCode}
            withCallingCode
            disableNativeModal={disabled}
            visible={modalVisible}
            theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
            renderFlagButton={renderFlagButton}
            onClose={() => setModalVisible(false)}
            {...countryPickerProps}
          />
          {code && layout === "second" && (
            <Text style={[styles.codeText, codeTextStyle ? codeTextStyle : {}]}>
              {`+${code}`}
            </Text>
          )}
          {!disableArrowIcon && (
            <React.Fragment>
              {renderDropdownImage
                ? renderDropdownImage
                : this.renderDropdownImage()}
            </React.Fragment>
          )}
        </TouchableOpacity>
        <View
          style={[
            styles.textContainer,
            textContainerStyle ? textContainerStyle : {},
          ]}
        >
          {code && layout === "first" && (
            <Text style={[styles.codeText, codeTextStyle ? codeTextStyle : {}]}>
              {`+${code}`}
            </Text>
          )}
          <TextInput
            style={[styles.numberText, textInputStyle ? textInputStyle : {}]}
            placeholder={placeholder ? placeholder : "Phone Number"}
            onChangeText={onChangeTextHandler}
            value={number}
            editable={!disabled}
            selectionColor="black"
            keyboardAppearance={withDarkTheme ? "dark" : "default"}
            keyboardType="number-pad"
            autoFocus={autoFocus}
            {...textInputProps}
          />
        </View>
      </View>
    </CountryModalProvider>
  );
};

export const isValidNumber = (number, countryCode) => {
  try {
    const parsedNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: hp(0.1),
    marginBottom: -14,
  },
  flagButtonView: {
    width: wp(20),
    minWidth: 32,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  flagButtonExtraWidth: {
    width: wp(23),
  },

  dropDownImage: {
    width: 12,
  },
  textContainer: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.1),
    marginRight: wp(2),
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
  codeText: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#000000",
  },
  numberText: {
    fontSize: hp(2),
    color: "#000000",
    marginHorizontal: wp(1),
  },
});
