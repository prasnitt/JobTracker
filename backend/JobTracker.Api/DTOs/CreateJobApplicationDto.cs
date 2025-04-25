using System.ComponentModel.DataAnnotations;

namespace JobTracker.Api.DTOs;

public class CreateJobApplicationDto
{
    [Required]
    public string CompanyName { get; set; } = string.Empty;
    [Required]
    public string Position { get; set; } = string.Empty;

    public string? Status { get; set; } = "Applied";

    public DateTime? DateApplied { get; set; }
}
