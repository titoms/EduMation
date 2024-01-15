// courseservice.ts
import axios from 'axios';
import { Course } from './Types';

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
  getAllCourses() {
    return apiClient.get<Course[]>('/courses');
  },
  getCoursesById(id: string) {
    return apiClient.get<Course>(`/courses/${id}`);
  },
  createCourses(CoursesData: Course) {
    return apiClient.post<Course>('/courses', CoursesData);
  },
  updateCourses(id: string, CoursesData: Partial<Course>) {
    return apiClient.put<Course>(`/courses/${id}`, CoursesData);
  },
  deleteCourses(id: string) {
    return apiClient.delete(`/courses/${id}`);
  },
};
