namespace RCTableEditor.Server.Models
{
    public class SessionFilter
    {
        public int FilterId { get; set; }
        public string SessionId { get; set; } = string.Empty;
        public string FilterType { get; set; } = string.Empty;
        public int FilterValue { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}