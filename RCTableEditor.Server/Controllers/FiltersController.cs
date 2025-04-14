using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RCTableEditor.Server.Data;
using RCTableEditor.Server.Models;

namespace RCTableEditor.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiltersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FiltersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("processes")]
        public async Task<ActionResult<IEnumerable<Process>>> GetProcesses()
        {
            return await _context.Processes.Where(p => p.IsActive).ToListAsync();
        }

        [HttpGet("layers")]
        public async Task<ActionResult<IEnumerable<DefectLayer>>> GetLayers(int? processId = null)
        {
            var query = _context.DefectLayers.Where(l => l.IsActive);

            // If processId is provided, we could filter by it
            // This would require joining with TableData to get layers used by this process

            return await query.ToListAsync();
        }

        [HttpGet("defect-types")]
        public async Task<ActionResult<IEnumerable<DefectType>>> GetDefectTypes()
        {
            return await _context.DefectTypes.Where(d => d.IsActive).ToListAsync();
        }

        [HttpGet("operations")]
        public async Task<ActionResult<IEnumerable<Operation>>> GetOperations()
        {
            return await _context.Operations.Where(o => o.IsActive).ToListAsync();
        }

        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.Where(p => p.IsActive).ToListAsync();
        }

        [HttpGet("all")]
        public async Task<ActionResult<object>> GetAllFilters()
        {
            var processes = await _context.Processes.Where(p => p.IsActive).ToListAsync();
            var layers = await _context.DefectLayers.Where(l => l.IsActive).ToListAsync();
            var defectTypes = await _context.DefectTypes.Where(d => d.IsActive).ToListAsync();
            var operations = await _context.Operations.Where(o => o.IsActive).ToListAsync();
            var products = await _context.Products.Where(p => p.IsActive).ToListAsync();

            return new
            {
                processes,
                layers,
                defectTypes,
                operations,
                products
            };
        }
    }
}