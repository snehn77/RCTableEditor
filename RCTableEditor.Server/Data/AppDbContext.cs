using Microsoft.EntityFrameworkCore;
using RCTableEditor.Server.Models;

namespace RCTableEditor.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Add DbSet properties for each entity
        public DbSet<Process> Processes { get; set; }
        public DbSet<DefectLayer> DefectLayers { get; set; }
        public DbSet<DefectType> DefectTypes { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<TableData> TableData { get; set; }
        public DbSet<ChangeHistory> ChangeHistory { get; set; }
        public DbSet<SessionFilter> SessionFilters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure entities and relationships
            modelBuilder.Entity<TableData>()
                .HasIndex(t => new { t.ProcessId, t.LayerId, t.DefectTypeId, t.OperationId })
                .IsUnique()
                .HasFilter("IsDeleted = 0");

            // Add additional configurations as needed
        }

        // Add this method to the AppDbContext class
        public static void SeedData(AppDbContext context)
        {
            // Check if we already have data
            if (context.Processes.Any())
            {
                return; // Database already seeded
            }

            // Add sample processes
            var processes = new List<Process>
            {
                new Process { ProcessId = 1274, ProcessCode = "1274", Name = "Process 1274", Description = "Main manufacturing process" },
                new Process { ProcessId = 1275, ProcessCode = "1275", Name = "Process 1275", Description = "Secondary manufacturing process" }
            };
            context.Processes.AddRange(processes);

            // Add sample layers
            var layers = new List<DefectLayer>
            {
                new DefectLayer { LayerCode = "BKTCN", LayerIdCode = "4BKTCN", Description = "BKTCN Layer" },
                new DefectLayer { LayerCode = "V0RFC", LayerIdCode = "4V0RFC", Description = "V0RFC Layer" }
            };
            context.DefectLayers.AddRange(layers);

            // Add sample defect types
            var defectTypes = new List<DefectType>
            {
                new DefectType { Name = "BLOCKED_TCN", Description = "Blocked TCN defect" },
                new DefectType { Name = "ILD_HOLE_TEAROUT", Description = "ILD hole tearout defect" },
                new DefectType { Name = "MINI", Description = "Mini defect" }
            };
            context.DefectTypes.AddRange(defectTypes);

            // Add sample operations
            var operations = new List<Operation>
            {
                new Operation { OperationCode = "128853/198166", GroupName = "E_4RIPCITY", Description = "Primary operation" },
                new Operation { OperationCode = "136850", GroupName = "W_4RC_PSTASH_CLN", Description = "Secondary operation" },
                new Operation { OperationCode = "146551/154716", GroupName = "L_4M16_SED", Description = "Tertiary operation" }
            };
            context.Operations.AddRange(operations);

            // Add sample products
            var products = new List<Product>
            {
                new Product { ProductCode = "PFUR", Description = "PFUR Product" },
                new Product { ProductCode = "PISE", Description = "PISE Product" },
                new Product { ProductCode = "PNIB", Description = "PNIB Product" }
            };
            context.Products.AddRange(products);

            // Save reference data first
            context.SaveChanges();

            // Now create sample table data
            // We need to get the actual IDs from the database
            var process = context.Processes.First();
            var layer1 = context.DefectLayers.First(l => l.LayerCode == "BKTCN");
            var layer2 = context.DefectLayers.First(l => l.LayerCode == "V0RFC");
            var defectType1 = context.DefectTypes.First(d => d.Name == "BLOCKED_TCN");
            var defectType2 = context.DefectTypes.First(d => d.Name == "ILD_HOLE_TEAROUT");
            var operation1 = context.Operations.First(o => o.OperationCode == "128853/198166");
            var operation2 = context.Operations.First(o => o.OperationCode == "136850");
            var product1 = context.Products.First(p => p.ProductCode == "PFUR");
            var product2 = context.Products.First(p => p.ProductCode == "PISE");

            var tableData = new List<TableData>
            {
                new TableData
                {
                    ProcessId = process.ProcessId,
                    LayerId = layer1.LayerId,
                    DefectTypeId = defectType1.DefectTypeId,
                    OperationId = operation1.OperationId,
                    ClassType = "CLASS",
                    ProductId = product1.ProductId,
                    EntityConfidence = 3,
                    Comments = "-FTIFC LOOP-",
                    SecurityCode = 8,
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy = "SYSTEM",
                    CreatedBy = "SYSTEM"
                },
                new TableData
                {
                    ProcessId = process.ProcessId,
                    LayerId = layer1.LayerId,
                    DefectTypeId = defectType1.DefectTypeId,
                    OperationId = operation2.OperationId,
                    ClassType = "CLASS",
                    ProductId = product1.ProductId,
                    EntityConfidence = 3,
                    Comments = "-FTIFC LOOP-",
                    SecurityCode = 8,
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy = "SYSTEM",
                    CreatedBy = "SYSTEM"
                },
                new TableData
                {
                    ProcessId = process.ProcessId,
                    LayerId = layer2.LayerId,
                    DefectTypeId = defectType2.DefectTypeId,
                    OperationId = operation1.OperationId,
                    ClassType = "CLASS",
                    ProductId = product2.ProductId,
                    EntityConfidence = 1,
                    Comments = "-MISUMO LOOP-",
                    SecurityCode = 8,
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy = "SYSTEM",
                    CreatedBy = "SYSTEM"
                }
            };
            context.TableData.AddRange(tableData);
            context.SaveChanges();
        }
    }
}