using JobTracker.Api.Data;
using JobTracker.Api.Interfaces;
using JobTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.Api.Repositories;

public class JobApplicationRepository : IJobApplicationRepository
{
    private readonly AppDbContext _context;

    public JobApplicationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<JobApplication>> GetAllAsync()
    {
        return await _context.JobApplications.ToListAsync();
    }

    public async Task<JobApplication?> GetByIdAsync(int id)
    {
        return await _context.JobApplications.FindAsync(id);
    }

    public async Task<JobApplication> AddAsync(JobApplication app)
    {
        _context.JobApplications.Add(app);
        await SaveChangesAsync();
        return app;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
