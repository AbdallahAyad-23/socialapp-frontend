import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import Navbar from "../../components/Navbar/Navbar";
const Home = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    console.log(axios.defaults);
    axios.get("/posts").then((res) => {
      setPosts(res.data.posts);
    });
  }, []);
  return <ul>{posts && posts.map((post) => <li>{post.content}</li>)}</ul>;
};

export default Home;
