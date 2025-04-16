// RCTableEditor.Server/Controllers/TableDataController.cs
using Microsoft.AspNetCore.Mvc;
using RCTableEditor.Server.Services;
using System.Text.Json;

namespace RCTableEditor.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableDataController : ControllerBase
    {
        private readonly ExternalDbService _externalDbService;
        private readonly ILogger<TableDataController> _logger;

        public TableDataController(ExternalDbService externalDbService, ILogger<TableDataController> logger)
        {
            _externalDbService = externalDbService;
            _logger = logger;
        }

        [HttpPost("query")]
        public async Task<ActionResult<object>> QueryTableData([FromBody] QueryRequest request)
        {
            if (request == null || request.ProcessId <= 0 || !request.LayerIds.Any())
            {
                return BadRequest("Process and at least one Layer must be specified");
            }

            try
            {
                var (data, totalCount) = await _externalDbService.QueryTableDataAsync(
                    request.ProcessId,
                    request.LayerIds,
                    request.OperationIds,
                    request.Page,
                    request.PageSize);

                // Calculate total pages
                var totalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize);

                return new
                {
                    items = data,
                    totalCount,
                    page = request.Page,
                    pageSize = request.PageSize,
                    totalPages
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error querying table data: {Message}", ex.Message);
                return StatusCode(500, "An error occurred while querying the data. Please try again.");
            }
        }
    }

    public class QueryRequest
    {
        public string SessionId { get; set; } = string.Empty;
        public int ProcessId { get; set; }
        public List<int> LayerIds { get; set; } = new List<int>();
        public List<int>? OperationIds { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 50;
    }
}