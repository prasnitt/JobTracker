using JobTracker.Api.Data;
using JobTracker.Api.Interfaces;
using JobTracker.Api.Models;
using JobTracker.Api.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// CORS configuration
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ConfiguredCors", policy =>
    {
        policy
            .WithOrigins(allowedOrigins!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddHealthChecks();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register DbContext (use SQLite or InMemory here)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=jobtracker.db"));

// Register repo
builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

var app = builder.Build();

app.UseCors("ConfiguredCors");
app.UseSwagger();
app.UseSwaggerUI();

app.UseHealthChecks("/healthy");
app.UseAuthorization();
app.MapControllers();

// Redirect root to Swagger UI
app.MapGet("/", context =>
{
    context.Response.Redirect("/swagger");
    return Task.CompletedTask;
});

// Seed the database if it doesn't exist
if (!File.Exists("jobtracker.db"))
{
    await SeedDatabase();
}
app.Run();


async Task SeedDatabase()
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();

    // Optional seeding
    context.JobApplications.AddRange(new[]
    {
            new JobApplication { CompanyName = "Microsoft", Position = "Backend Dev", DateApplied = DateTime.UtcNow, Status = JobStatus.Applied },
            new JobApplication { CompanyName = "Netflix", Position = "Frontend Dev", DateApplied = DateTime.UtcNow, Status = JobStatus.Interview },
        });
    await context.SaveChangesAsync();

}