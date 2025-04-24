using JobTracker.Api.Data;
using JobTracker.Api.Interfaces;
using JobTracker.Api.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

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

app.UseSwagger();
app.UseSwaggerUI();


app.UseAuthorization();
app.MapControllers();
app.Run();
