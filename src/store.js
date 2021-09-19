import { createContext } from "react";
import axios from "./utils/axios";
export const AuthContext = createContext();

export const intialState = {
  isAuth: false,
  token: null,
  user: null,
  posts: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
      };

    case "INTIAL":
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id != action.payload.id),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LIKE":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id == action.payload.id) {
            return {
              ...post,
              likesCount: post.likesCount + 1,
            };
          }
          return post;
        }),
      };
    case "UNLIKE":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id == action.payload.id) {
            return {
              ...post,
              likesCount: post.likesCount - 1,
            };
          }
          return post;
        }),
      };
    case "LOGOUT":
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
