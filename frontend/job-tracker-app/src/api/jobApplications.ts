import axios from 'axios';
import { JobApplication } from '../types/JobApplication';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api/JobApplications'
});

export const getAllApplications = async (): Promise<JobApplication[]> => {
  const res = await api.get('/');
  return res.data;
};

export const addApplication = async (job: JobApplication) => {
  const res = await api.post('/', job);
  return res.data;
};

// TODO: Add update and delete methods later if needed
