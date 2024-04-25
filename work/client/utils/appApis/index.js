import axios from "axios";
// import axiosInstance from "../axios";
const getPackages = async () => {
  try {
    const response = await axios.get(
      "https://rsadmin.vercel.app/api/admin/packages"
    );

    return response.data;
  } catch (error) {
    console.error("Error in getPackages:", error);
    throw error;
  }
};
const FetchFare = async (body) => {
  try {
    const response = await axios.post(
      "http://16.171.177.134:8080/calculate-price",
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error in Fatching Fare:", error);
    throw error;
  }
};
const updateDriverLocation = async (body) => {
  try {
    const response = await axios.post(
      "http://16.171.177.134:8080/update-driver-location",
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error in Update Location:", error);
    throw error;
  }
};
const fetchImageFromBackend = async (image) => {
  try {
    const data = await axios.get(
      `https://rsadmin.vercel.app/api/admin/files/${image}`
    );
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
const fetchBookingDetailById = async (id) => {
  try {
    const { data } = await axios.post(
      "http://16.171.177.134:8080/fetch-booking-by-id",
      { id }
    );
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
const fetchRequestDetailById = async (id) => {
  try {
    const { data } = await axios.post(
      "http://16.171.177.134:8080/fetch-request-by-id",
      { id }
    );
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export {
  getPackages,
  FetchFare,
  fetchBookingDetailById,
  fetchRequestDetailById,
  fetchImageFromBackend,
  updateDriverLocation,
};
