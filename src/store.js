import { createContext } from "react";
import axios from "./utils/axios";
export const AuthContext = createContext();

export const intialState = {
  isAuth: false,
  token: null,
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
      };

    case "intial":
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
      };

    case "logout":
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        token: "",
      };
    default:
      return state;
  }
};
