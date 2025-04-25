namespace JobTracker.Api.DTOs;

public class JobApplicationDto
{
    public int Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Status { get; set; }
    public DateTime DateApplied { get; set; }
}
