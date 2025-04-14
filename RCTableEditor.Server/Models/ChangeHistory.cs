namespace RCTableEditor.Server.Models
{
    public class ChangeHistory
    {
        public string ChangeId { get; set; } = Guid.NewGuid().ToString();
        public string SessionId { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Username { get; set; } = string.Empty;
        public string ChangeType { get; set; } = string.Empty;
        public int ProcessId { get; set; }
        public string? ExcelFilePath { get; set; }
        public string? SharePointUrl { get; set; }
        public string ApprovalStatus { get; set; } = "Pending";
        public DateTime? ApprovalDate { get; set; }
        public string? ApprovedBy { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}