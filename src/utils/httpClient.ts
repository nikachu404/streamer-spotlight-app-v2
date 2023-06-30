import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://streamer-spotlight-back-95f965b24996.herokuapp.com/',
});
