import { createContext, useEffect, useReducer } from "react";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import checkTime from "../../utils/checkTime";

const initialState = {
  rideId: null,
  rideBids: [],
  acceptedBid: null,
  ride: null,
  booking: null,
  isArrivedAtPickup: false,
  isLoading: false,
  isRideCompleted: false,
  isRideCancelling: false,
};

const reducer = (state, action) => {
  if (action.type == "SET_RIDE_ID") {
    return {
      ...state,
      rideId: action.payload.rideId,
    };
  }

  if (action.type == "SET_RIDE_BIDS") {
    return {
      ...state,
      rideBids: [action.payload.rideBid, ...state.rideBids],
    };
  }

  if (action.type == "SET_RIDE") {
    return {
      ...state,
      ride: action.payload.ride,
    };
  }

  if (action.type == "SET_BOOKING") {
    return {
      ...state,
      booking: action.payload.booking,
    };
  }

  if (action.type == "DECLINE_BID") {
    return {
      ...state,
      rideBids: action.payload.rideBids,
    };
  }

  if (action.type == "ARRIVED_AT_PICKUP") {
    return {
      ...state,
      isArrivedAtPickup: action.payload.isArrivedAtPickup,
    };
  }

  if (action.type == "SET_LOADING") {
    return {
      ...state,
      isLoading: action.payload.isLoading,
    };
  }

  if (action.type == "SET_RIDECOMPLETED") {
    return {
      ...state,
      isRideCompleted: action.payload.isRideCompleted,
    };
  }
  if (action.type == "CLEAR_RIDE_BIDS") {
    return {
      ...state,
      rideBids: [],
    };
  }
  if (action.type == "SET_IS_RIDE_CANCELLING") {
    return {
      ...state,
      isRideCancelling: action.payload.isRideCancelling,
    };
  }
  if (action.type == "RIDE_CANCEL") {
    return {
      ...state,
      isRideCancelling: false,
      ride: null,
    };
  }
  return state;
};

export const PassengerContext = createContext(null);

export function PassengerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { socketInstance,reconnect } = useSocketContext();

  const router = useRouter();

  const createBooking = (bookingData) => {
    dispatch({
      type: "SET_LOADING",
      payload: {
        isLoading: true,
      },
    });

    socketInstance.once("ride-requests-created", (response) => {
      Alert.alert(response.message);
      dispatch({
        type: "SET_RIDE",
        payload: {
          ride: response.data,
        },
      });

      dispatch({
        type: "SET_RIDE_ID",
        payload: {
          rideId: response.data.id,
        },
      });
    });
    socketInstance.once("ride-request-error", (data) => {
      Alert.alert(data.message);
      dispatch({
        type: "SET_LOADING",
        payload: {
          isLoading: false,
        },
      });
    });

    socketInstance.once("get-ride", (response) => {
      dispatch({
        type: "SET_RIDE",
        payload: {
          ride: response.data,
        },
      });
      if (response.data.status === "ACCEPTED") {

        dispatch({
          type: "SET_LOADING",
          payload: {
            isLoading: false,
          },
        });
        const isFuture = checkTime(response.data.bookingDate,response.data.bookingTime)
        if (!isFuture) {
          router.push("/passengers/booking/captionDetails");
          return;
        }
        else {
          Alert.alert('Your Ride is Booked.');
          reconnect();
          router.push('/passengers/home')
          return;
        }

      }
    });

    socketInstance.once("get-booking", (response) => {
      console.log(response, "booking");
      dispatch({
        type: "SET_BOOKING",
        payload: {
          booking: response.data,
        },
      });
      if (response.data.status === "COMPLETED") {
        console.log(response.data.status, "response.data.status");

        dispatch({
          type: "SET_RIDECOMPLETED",
          payload: {
            isRideCompleted: true,
          },
        });
      }
    });

    socketInstance.once("arrived-at-pickup-passenger", () => {
      console.log('triggred pickup passenger')
      dispatch({
        type: "ARRIVED_AT_PICKUP",
        payload: {
          isArrivedAtPickup: true,
        },
      });
    });

    socketInstance.once("ride-request-error", (data) => {
      Alert.alert(data.message);
    });

    socketInstance.once("new-ride-bid", (response) => {
      dispatch({
        type: "SET_RIDE_BIDS",
        payload: { rideBid: response.data },
      });
    });

    socketInstance.emit("create-ride-request", bookingData);
  };

  const cancelRide = () => {
    dispatch({
      type: "SET_IS_RIDE_CANCELLING",
      payload: {
        isRideCancelling: true,
      },
    });
    dispatch({
      type: "SET_LOADING",
      payload: {
        isLoading: false,
      },
    });
    socketInstance.on("ride-cancel-successfully", (response) => {
      Alert.alert("Ride Cancel Successfully.");
      reconnect();
      dispatch({
        type: "RIDE_CANCEL",
      });
    });
    socketInstance.on("ride-cancel-error", (error) => {
      Alert.alert(error.message);

    });
    return socketInstance.emit("ride-cancel", { id:state?.ride?.id });
  };

  const onDeclineBid = (id) => {
    const filteredBids = state.rideBids.filter((bid) => {
      return bid.id != id;
    });

    dispatch({
      type: "DECLINE_BID",
      payload: {
        rideBids: filteredBids,
      },
    });
  };
  const clearRideBids = () => {
    dispatch({
      type: "CLEAR_RIDE_BIDS",
    });
  };

  return (
    <PassengerContext.Provider
      value={{
        ...state,
        createBooking,
        dispatch,
        onDeclineBid,
        clearRideBids,
        cancelRide,
      }}
    >
      {children}
    </PassengerContext.Provider>
  );
}
