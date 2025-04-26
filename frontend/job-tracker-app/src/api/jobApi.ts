import axios from 'axios';
import { JobApplication, JobStatus } from '../types/JobApplication';

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

export const getApplicationById = async (id: number): Promise<JobApplication> => {
  const res = await api.get(`/${id}`);
  return res.data;
};

export const updateApplicationStatus = async (id: number, status: JobStatus): Promise<JobApplication> => {
  const res = await api.put(`/${id}/status`, null, {
    params: { status }
  });
  return res.data;
};


// TODO: Add update and delete methods later if needed
