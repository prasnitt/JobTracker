import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addApplication } from "@/api/jobApi"; 
import { JobStatus } from "@/types/JobApplication";
import { toast } from "sonner"

interface AddJobDialogProps {
  onJobAdded: () => void; // callback after successful add
}

export function AddJobDialog({ onJobAdded }: AddJobDialogProps) {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!companyName || !position) {
      setError("Company Name and Position are required.");
      return;
    }
    try {
      await addApplication({
        companyName,
        position,
        status
      });
      setCompanyName("");
      setPosition("");
      setStatus("Applied");
      setError("");
      toast.success("Job added successfully!");
      onJobAdded(); // tell parent to reload the table
    } catch {
        const errorMessage = "Failed to add job. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Job</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
        </DialogHeader>

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Company Name</Label>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Position</Label>
            <Input value={position} onChange={(e) => setPosition(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as JobStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit}>Add Job</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
