using LiteDB;

namespace RCTableEditor.Server.Models
{
    public class DraftChange
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public Guid SessionId { get; set; }
        public string ChangeType { get; set; } = string.Empty;
        public int? TableDataId { get; set; }
        public int ProcessId { get; set; }
        public int LayerId { get; set; }
        public int DefectTypeId { get; set; }
        public int OperationId { get; set; }

        public DraftDataObject? OriginalData { get; set; }
        public DraftDataObject? NewData { get; set; }

        public DateTime Timestamp { get; set; }
        public List<string>? ModifiedFields { get; set; }
        public bool IsDiscarded { get; set; } = false;
    }

    public class DraftDataObject
    {
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
    }
}