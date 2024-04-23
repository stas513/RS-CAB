"use client";

import { useEffect, useMemo, useReducer, createContext } from "react";
import { io as ClientIo } from "socket.io-client";

const initialState = {
  socketInstance: null,
};
export const SocketContext = createContext({});

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
    try {
      const socketInstance = await new ClientIo("http://16.171.177.134:8080");

      await socketInstance.on("connect", () => {
        console.log("connect socket.");
      });

      dispatch({
        type: "setSocketInstance",
        payload: {
          socketInstance,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reconnect = () => {
    state.socketInstance.disconnect()
    socketInitializer()
  }

  const memoizedValue = useMemo(
    () => ({
      socketInstance: state.socketInstance,
      dispatch,
      reconnect
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
