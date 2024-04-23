import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { reverseGeocode } from "../utils/mapApis/MapApis";
import { useBookingContext } from "@context/booking/useBookingContext";
import { useUserContext } from "@context/userContext/useUserContext";

const MapViewDragable = () => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const { bookingDetails, updateBookingDetails, route } = useBookingContext();
  const { userCurLocDetails } = useUserContext();
  const { latitude: currLocationlat, longitude: currLocationlng } =
    userCurLocDetails?.cordinates?.coords || {};

  const initialCoordinate = {
    latitude: currLocationlat,
    longitude: currLocationlng,
  };

  const [startCoordinate, setStartCoordinate] = useState(initialCoordinate);
  const [endCoordinate, setEndCoordinate] = useState(initialCoordinate);
  const showStartMarker =
    route === "passengers/booking/searchLocationMap/PickLocationOnMap";
  const showEndMarker = route === "searchLocationMap/DropLocationOnMap";
  const handleStartMarkerDragEnd = (e) => {
    // When the start marker is dragged, update its position
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setStartCoordinate({ latitude, longitude });
  };

  const handleEndMarkerDragEnd = (e) => {
    // When the end marker is dragged, update its position
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setEndCoordinate({ latitude, longitude });
  };
  async function reverseGeocode(latitude, longitude) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );

      if (response.data.results.length > 0) {
        const result = response.data.results[0];
        const location = result.geometry.location;
        const geocodingData = {
          latitude: location.lat,
          longitude: location.lng,
          name: result.formatted_address,
          city: "",
          houseNumber: "",
          postCode: "",
        };
        const addressComponents = result.address_components;

        addressComponents.forEach((component) => {
          if (component.types.includes("locality")) {
            geocodingData.city = component.long_name;
          } else if (component.types.includes("street_number")) {
            geocodingData.houseNumber = component.long_name;
          } else if (component.types.includes("postal_code")) {
            geocodingData.postCode = component.long_name;
          }
        });

        return geocodingData;
      }
    } catch (error) {
      console.error("Error geocoding:", error);
    }
  }

  useEffect(() => {
    reverseGeocode(startCoordinate.latitude, startCoordinate.longitude)
      .then((geocodingData) => {
        updateBookingDetails({
          ...bookingDetails,
          startAddress: geocodingData,
        });
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  }, [startCoordinate]);
  useEffect(() => {
    reverseGeocode(endCoordinate.latitude, endCoordinate.longitude)
      .then((geocodingData) => {
        updateBookingDetails({
          ...bookingDetails,
          destinationAddress: geocodingData,
        });
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  }, [endCoordinate]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: startCoordinate.latitude,
          longitude: startCoordinate.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <MapViewDirections
          origin={startCoordinate}
          // destination={endCoordinate}
          apikey={apiKey}
          strokeWidth={6}
          strokeColor="gray"
        />

        {showStartMarker && (
          <Marker
            coordinate={startCoordinate}
            draggable={true}
            onDragEnd={handleStartMarkerDragEnd}
            title="Start"
            pinColor="blue"
          />
        )}

        {showEndMarker && (
          <Marker
            coordinate={endCoordinate}
            draggable={true}
            onDragEnd={handleEndMarkerDragEnd}
            title="End"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coordinateDisplay: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

export default MapViewDragable;
