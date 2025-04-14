namespace RCTableEditor.Server.Models
{
    public class Process
    {
        public int ProcessId { get; set; }
        public string ProcessCode { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}