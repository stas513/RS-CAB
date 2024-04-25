import axiosInstance from "../axios";

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
// const fetchNearbyPlaces = async (radius,type,key) => {
//   const response = await axiosInstance.get(`/place/nearbysearch/json?location=24.90737193213271%2C66.9669267883356&radius=${radius}&type=${type}&key=${key}`);
//   return response;
// };
const fetchplaces = async (text, key) => {
  const response = await axiosInstance.get(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${text}&key=${key}`
  );
  return response;
};
// Function to fetch postal code and city information using reverse geocoding
const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axiosInstance.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    if (response.data.results.length > 0) {
      const addressComponents = response.data.results[0].address_components;
      let postCode = "";
      let city = "";
      let houseNumber = "";

      // Loop through address components to find postal code and city
      for (const component of addressComponents) {
        if (component.types.includes("postal_code")) {
          postCode = component.short_name;
        }
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("street_number")) {
          houseNumber = component.short_name;
        }
      }

      // Return postal code and city
      return { postCode, city, houseNumber };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error geocoding:", error);
    return null;
  }
};

// const reverseGeocode = async (latitude, longitude) => {
//   try {
//     const response = await axiosInstance.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
//     );

//     if (response.data.results.length > 0) {
//       const address = response.data.results[0].formatted_address;

//       return response.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error geocoding:", error);
//     return null;
//   }
// };

// const fetchselectedAddress = async (key, lat, lng) => {
//   const response = await axiosInstance.get(`/geocode/json?latlng=${lat},${lng}&key=${key}`);
//   return response;
// };
export { reverseGeocode };
