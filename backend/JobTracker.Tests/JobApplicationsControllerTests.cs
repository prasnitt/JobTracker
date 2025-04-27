using JobTracker.Api.DTOs;
using JobTracker.Api.Interfaces;
using JobTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace JobTracker.Tests;

[TestFixture]
public class JobApplicationsControllerTests
{
    private Mock<IJobApplicationRepository> _repositoryMock;
    private JobApplicationsController _controller;

    [SetUp]
    public void SetUp()
    {
        _repositoryMock = new Mock<IJobApplicationRepository>();
        _controller = new JobApplicationsController(_repositoryMock.Object);
    }

    [Test]
    public async Task GetAll_ReturnsOkWithApplications()
    {
        // Arrange
        var applications = new List<JobApplication>
            {
                new JobApplication { Id = 1, CompanyName = "Company A", Position = "Developer", Status = JobStatus.Applied },
                new JobApplication { Id = 2, CompanyName = "Company B", Position = "Tester", Status = JobStatus.Interview }
            };
        _repositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(applications);

        // Act
        var result = await _controller.GetAll();

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var applicationDtos = okResult.Value as List<JobApplicationDto>;
        Assert.AreEqual(2, applicationDtos.Count);
    }

    [Test]
    public async Task GetById_ExistingId_ReturnsOkWithApplication()
    {
        // Arrange
        var application = new JobApplication { Id = 1, CompanyName = "Company A", Position = "Developer", Status = JobStatus.Applied };
        _repositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(application);

        // Act
        var result = await _controller.GetById(1);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var applicationDto = okResult.Value as JobApplicationDto;
        Assert.AreEqual("Company A", applicationDto.CompanyName);
    }

    [Test]
    public async Task GetById_NonExistingId_ReturnsNotFound()
    {
        // Arrange
        _repositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((JobApplication)null);

        // Act
        var result = await _controller.GetById(1);

        // Assert
        Assert.IsInstanceOf<NotFoundResult>(result);
    }

    [Test]
    public async Task Add_ValidApplication_ReturnsCreatedAtAction()
    {
        // Arrange
        var createDto = new CreateJobApplicationDto
        {
            CompanyName = "Company A",
            Position = "Developer",
            Status = "Applied",
            DateApplied = DateTime.Now
        };

        var application = JobApplication.FromDto(createDto);
        application.Id = 1;

        _repositoryMock.Setup(repo => repo.AddAsync(It.IsAny<JobApplication>())).ReturnsAsync(application);

        // Act
        var result = await _controller.Add(createDto);

        // Assert
        var createdResult = result as CreatedAtActionResult;
        Assert.IsNotNull(createdResult);
        Assert.AreEqual(nameof(_controller.GetById), createdResult.ActionName);
    }

    [Test]
    public async Task Add_InvalidStatus_ReturnBadStatus()
    {
        // Arrange
        var createDto = new CreateJobApplicationDto
        {
            CompanyName = "Company A",
            Position = "Developer",
            Status = "InvalidStatus",
            DateApplied = DateTime.Now
        };

        // Act
        var result = await _controller.Add(createDto);
        // Assert
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
    }

    [Test]
    public async Task Add_InvalidModelState_ReturnsBadRequest()
    {
        // Arrange
        _controller.ModelState.AddModelError("CompanyName", "Required");

        var createDto = new CreateJobApplicationDto
        {
            Position = "Developer",
            Status = "Applied",
            DateApplied = DateTime.Now
        };

        // Act
        var result = await _controller.Add(createDto);

        // Assert
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
    }

    [Test]
    public async Task UpdateStatus_ValidIdAndStatus_ReturnsOk()
    {
        // Arrange
        var application = new JobApplication { Id = 1, CompanyName = "Company A", Position = "Developer", Status = JobStatus.Applied };

        _repositoryMock.Setup(repo => repo.UpdateStatusAsync(1, "Applied")).ReturnsAsync(application);

        // Act
        var result = await _controller.UpdateStatus(1, "Applied");

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var applicationDto = okResult.Value as JobApplicationDto;
        Assert.AreEqual("Applied", applicationDto.Status);
    }

    [Test]
    public async Task UpdateStatus_InvalidId_ReturnsNotFound()
    {
        // Arrange
        _repositoryMock.Setup(repo => repo.UpdateStatusAsync(1, "Applied")).ReturnsAsync((JobApplication)null);

        // Act
        var result = await _controller.UpdateStatus(1, "Applied");

        // Assert
        Assert.IsInstanceOf<NotFoundResult>(result);
    }

    [Test]
    public async Task UpdateStatus_InvalidModelState_ReturnsBadRequest()
    {
        // Arrange
        _repositoryMock.Setup(repo => repo.UpdateStatusAsync(1, "InvalidStatus")).Throws(new ArgumentException("Invalid status"));

        // Act
        var result = await _controller.UpdateStatus(1, "InvalidStatus");

        // Assert
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
    }

    [Test]
    public async Task DeleteById_ExistingId_ReturnsOk()
    {
        // Arrange
        _repositoryMock.Setup(repo => repo.DeleteAsync(1)).ReturnsAsync(true);

        // Act
        var result = await _controller.DeleteById(1);

        // Assert
        Assert.IsInstanceOf<OkResult>(result);
    }

    [Test]
    public async Task DeleteById_NonExistingId_ReturnsNotFound()
    {
        // Arrange
        _repositoryMock.Setup(repo => repo.DeleteAsync(1)).ReturnsAsync(false);

        // Act
        var result = await _controller.DeleteById(1);

        // Assert
        Assert.IsInstanceOf<NotFoundResult>(result);
    }
}