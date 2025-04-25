using JobTracker.Api.DTOs;

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

    public static JobApplication FromDto(CreateJobApplicationDto dto)
    {
        if (dto == null)
            throw new ArgumentException(nameof(dto));

        JobStatus parsedStatus;

        if (!Enum.TryParse<JobStatus>(dto.Status ?? string.Empty, true, out parsedStatus))
        {
            // Throw exception invalid status
            throw new ArgumentException($"Invalid status: {dto.Status}", nameof(dto.Status));
        }

        return new JobApplication
        {
            CompanyName = dto.CompanyName,
            Position = dto.Position,
            Status = parsedStatus,
            DateApplied = dto.DateApplied ?? DateTime.Now,
        };
    }

    public JobApplicationDto ToDto()
    {
        return new JobApplicationDto
        {
            Id = Id,
            CompanyName = CompanyName,
            Position = Position,
            Status = Status.ToString(),
            DateApplied = DateApplied
        };
    }
}
