using JobTracker.Api.Models;

namespace JobTracker.Api.Interfaces;

public interface IJobApplicationRepository
{
    Task<List<JobApplication>> GetAllAsync();
    Task<JobApplication?> GetByIdAsync(int id);
    Task<JobApplication> AddAsync(JobApplication app);
    Task<bool> DeleteAsync(int id);
    Task<JobApplication> UpdateStatusAsync(int id, string status);
    Task SaveChangesAsync();
}
