import axios from "axios";

const instance = axios.create({
  baseURL: "https://fir-15bf3.firebaseio.com/",
});
export default instance;
