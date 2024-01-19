// courseservice.ts
import axios from 'axios';
import { Group } from './Types';

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
  getAllGroups() {
    return apiClient.get<Group[]>('/groups');
  },
  getGroupById(id: string) {
    return apiClient.get<Group>(`/groups/${id}`);
  },
  createGroup(GroupsData: Group) {
    return apiClient.post<Group>('/groups', GroupsData);
  },
  updateGroup(id: string, GroupsData: Partial<Group>) {
    return apiClient.put<Group>(`/groups/${id}`, GroupsData);
  },
  deleteGroup(id: string) {
    return apiClient.delete(`/groups/${id}`);
  },
};
