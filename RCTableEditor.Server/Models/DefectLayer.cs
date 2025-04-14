namespace RCTableEditor.Server.Models
{
    public class DefectLayer
    {
        public int LayerId { get; set; }
        public string LayerCode { get; set; } = string.Empty;
        public string LayerIdCode { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}