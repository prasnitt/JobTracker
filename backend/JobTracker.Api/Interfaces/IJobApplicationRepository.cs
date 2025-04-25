using JobTracker.Api.Models;

namespace JobTracker.Api.Interfaces;

public interface IJobApplicationRepository
{
    Task<List<JobApplication>> GetAllAsync();
    Task<JobApplication?> GetByIdAsync(int id);
    Task<JobApplication> AddAsync(JobApplication app);
    Task SaveChangesAsync();
}
