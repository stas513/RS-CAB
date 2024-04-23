import { createContext, useReducer } from "react";

const initialState = {
  bookingDetails: {
    startAddress: [],
    destinationAddress: [],
    stopages: [],
    bookingDate: null,
    bookingTime: null,
    numberOfPersons: 1,
    numberOfBags: 0,
    totalDistance: 0,
    totalBill: 0,
    packageId: null,
    userId: null,
    passengerId: null,
    clientName: null,
    clientEmail: null,
    clientPhone: null,
    requestType: null,
    budget: null,
  },
  rideDistanceDetails: {
    distance: null,
    time: null,
  },
  userCurLocDetails: {
    cordinates: [],
  },
  route: null,
};

const reducer = (state, action) => {
  if (action.type === "UPDATE_BOOKING_DETAILS") {
    return {
      ...state,
      bookingDetails: {
        ...state.bookingDetails,
        ...action.payload.bookingDetails,
      },
    };
  }
  if (action.type === "USER_DETAIL") {
    return {
      ...state,
      userCurLocDetails: {
        ...state.userCurLocDetails,
        ...action.payload.userCurLocDetails,
      },
    };
  }
  if (action.type === "GET_RIDE_TIME") {
    return {
      ...state,
      rideDistanceDetails: {
        ...state.rideDistanceDetails,
        ...action.payload.rideDistanceDetails,
      },
    };
  }
  if (action.type === "SET_ROUTE") {
    return {
      ...state,
      route: action.payload.route,
    };
  }
  return state;
};

export const BookingContext = createContext(null);
export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateBookingDetails = (bookingDetails) => {
    dispatch({
      type: "UPDATE_BOOKING_DETAILS",
      payload: { bookingDetails: bookingDetails },
    });
  };

  const updateRideDistanceDetails = (rideDistanceDetails) => {
    dispatch({
      type: "GET_RIDE_TIME",
      payload: { rideDistanceDetails: rideDistanceDetails },
    });
  };

  const updateBookingCurLocDetails = (userCurLocDetails) => {
    dispatch({
      type: "USER_DETAIL",
      payload: { userCurLocDetails: userCurLocDetails },
    });
  };

  const setRoute = (route) => {
    dispatch({
      type: "SET_ROUTE",
      payload: { route: route },
    });
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        updateBookingDetails,
        updateBookingCurLocDetails,
        updateRideDistanceDetails,
        setRoute,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
