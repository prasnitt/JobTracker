import { useEffect, useState } from "react";
import { getAllApplications } from "@/api/jobApi";
import { JobApplication } from "@/types/JobApplication";
import JobTable from "@/components/JobTable";
import { AddJobDialog } from "@/components/AddJobDialog";

function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllApplications();
      setApplications(data);
    } catch (error) {
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job Tracker App</h1>
        <AddJobDialog onJobAdded={fetchApplications} />
      </div>
      <JobTable applications={applications} />
    </div>
  );
}

export default Home;
