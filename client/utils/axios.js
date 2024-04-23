import axios from 'axios';


const axiosInstance = axios.create({ baseURL: 'https://rsadmin.vercel.app' });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>{
   console.log(error,'error from axios')
   return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )}
);

export default axiosInstance;
