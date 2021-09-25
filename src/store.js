import { createContext } from "react";
import axios from "./utils/axios";
export const AuthContext = createContext();

export const intialState = {
  isAuth: false,
  token: null,
  user: null,
  posts: null,
  requests: null,
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
    case "EDIT_POST":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id == action.payload.newPost._id) {
            return action.payload.newPost;
          }
          return post;
        }),
      };
    case "NEW_PROFILE":
      return {
        ...state,
        user: { ...state.user, imageUrl: action.payload.newProfileImg },
      };
    case "UPDATE_POSTS":
      return {
        ...state,
        posts: state.posts.map((post) => ({ ...post, userId: state.user })),
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
    case "SET_REQUESTS":
      return {
        ...state,
        requests: action.payload.friendRequests,
      };
    case "UPDATE_REQUESTS":
      return {
        ...state,
        requests: state.requests.filter(
          (request) =>
            request._id.toString() !== action.payload.requestId.toString()
        ),
      };
    case "ACCEPT_REQUEST":
      return {
        ...state,
        requests: state.requests.map((request) => {
          if (request._id.toString() !== action.payload.requestId.toString()) {
            return request;
          }
          return { ...request, status: 3 };
        }),
      };
    case "ADD_FRIEND":
      return {
        ...state,
        requests: [...state.requests, action.payload.request],
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
        user: null,
        posts: null,
      };
    default:
      return state;
  }
};
