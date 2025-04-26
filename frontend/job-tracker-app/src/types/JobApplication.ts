export const jobStatuses = ["Applied", "Interview", "Offer", "Rejected"] as const;
export type JobStatus = typeof jobStatuses[number];
export interface JobApplication {
  id: number;
  companyName: string;
  position: string;
  status: JobStatus;
  dateApplied?: string;
}