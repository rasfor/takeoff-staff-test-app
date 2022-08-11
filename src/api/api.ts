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

export const contactsApi = {
  addContact(payload: object) {
    return instance.post(`/contacts`, payload);
  },
  deleteContact(id: number) {
    return instance.delete(`/contacts/${id}`);
  },
  getUserContacts() {
    return instance.get(`/contacts`);
  },
  updateContact(id: number, data: object) {
    return instance.put(`/contacts/${id}`, data);
  }
};


