// filepath: backend/JobTracker.Api/Controllers/JobApplicationsController.cs
using JobTracker.Api.DTOs;
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

    /// <summary>
    ///  Get All Job Applications
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var applications = await _repository.GetAllAsync();
        var applicationDtos = applications.Select(a => a.ToDto()).ToList();

        return Ok(applicationDtos);
    }

    /// <summary>
    /// Get Job Application by Id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var application = await _repository.GetByIdAsync(id);
        if (application == null)
            return NotFound();
        return Ok(application.ToDto());
    }

    /// <summary>
    /// Add a new Job Application
    /// </summary>
    /// <param name="applicationDto"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> Add(CreateJobApplicationDto applicationDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var application = JobApplication.FromDto(applicationDto);
            var addedApplication = await _repository.AddAsync(application);
            return CreatedAtAction(nameof(GetById), new { id = addedApplication.Id }, addedApplication.ToDto());
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    ///  Delete a Job Application by Id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id}")]

    public async Task<IActionResult> DeleteById(int id)
    {
        var deleted = await _repository.DeleteAsync(id);
        if (!deleted)
            return NotFound();
        return Ok();
    }


    /// <summary>
    /// Update an existing Job Application's status
    /// </summary>
    /// <param name="id"></param>
    /// <param name="status"></param>
    /// <returns></returns>
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, string status)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var application = await _repository.UpdateStatusAsync(id, status);
            if (application == null)
                return NotFound();

            return Ok(application.ToDto());
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

}