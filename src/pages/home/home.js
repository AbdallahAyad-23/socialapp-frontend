import React, { useContext, useEffect } from "react";
import axios from "../../utils/axios";
const Home = () => {
  useEffect(() => {
    console.log(axios.defaults);
    axios.get("/posts").then((res) => {
      console.log(res.data);
    });
  }, []);
  return <div></div>;
};

export default Home;
