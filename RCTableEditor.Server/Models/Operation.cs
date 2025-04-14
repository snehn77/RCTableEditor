namespace RCTableEditor.Server.Models
{
    public class Operation
    {
        public int OperationId { get; set; }
        public string OperationCode { get; set; } = string.Empty;
        public string? GroupName { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}