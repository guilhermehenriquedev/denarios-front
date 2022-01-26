import axios from "axios";

const api = axios.create({
  baseURL: "https://denarios.herokuapp.com/",
});

export default api;