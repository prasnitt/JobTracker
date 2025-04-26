import { useEffect, useState } from "react";
import { JobApplication } from "@/types/JobApplication";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditJobDialog } from "@/components/EditJobDialog";
import { formatDate } from "@/utils/dateUtils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobTableProps {
  applications: JobApplication[];
  onJobEdit: () => void;
}

export default function JobTable({ applications, onJobEdit }: JobTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.max(1, Math.ceil(applications.length / itemsPerPage));

  // Adjust currentPage if applications.length changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages); // Adjust to the last valid page
    } else if (applications.length === 0) {
      setCurrentPage(1); // Reset to the first page if no applications
    }
  }, [applications.length, totalPages, currentPage]);

  const paginatedApps = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

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
          {paginatedApps.map((app) => (
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-between p-4 flex-wrap gap-4">
        <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Items per page:</span>
          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
