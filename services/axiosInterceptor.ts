import axios from 'axios';
import { getSession } from 'next-auth/react';

axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.accessToken;

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axios;
