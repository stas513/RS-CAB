import { useContext } from "react";
import { PassengerContext } from "./index";

export const usePassengerContext = () => {
  const context = useContext(PassengerContext);
  if (!context)
    throw new Error("user Context context must be use inside User Provider.");

  return context;
};
