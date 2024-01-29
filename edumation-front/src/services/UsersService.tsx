// UserService.ts
import axios from 'axios';
import { User } from './Types';

interface LoginCredentials {
  email: string;
  password: string;
}

const token = localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/', // Replace with your actual base URL
  withCredentials: false, // This is optional, depends on your backend setup
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
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
    return apiClient.post<User>('/users/register', UserData);
  },
  logIn(credentials: LoginCredentials) {
    return apiClient.post('/users/login', credentials);
  },
  updateUser(id: string, UserData: Partial<User> | FormData) {
    return apiClient.put<User>(`/users/${id}`, UserData);
  },
  deleteUser(id: string) {
    return apiClient.delete(`/users/${id}`);
  },
};
