import { useContext } from "react";
import { SocketContext } from "./index";

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("user Context context must be use inside User Provider.");

  return context;
};
