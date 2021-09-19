import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost/CreatePost";
import { AuthContext } from "../../store";
import styles from "./home.module.css";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const { state, dispatch } = useContext(AuthContext);

  const comment = (postId) => {};

  useEffect(() => {
    axios.get("/posts").then((res) => {
      dispatch({ type: "SET_POSTS", payload: { posts: res.data.posts } });
    });
  }, []);

  return (
    <div className={styles.home}>
      <CreatePost />
      <ul className={styles.posts}>
        {state.posts &&
          state.posts.map((post) => <Post key={post._id} post={post} />)}
      </ul>
    </div>
  );
};

export default Home;
