import { useContext } from "react";
import { UserContext } from "./index";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("user Context context must be use inside User Provider.");

  return context;
};
