using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RCTableEditor.Server.Data;
using RCTableEditor.Server.Models;
using System.Text.Json;

namespace RCTableEditor.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableDataController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TableDataController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("query")]
        public async Task<ActionResult<object>> QueryTableData([FromBody] QueryRequest request)
        {
            if (request == null || request.ProcessId <= 0 || !request.LayerIds.Any())
            {
                return BadRequest("Process and at least one Layer must be specified");
            }

            var query = _context.TableData
                .Where(t => t.ProcessId == request.ProcessId &&
                            request.LayerIds.Contains(t.LayerId) &&
                            !t.IsDeleted);

            // Apply operation filter if provided
            if (request.OperationIds != null && request.OperationIds.Any())
            {
                query = query.Where(t => request.OperationIds.Contains(t.OperationId));
            }

            // Count total records for pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var pageSize = request.PageSize > 0 ? request.PageSize : 50;
            var pageNumber = request.Page > 0 ? request.Page : 1;

            var items = await query
                .OrderBy(t => t.LayerId)
                .ThenBy(t => t.OperationId)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            return new
            {
                items,
                totalCount,
                page = pageNumber,
                pageSize,
                totalPages
            };
        }

        // Other endpoints will be added later (get by ID, save changes, etc.)
    }

    public class QueryRequest
    {
        public Guid SessionId { get; set; }
        public int ProcessId { get; set; }
        public List<int> LayerIds { get; set; } = new List<int>();
        public List<int>? OperationIds { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 50;
    }
}