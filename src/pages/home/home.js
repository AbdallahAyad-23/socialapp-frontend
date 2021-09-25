import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost/CreatePost";
import { AuthContext } from "../../store";
import styles from "./home.module.css";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";
const Home = () => {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    axios.get("/posts").then((res) => {
      dispatch({ type: "SET_POSTS", payload: { posts: res.data.posts } });
    });
  }, []);

  return (
    <div className={styles.home}>
      <CreatePost />
      <ul className={styles.posts}>
        {state.posts
          ? state.posts
              .sort(function (a, b) {
                return a.createdAt < b.createdAt
                  ? 1
                  : a.createdAt > b.createdAt
                  ? -1
                  : 0;
              })
              .map((post) => <Post key={post._id} post={post} />)
          : Array(5)
              .fill(0)
              .map((_) => <PostSkeleton />)}
      </ul>
    </div>
  );
};

export default Home;
