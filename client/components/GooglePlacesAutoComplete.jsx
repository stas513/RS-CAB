import React, { useState, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "@utils/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  FontAwesome5,
  Entypo,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

const GooglePlacesInput = ({ placeholder, onSelect, renderLeftIcon }) => {
  const [suggestions, setSuggestions] = useState([]); 
  const inputRef = useRef();
  const handleSelect = (data, details) => {
    if (onSelect) {
      onSelect(data, details);
    }
    setSuggestions([]);
    inputRef.current.focus();
  };
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <GooglePlacesAutocomplete
        keepResultsAfterBlur={true}
        keyboardShouldPersistTaps="always"
        onSelect={onSelect}
        placeholder={placeholder}
        fetchDetails={true}
        onPress={(data, details) => handleSelect(data, details)}
        styles={{
          container: {
            flex: 1,
            backgroundColor: "white",
            marginVertical: "1%",
            borderRadius: 10,
          },
          textInputContainer: {
            width: "100%",
            paddingLeft: "10%",
          },

          description: {
            fontWeight: "bold",
          },
        }}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        query={{
          key: apiKey,
          language: "en",
          components: "country:PK",
        }}
        renderLeftButton={() => {
          return renderLeftIcon || null;
        }}
        // GooglePlacesDetailsQuery={["geometry"]}
        enablePoweredByContainer={false}
        debounce={100}
        suggestions={suggestions}
        // textInputProps={{
        //   value: places,
        //   onChangeText: setPlaces,
        // }}
      />
    </ScrollView>
  );
};

export default GooglePlacesInput;
const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: colors.white,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  customIcon: {
    width: 30,
    height: 30,
  },
});
