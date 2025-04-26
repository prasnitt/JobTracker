export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface JobApplication {
  id?: number;
  companyName: string;
  position: string;
  status: JobStatus;
  dateApplied: string;
}