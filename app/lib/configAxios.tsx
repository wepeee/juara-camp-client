import axios from "axios";

const URI = process.env.NEXT_PUBLIC_DB_URL;

export const axiosInstance = axios.create({
  baseURL: URI,
});
