import axios from "axios";

const instance = axios.create({
  baseURL: "https://pacific-anchorage-10877.herokuapp.com/",
});
export default instance;
