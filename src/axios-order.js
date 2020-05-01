import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-69519.firebaseio.com/",
});
export default instance;
