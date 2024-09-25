import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/alumni', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;