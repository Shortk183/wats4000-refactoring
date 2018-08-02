//Base APi configuration

import axios from 'axios';

export const API = axios.create({
  baseURL: `//api.openweathermap.org/data/2.5/`
})
API.interceptors.request.use(function (config) {
    // Set common parameters on each request
    config.params.APPID = 'a6f42acfa552ca607329f8ecd18fa126';
    config.params.units = 'imperial';
    return config;
  }, function (error) {
    return Promise.reject(error);
  });