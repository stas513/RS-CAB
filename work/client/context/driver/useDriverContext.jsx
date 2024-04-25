import { useContext } from "react";
import { DriverContext } from "./index";

export const useDriverContext = () => {
  const context = useContext(DriverContext);
  if (!context)
    throw new Error("user Context context must be use inside User Provider.");

  return context;
};
