"use client";

import { useMemo, useReducer } from "react";
import { AuthContext } from "./auth-context";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";
import { signOut } from "next-auth/react";

const initialState = {
  email: null,
  user: null,
  authenticateUser: null,
  mode: null,
  forgetPasswordEmail: null
};

const reducer = (state, action) => {
  if (action.type === "setEmail") {
    return {
      ...state,
      email: action.payload.email,
    };
  }
  if (action.type === "setUser") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'setDriverInUser') {
    return {
      ...state,
      user: { ...state.user, driver: action.payload.driver },
    };
  }
  if (action.type === 'setPassengerInUser') {
    console.log(state)
    return {
      ...state,
      user: { ...state.user, passenger: action.payload.passenger },
    };
  }
  if (action.type === 'setForgetPasswordEmail') {
    console.log(state)
    return {
      ...state,
      forgetPasswordEmail: action.payload.forgetPasswordEmail
    };
  }
  if (action.type === 'setMode') {
    return {
      ...state,
      mode: action.payload.mode,
    };
  }
  if (action.type === 'logout') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === "setAuthenticateUser") {
    return {
      ...state,
      authenticateUser: action.payload.authenticateUser,
    };
  }
  return state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { replace } = useRouter();

  const setUser = (token) => {
    const user = jwtDecode(token);
    dispatch({ type: "setUser", payload: { user } });
  };

  const logout = async () => {
    dispatch({ type: "logout" });
    await signOut({
      redirect: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/home`,
      callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/home`,
    });
    replace("/home/");
  };

  const memoizedValue = useMemo(
    () => ({
      email: state.email,
      user: state.user,
      authenticateUser: state.authenticateUser,
      mode: state.mode,
      forgetPasswordEmail: state.forgetPasswordEmail,
      dispatch,
      setUser,
      logout,
    }),
    [state, dispatch]
  );

  return (
    <>
      <AuthContext.Provider value={memoizedValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
