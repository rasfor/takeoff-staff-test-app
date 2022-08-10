import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export const authApi = {
  login(payload: object) {
    return instance.post(`/login`, payload);
  },
  logout() {
    return instance.delete('/login');
  },
  getCurrentUser() {
    return instance.get(`users/login`);
  }
};


