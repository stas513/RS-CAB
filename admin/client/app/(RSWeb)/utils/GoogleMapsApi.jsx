import axios from "axios";

let apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

export async function fetchPredictions(inputValue) {
  try {
    const response = await axios.post(`/api/users/googleapi/fetchLocations`, {
      inputValue,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    throw error;
  }
}

export async function fetchPlaceDetails(place) {
  try {
    const response = await axios.post(`/api/users/googleapi/fetchPlaceDetail`, {
      place,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    throw error;
  }
}

// calculateDistance.js

export const calculateTotalDistance = async (locations) => {
  const { startAddress, stopages, destinationAddress } = locations;
  const waypoints = [
    startAddress.name,
    ...stopages.map((stopage) => stopage.name),
    destinationAddress.name,
  ].join("|");

  let totalDistance = 0;

  try {
    const response = await axios.post(
      `/api/users/googleapi/calculateDistance`,
      {
        startname: startAddress.name,
        destinationname: destinationAddress.name,
        waypoints,
      }
    );
    const data = response.data;

    if (data.status === "OK") {
      totalDistance = data.routes[0].legs.reduce(
        (acc, leg) => acc + leg.distance.value,
        0
      );
    } else {
      console.error("Error calculating distance:", data.status);
      return null;
    }

    // Convert total distance to miles
    const totalDistanceMiles = totalDistance / 1609.34;
    return totalDistanceMiles;
  } catch (error) {
    console.error("Error calculating total distance:", error);
    return null;
  }
};
