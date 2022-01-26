<<<<<<< HEAD
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});
=======
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://denarios.herokuapp.com/api',
})
>>>>>>> d83e020cd4f8152b291116efb36f47c77757eaab

export default api;