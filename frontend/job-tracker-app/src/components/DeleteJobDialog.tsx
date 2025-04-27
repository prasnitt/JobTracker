import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { JobApplication } from "@/types/JobApplication";
import { deleteApplicationById } from "@/api/jobApi"; 
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

interface DeleteJobDialogProps {
  application: JobApplication;
  onDeleted: () => void;
}

export function DeleteJobDialog({ application, onDeleted }: DeleteJobDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await deleteApplicationById(application.id);
      toast.success("Job application deleted successfully!");
      onDeleted();
      setOpen(false);
    } catch (error) {
      const errorMessage = "Failed to delete job application. Please try again.";
      toast.error(errorMessage);
      console.error(errorMessage, error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm"> <Trash2 /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Job application?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this application? This operation can not be reverted.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div><strong>ID:</strong> {application.id}</div>
            <div><strong>Company:</strong> {application.companyName}</div>
            <div><strong>Position:</strong> {application.position}</div>
            <div><strong>Status:</strong> {application.status}</div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} variant="destructive">Delete Job Application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
