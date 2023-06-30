import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://streamer-spotlight-back-v2-e53ca344e263.herokuapp.com/',
});
