import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: getBaseUrl(),
  baseURL: 'https://fakestoreapi.com/products',
  headers: {
    'Authorization': 'Bearer your-access-token',
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;
