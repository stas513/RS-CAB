import { useContext } from "react";
import { BookingContext } from "./index";

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error("user Context context must be use inside User Provider.");

  return context;
};
