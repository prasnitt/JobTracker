import { useEffect, useState } from "react";
import { getAllApplications } from "@/api/jobApi";
import { JobApplication } from "@/types/JobApplication";
import JobTable from "@/components/JobTable";
import { AddJobDialog } from "@/components/AddJobDialog";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllApplications();
      setApplications(data);
    } catch (error) {
      toast.error("Failed to fetch Job applications. Please try again.");
      console.error("Error fetching applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content */}
      <main className="flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Job Tracker App</h1>
          <AddJobDialog onJobAdded={fetchApplications} />
        </div>
        <JobTable applications={applications} onJobUpdate={fetchApplications} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
