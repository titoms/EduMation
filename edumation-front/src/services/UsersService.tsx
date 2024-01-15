// UserService.ts
import axios from 'axios';
import { User } from './Types';

const token = localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/', // Replace with your actual base URL
  withCredentials: false, // This is optional, depends on your backend setup
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default {
  getAllUsers() {
    return apiClient.get<User[]>('/users');
  },
  getUserById(id: string) {
    return apiClient.get<User>(`/users/${id}`);
  },
  createUser(UserData: User) {
    return apiClient.post<User>('/users', UserData);
  },
  updateUser(id: string, UserData: Partial<User>) {
    return apiClient.put<User>(`/users/${id}`, UserData);
  },
  deleteUser(id: string) {
    return apiClient.delete(`/users/${id}`);
  },
};
