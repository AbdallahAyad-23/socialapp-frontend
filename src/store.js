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
    case "setPosts":
      return {
        ...state,
        posts: action.payload.posts,
      };
    case "setUser":
      return {
        ...state,
        user: action.payload.user,
      };
    case "like":
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
    case "unlike":
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
