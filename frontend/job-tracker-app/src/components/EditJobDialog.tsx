import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusSelect } from "@/components/StatusSelect";
import { JobApplication } from "@/types/JobApplication";
import { updateApplicationStatus } from "@/api/jobApi"; 
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { Pencil } from "lucide-react"

interface EditJobDialogProps {
  application: JobApplication;
  onStatusUpdated: () => void;
}

export function EditJobDialog({ application, onStatusUpdated }: EditJobDialogProps) {
  const [status, setStatus] = useState(application.status);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await updateApplicationStatus(application.id, status);
      toast.success("Job status updated successfully!");
      onStatusUpdated();
      setOpen(false);
    } catch (error) {
      const errorMessage = "Failed to update job status. Please try again.";
      toast.error(errorMessage);
      console.error(errorMessage, error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm"> <Pencil /> Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Job Status</DialogTitle>
          <DialogDescription>
            Update the status of your job application.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div><strong>ID:</strong> {application.id}</div>
            <div><strong>Company:</strong> {application.companyName}</div>
            <div><strong>Position:</strong> {application.position}</div>
          </div>

          <div className="space-y-4">
            <Label>Status</Label>      <StatusSelect value={status} onChange={setStatus} />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
