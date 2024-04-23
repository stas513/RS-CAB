import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "@utils/theme";

function LocationAutocomplete({ placeholder, onSelect, icon }) {
  const [inputValue, setInputValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [focusedAtStart, setFocusedAtStart] = useState(false);
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const handleInputChange = (text) => {
    setFocusedAtStart(false);
    setInputValue(text);

    if (text.length >= 3) {
      fetchPredictions(text);
    } else {
      setPredictions([]);
    }
  };

  const fetchPredictions = (query) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.predictions && data.predictions.length > 0) {
          setPredictions(data.predictions);
        } else {
          setPredictions([]);
        }
      })
      .catch((error) => console.error(error));
  };

  const handlePlaceSelected = (place) => {
    if (place.description) {
      setFocusedAtStart(true);
      const description = place.description;
      setInputValue(description);
      setPredictions([]);
      fetchLocationDetails(description);
    } else {
      console.error("Invalid place data:", place);
    }
  };

  const fetchLocationDetails = (description) => {
    const encodedDescription = encodeURIComponent(description); // Encode the description for the URL

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedDescription}&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const result = data.results[0];

          // Check if 'street_number', 'locality', and 'postal_code' components exist
          const streetNumberComponent = result.address_components.find(
            (component) => component.types.includes("street_number")
          );
          const localityComponent = result.address_components.find(
            (component) => component.types.includes("locality")
          );
          const postalCodeComponent = result.address_components.find(
            (component) => component.types.includes("postal_code")
          );

          // Set default values for missing components
          const houseNumber = streetNumberComponent
            ? streetNumberComponent.long_name
            : "N/A";
          const city = localityComponent ? localityComponent.long_name : "N/A";
          const postCode = postalCodeComponent
            ? postalCodeComponent.long_name
            : "N/A";
          const lat = result.geometry.location.lat.toString();
          const lng = result.geometry.location.lng.toString();
          const location = {
            name: description,
            latitude: lat,
            longitude: lng,
            postCode,
            houseNumber,
            city,
          };
          if (onSelect) {
            onSelect(location);
          }
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.autocompleteView}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={handleInputChange}
          value={inputValue}
          selection={focusedAtStart ? { start: 0, end: 0 } : {}}
        />
        {icon}
      </View>
      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePlaceSelected(item)}>
              <Text style={styles.suggestion}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  autocompleteView: {
    width: "100%",
  },
  input: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: "3%",
    paddingLeft: 35,
    textAlign: "left",

    marginBottom: 10,
    backgroundColor: colors.white,
  },
  suggestion: {
    borderBottomWidth: 1,
    width: "100%",
    padding: 5,
    fontSize: 12,
    backgroundColor: colors.white,
  },
});

export default LocationAutocomplete;
