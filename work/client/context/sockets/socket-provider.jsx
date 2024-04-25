'use client';

import { useEffect, useMemo, useReducer } from 'react';
import { SocketContext } from './socket-context';
import { io as ClientIo } from "socket.io-client";

const initialState = {
  socketInstance:null
};

const reducer = (state, action) => {
  if (action.type === 'setSocketInstance') {
    return {
      socketInstance: action.payload.socketInstance,
    };
  }
  return state;
};


export function SocketProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.socketInstance){
      socketInitializer()
    }
  }, []);

  const socketInitializer = async () => {
   const socketInstance = new ClientIo("http://16.171.177.134:8080");

    socketInstance.on("connect", () => {
      console.log("connected");
    });

    dispatch({
      type:"setSocketInstance",
      payload:{
        socketInstance
      }
    })
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

      <SocketContext.Provider value={memoizedValue} >
        {children}
      </SocketContext.Provider>
    </>
  );
}

