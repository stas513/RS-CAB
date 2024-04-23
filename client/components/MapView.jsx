import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { UserContext } from "../context/userContext";
import MapViewDirections from "react-native-maps-directions";
import { useBookingContext } from "@context/booking/useBookingContext";
import { useUserContext } from "@context/userContext/useUserContext";

const MapWithDirections = () => {
  const {
    bookingDetails,
    updateBookingDetails,
    updateRideDistanceDetails,
    rideDistanceDetails,
  } = useBookingContext();
  const { userCurLocDetails } = useUserContext();

  const { latitude: currLocationlat, longitude: currLocationlng } =
    userCurLocDetails?.cordinates?.coords || {};

  const { startAddress, destinationAddress } = bookingDetails;

  const [startCoordinate, setStartCoordinate] = useState({
    latitude: parseFloat(startAddress.latitude) || currLocationlat || 0,
    longitude: parseFloat(startAddress.longitude) || currLocationlng || 0,
  });

  console.log(startCoordinate,'start cordination')
  const [endCoordinate, setEndCoordinate] = useState({
    latitude: parseFloat(destinationAddress?.latitude) || 0,
    longitude: parseFloat(destinationAddress?.longitude) || 0,
  });

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (
      startCoordinate.latitude &&
      startCoordinate.longitude &&
      endCoordinate.latitude &&
      endCoordinate.longitude
    ) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoordinate.latitude},${startCoordinate.longitude}&destination=${endCoordinate.latitude},${endCoordinate.longitude}&key=${apiKey}`
        )
        .then((response) => {
          const { routes } = response.data;

          const meters = response?.data?.routes[0]?.legs[0]?.distance?.value; // Distance in meters
          const miles = meters / 1609.344; // Convert to miles
          const distanceText = `${miles.toFixed(2)}`; // Format as "X.X mi"
          const { text: durationText } =
            response.data.routes[0].legs[0].duration;
          const durationInMinutes = parseDurationText(durationText);

          // Helper function to parse the duration text and convert it to minutes
          function parseDurationText(durationText) {
            const durationParts = durationText.split(" ");
            let totalMinutes = 0;

            for (let i = 0; i < durationParts.length; i++) {
              if (durationParts[i] === "hour" || durationParts[i] === "hours") {
                totalMinutes += parseInt(durationParts[i - 1]) * 60;
              } else if (
                durationParts[i] === "min" ||
                durationParts[i] === "mins"
              ) {
                totalMinutes += parseInt(durationParts[i - 1]);
              }
            }

            return totalMinutes;
          }

          updateRideDistanceDetails({
            distance: distanceText,
            time: durationInMinutes,
          });

          updateBookingDetails({
            ...bookingDetails,
            totalDistance: distanceText,
          });

          if (routes.length > 0) {
            const route = routes[0];
            const { overview_polyline } = route;
            const { points } = overview_polyline;
            const decodedCoordinates = polyline.decode(points);
            setRouteCoordinates(decodedCoordinates);
          }
        })
        .catch((error) => {
          console.log("Error fetching directions:", error);
        });
    }
    // const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${endCoordinate.latitude},${endCoordinate.longitude}&key=${apiKey}`;
    // axios
    //   .get(reverseGeocodeUrl)
    //   .then((response) => {
    //     const addressComponents = response.data.results[0].address_components;
    //     let postCode = "";
    //     let houseNumber = "";
    //     let city = "";

    //     for (const component of addressComponents) {
    //       if (component.types.includes("postal_code")) {
    //         postCode = component.short_name;
    //       }
    //       if (component.types.includes("street_number")) {
    //         houseNumber = component.short_name;
    //       }
    //       if (component.types.includes("locality")) {
    //         city = component.long_name;
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching reverse geocoding data:", error);
    //   });
  }, [startCoordinate, endCoordinate]);

  const initialRegion = {
    latitude: startCoordinate.latitude,
    longitude: startCoordinate.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {startCoordinate && endCoordinate ? (
          <MapViewDirections
            origin={startCoordinate}
            destination={endCoordinate}
            apikey={apiKey}
            strokeWidth={3}
            strokeColor="#FF0000"
          />
        ) : null}

        {startCoordinate ? (
          <Marker coordinate={startCoordinate} title="Start" pinColor="blue" />
        ) : null}
        {endCoordinate ? (
          <Marker coordinate={endCoordinate} title="End" />
        ) : null}
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
});

export default MapWithDirections;
