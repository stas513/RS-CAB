import { createContext, useReducer, useCallback } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const initialState = {
  mode: null,
  user: null,
  isLoading: true,
  AuthenticationEmail: null,
  isAuthentated: false,
  AuthenticationUser: null,
  userCurLocDetails: {
    cordinates: [],
  },
};

const reducer = (state, action) => {
  if (action.type === "SET_USER_MODE") {
    return {
      ...state,
      mode: action.payload.mode,
    };
  }

  if (action.type === "USER_LOCATION_DETAIL") {
    return {
      ...state,
      userCurLocDetails: {
        ...state.userCurLocDetails,
        ...action.payload.userCurLocDetails,
      },
    };
  }

  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload.user,
      isAuthentated: true,
    };
  }

  if (action.type === "setUser") {
    return {
      ...state,
      user: action.payload.user,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthentated: false,
      user: null,
    };
  }

  if (action.type === "setPassengerInUser") {
    return {
      ...state,
      user: { ...state.user, passenger: action.payload.passenger },
    };
  }

  if (action.type === "setDriverInUser") {
    return {
      ...state,
      user: { ...state.user, driver: action.payload.driver },
    };
  }

  if (action.type === "SET_AUTHENTICATION_EMAIL") {
    return {
      ...state,
      AuthenticationEmail: action.payload.AuthenticationEmail,
    };
  }

  if (action.type === "SET_AUTHENTICATION_USER") {
    return {
      ...state,
      AuthenticationUser: action.payload.AuthenticationUser,
    };
  }

  if (action.type === "SET_ISAUTHENTICATION_USER") {
    return {
      ...state,
      isAuthentated: action.payload.isAuthentated,
    };
  }

  if (action.type === "SET_IS_LOADING") {
    return {
      ...state,
      isLoading: action.payload.isLoading,
    };
  }

  return state;
};

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const initialize = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem("user-data");
      if (accessToken) {
        const user = jwtDecode(accessToken);

        const response = await axios.post(
          `https://rsadmin.vercel.app/api/users/info/`,
          {
            cognitoUserName: user.cognitoUserName,
          }
        );

        const decodedUser = jwtDecode(response?.data?.token);

        dispatch({
          type: "LOGIN",
          payload: {
            user: decodedUser,
          },
        });
        if (!decodedUser.passenger && !decodedUser.driver) {
          Alert.alert("User Not Have Passenger or Driver profile");
          return router.push("/user&Captain");
        } else if (!decodedUser.passenger && decodedUser.driver) {
          return router.push("/drivers");
        } else {
          return router.push("/getStarted");
        }
      }
    } catch (error) {
      console.log(error);
      // Alert.alert(error.message);
    } finally {
      dispatch({
        type: "SET_IS_LOADING",
        payload: {
          isLoading: false,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const updateUserCurLocDetails = (userCurLocDetails) => {
    dispatch({
      type: "USER_LOCATION_DETAIL",
      payload: { userCurLocDetails: userCurLocDetails },
    });
  };

  const login = async (data, setLoading, isSocialLogin) => {
    try {
      const response = isSocialLogin
        ? await axios.post(`https://rsadmin.vercel.app/api/users/info/email`, {
            email: data,
          })
        : await axios.post(`https://rsadmin.vercel.app/api/users/info/`, {
            cognitoUserName: data,
          });
      const decodedUser = jwtDecode(response?.data?.token);
      dispatch({
        type: "LOGIN",
        payload: {
          user: decodedUser,
        },
      });
      await AsyncStorage.setItem("user-data", response?.data?.token);
      setLoading(false);

      if (state.mode === "driver" && decodedUser.driver) {
        return router.push("/drivers");
      }

      if (state.mode == "user" && decodedUser.passenger) {
        return router.push("/getStarted");
      }

      Alert.alert(`${state.mode.toUpperCase()} Profile Doesn't Exits`);
    } catch (err) {
      console.log(err);
    }
  };

  const setMode = (mode) => {
    dispatch({ type: "SET_USER_MODE", payload: { mode: mode } });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
        setMode,
        updateUserCurLocDetails,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
