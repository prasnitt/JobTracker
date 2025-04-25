using JobTracker.Api.Data;
using JobTracker.Api.Models;
using JobTracker.Api.Repositories;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.Tests;

public class JobApplicationRepositoryTests
{
    private DbContextOptions<AppDbContext> _dbOptions;

    [SetUp]
    public void Setup()
    {
        _dbOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // unique per test
            .Options;
    }

    [Test]
    public async Task AddAsync_ShouldAddJobApplication()
    {
        using var context = new AppDbContext(_dbOptions);
        var repo = new JobApplicationRepository(context);

        var newApp = new JobApplication
        {
            CompanyName = "Google",
            Position = "Software Engineer",
            DateApplied = DateTime.UtcNow,
            Status = JobStatus.Applied
        };

        var result = await repo.AddAsync(newApp);

        Assert.That(result.Id, Is.Not.EqualTo(0));
        Assert.That((await repo.GetAllAsync()).Count, Is.EqualTo(1));
    }

    [Test]
    public async Task GetByIdAsync_ShouldReturnCorrectApplication()
    {
        using var context = new AppDbContext(_dbOptions);
        var repo = new JobApplicationRepository(context);

        var job = new JobApplication
        {
            CompanyName = "Amazon",
            Position = "DevOps Engineer",
            DateApplied = DateTime.UtcNow
        };

        var added = await repo.AddAsync(job);

        var fetched = await repo.GetByIdAsync(added.Id);

        Assert.That(fetched, Is.Not.Null);
        Assert.That(fetched?.CompanyName, Is.EqualTo("Amazon"));
    }

    [Test]
    public async Task GetAllAsync_ShouldReturnAllApplications()
    {
        using var context = new AppDbContext(_dbOptions);
        var repo = new JobApplicationRepository(context);

        var job1 = new JobApplication
        {
            CompanyName = "Tesla",
            Position = "Automation Engineer",
            DateApplied = DateTime.UtcNow,
            Status = JobStatus.Applied
        };

        var job2 = new JobApplication
        {
            CompanyName = "SpaceX",
            Position = "Rocket Scientist",
            DateApplied = DateTime.UtcNow,
            Status = JobStatus.Interview
        };

        await repo.AddAsync(job1);
        await repo.AddAsync(job2);

        var allJobs = await repo.GetAllAsync();

        Assert.That(allJobs.Count, Is.EqualTo(2));
        Assert.That(allJobs.Any(j => j.CompanyName == "Tesla"), Is.True);
        Assert.That(allJobs.Any(j => j.CompanyName == "SpaceX"), Is.True);
    }
}