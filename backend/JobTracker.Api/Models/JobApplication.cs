namespace JobTracker.Api.Models;

public enum JobStatus
{
    Applied,
    Interview,
    Offer,
    Rejected
}

public class JobApplication
{
    public int Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public JobStatus Status { get; set; } = JobStatus.Applied;
    public DateTime DateApplied { get; set; }
}
