// filepath: backend/JobTracker.Api/Controllers/JobApplicationsController.cs
using JobTracker.Api.Interfaces;
using JobTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class JobApplicationsController : ControllerBase
{
    private readonly IJobApplicationRepository _repository;

    public JobApplicationsController(IJobApplicationRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var applications = await _repository.GetAllAsync();
        return Ok(applications);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var application = await _repository.GetByIdAsync(id);
        if (application == null)
            return NotFound();
        return Ok(application);
    }

    [HttpPost]
    public async Task<IActionResult> Add(JobApplication application)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var addedApplication = await _repository.AddAsync(application);
        return CreatedAtAction(nameof(GetById), new { id = addedApplication.Id }, addedApplication);
    }
}