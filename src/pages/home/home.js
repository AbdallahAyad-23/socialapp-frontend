import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import Post from "../../components/Post/Post";

import styles from "./home.module.css";

const Home = () => {
  const [posts, setPosts] = useState(null);

  const like = (postId) => {
    axios.post(`/posts/${postId}/likes`).then((res) => {
      setPosts((prevPosts) => {
        let newPosts = prevPosts.map((post) => {
          if (post._id == res.data.postId) {
            return {
              ...post,
              likesCount: post.likesCount + 1,
            };
          }
          return post;
        });
        return newPosts;
      });
    });
  };

  const unlike = (postId) => {
    axios.delete(`/posts/${postId}/likes`).then((res) => {
      setPosts((prevPosts) => {
        let newPosts = prevPosts.map((post) => {
          if (post._id == res.data.postId) {
            return {
              ...post,
              likesCount: post.likesCount - 1,
            };
          }
          return post;
        });
        return newPosts;
      });
    });
  };

  const comment = (postId) => {};

  useEffect(() => {
    axios.get("/posts").then((res) => {
      console.log(res.data.posts);
      setPosts(res.data.posts);
    });
  }, []);
  return (
    <div className={styles.home}>
      <ul className={styles.posts}>
        {posts &&
          posts.map((post) => <Post key={post._id} post={post} like={like} />)}
      </ul>
    </div>
  );
};

export default Home;
