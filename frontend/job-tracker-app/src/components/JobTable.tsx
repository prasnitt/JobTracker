import { JobApplication } from "@/types/JobApplication";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {EditJobDialog} from "@/components/EditJobDialog";
import { formatDate } from "@/utils/dateUtils";

interface JobTableProps {
  applications: JobApplication[];
  onJobEdit: () => void;
}

export default function JobTable({ applications, onJobEdit }: JobTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.id}</TableCell>
              <TableCell>{app.companyName}</TableCell>
              <TableCell>{app.position}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{formatDate(app.dateApplied)}</TableCell>
              <TableCell>
                <EditJobDialog application={app} onStatusUpdated={onJobEdit} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
