// quizervice.ts
import axios from 'axios';
import { Quiz } from './Types';

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
  getAllQuizz() {
    return apiClient.get<Quiz[]>('/quizz');
  },
  getQuizzById(id: string) {
    return apiClient.get<Quiz>(`/quizz/${id}`);
  },
  createQuizz(QuizzData: Quiz) {
    return apiClient.post<Quiz>('/quizz', QuizzData);
  },
  updateQuizz(id: string, QuizzData: Partial<Quiz>) {
    return apiClient.put<Quiz>(`/quizz/${id}`, QuizzData);
  },
  deleteQuizz(id: string) {
    return apiClient.delete(`/quizz/${id}`);
  },
};
