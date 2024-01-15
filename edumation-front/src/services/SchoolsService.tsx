// Schoolservice.ts
import axios from 'axios';
import { School } from './Types';

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
  getAllSchools() {
    return apiClient.get<School[]>('/schools');
  },
  getSchoolsById(id: string) {
    return apiClient.get<School>(`/schools/${id}`);
  },
  createSchools(SchoolsData: School) {
    return apiClient.post<School>('/schools', SchoolsData);
  },
  updateSchools(id: string, SchoolsData: Partial<School>) {
    return apiClient.put<School>(`/schools/${id}`, SchoolsData);
  },
  deleteSchools(id: string) {
    return apiClient.delete(`/schools/${id}`);
  },
};
