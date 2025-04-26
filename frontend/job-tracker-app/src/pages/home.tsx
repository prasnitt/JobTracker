import { useEffect, useState } from "react";
import { getAllApplications } from "@/api/jobApi";
import { JobApplication } from "@/types/JobApplication";
import JobTable from "@/components/JobTable";

function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllApplications()
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        console.error("Error fetching applications", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Tracker App</h1>
      <JobTable applications={applications} />
    </div>
  );
}

export default Home