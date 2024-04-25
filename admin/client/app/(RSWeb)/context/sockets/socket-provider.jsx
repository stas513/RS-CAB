"use client";

import { useEffect, useMemo, useReducer } from "react";
import { SocketContext } from "./socket-context";
import { io as ClientIo } from "socket.io-client";

const initialState = {
  socketInstance: null,
};

const reducer = (state, action) => {
  if (action.type === "setSocketInstance") {
    return {
      socketInstance: action.payload.socketInstance,
    };
  }
  return state;
};

export function SocketProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    const socketInstance = new ClientIo("http://16.16.26.186:8080/");

    socketInstance.on("connect", async () => {
      console.log("connected----");
      await socketInstance.on("get-ride", (data) => {
        console.log(data, "triggred ride by id");
      });
      await socketInstance.on("ride-requests", (data) => {
        console.log(data, "ride-requests");
      });
    });

    dispatch({
      type: "setSocketInstance",
      payload: {
        socketInstance,
      },
    });
  };

  const memoizedValue = useMemo(
    () => ({
      socketInstance: state.socketInstance,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <>
      <SocketContext.Provider value={memoizedValue}>
        {children}
      </SocketContext.Provider>
    </>
  );
}
