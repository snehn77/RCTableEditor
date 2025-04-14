namespace RCTableEditor.Server.Models
{
    public class TableData
    {
        public int TableDataId { get; set; }
        public int ProcessId { get; set; }
        public int LayerId { get; set; }
        public int DefectTypeId { get; set; }
        public int OperationId { get; set; }
        public string? ClassType { get; set; }
        public int? ProductId { get; set; }
        public int? EntityConfidence { get; set; }
        public string? Comments { get; set; }
        public string? GenericData1 { get; set; }
        public string? GenericData2 { get; set; }
        public string? GenericData3 { get; set; }
        public string? EdiAttribution { get; set; }
        public string? EdiAttributionList { get; set; }
        public int? SecurityCode { get; set; }
        public DateTime LastModified { get; set; }
        public string LastModifiedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }
        public int RowVersion { get; set; } = 1;
        public bool IsDeleted { get; set; } = false;

        // Navigation properties
        public virtual Process? Process { get; set; }
        public virtual DefectLayer? Layer { get; set; }
        public virtual DefectType? DefectType { get; set; }
        public virtual Operation? Operation { get; set; }
        public virtual Product? Product { get; set; }
    }
}