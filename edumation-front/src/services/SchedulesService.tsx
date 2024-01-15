// scheduleService.ts
import axios from 'axios';
import { Schedule } from './Types';

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
  getAllSchedules() {
    return apiClient.get<Schedule[]>('/schedules');
  },
  getScheduleById(id: string) {
    return apiClient.get<Schedule>(`/schedules/${id}`);
  },
  createSchedule(scheduleData: Schedule) {
    return apiClient.post<Schedule>('/schedules', scheduleData);
  },
  updateSchedule(id: string, scheduleData: Partial<Schedule>) {
    return apiClient.put<Schedule>(`/schedules/${id}`, scheduleData);
  },
  deleteSchedule(id: string) {
    return apiClient.delete(`/schedules/${id}`);
  },
};
