import { createContext, useReducer } from "react";
import { useSocketContext } from "@context/sockets/useSocketContext";

const initialState = {
  requests: [],
  ride: null,
  booking: null,
};

const reducer = (state, action) => {
  if (action.type == "SET_REQUEST") {
    return {
      ...state,
      requests: [action.payload.request, ...state.requests],
    };
  }
  if (action.type == "REMOVE_REQUEST") {
    return {
      ...state,
      requests: action.payload.requests,
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

  if (action.type == "UPDATE_REQUEST") {
    return {
      ...state,
      requests:action.payload.requests
    }
  }

  return state;
};

export const DriverContext = createContext(null);

export function DriverProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { socketInstance } = useSocketContext();
  try {
    socketInstance.once("new-ride-request", (response) => {
      dispatch({
        type: "SET_REQUEST",
        payload: {
          request: response.data,
        },
      });
    });
    socketInstance.once("updated-ride", (response) => {
      console.log('triggred on driver ',response)
      let indexToUpdate = state.requests.findIndex(
        (obj) => obj.id === response.id
      );

      if (indexToUpdate !== -1) {
        const updatedRequests = [
          response.updatedRequest,
          ...state.requests.slice(0, indexToUpdate),
          ...state.requests.slice(indexToUpdate + 1),
        ];

        dispatch({
          type: "UPDATE_REQUEST",
          payload: {
            requests: updatedRequests,
          },
        });

      } else {
        console.log("Object not found in the array");
      }
    });
  } catch (err) {
    console.log(err);
  }
  const onDeclineRequest = (id) => {
    const requests = state.requests.filter((request) => {
      return request.id != id;
    });
    dispatch({
      type: "REMOVE_REQUEST",
      payload: {
        requests,
      },
    });
  };

  return (
    <DriverContext.Provider
      value={{
        ...state,
        onDeclineRequest,
        dispatch,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
}
