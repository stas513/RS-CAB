import axios from "axios";

let apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

export async function fetchPredictions(newInputValue) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${newInputValue}&key=${apiKey}`
    );
    return response.data.predictions;
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
  ].join('|');

  let totalDistance = 0;

  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startAddress.name}&destination=${destinationAddress.name}&waypoints=${waypoints}&key=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      totalDistance = data.routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0);
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

export async function fetchPlaceDetails(place) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`

    );
    const { lat, lng } = response.data.results[0].geometry.location;

      // Extract postal code and house number from address components
      const addressComponents = response.data.results[0].address_components;
      let postCode = "";
      let houseNumber = "";
      let city = "";

      for (const component of addressComponents) {
        if (component.types.includes("postal_code")) {
          postCode = component.short_name;
        }
        if (component.types.includes("street_number")) {
          houseNumber = component.short_name;
        }
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
      }


    return {
        name: place,
        latitude: lat,
        longitude: lng,
        postCode,
        houseNumber,
        city,
      };
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
}

