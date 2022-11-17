import axios from "axios";

const restClient = axios.create({
  baseURL: process.env.BASE_API_URL,
});

export default restClient;
