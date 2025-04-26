import { jobStatuses, JobStatus } from "@/types/JobApplication";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusSelectProps {
  value: JobStatus;
  onChange: (value: JobStatus) => void;
  disabled?: boolean;
}

export function StatusSelect({ value, onChange, disabled = false }: StatusSelectProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as JobStatus)} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {jobStatuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
