using LiteDB;
using RCTableEditor.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RCTableEditor.Server.Services
{
    public class DraftStorageService
    {
        private readonly string _dbPath;

        public DraftStorageService(IConfiguration configuration)
        {
            _dbPath = configuration["LiteDbPath"] ?? "Drafts.db";
        }

        public void SaveDraftChanges(Guid sessionId, IEnumerable<DraftChange> changes)
        {
            using var db = new LiteDatabase(_dbPath);
            var collection = db.GetCollection<DraftChange>("draft_changes");

            // Create index for fast lookup by sessionId
            collection.EnsureIndex(x => x.SessionId);

            foreach (var change in changes)
            {
                change.Timestamp = DateTime.UtcNow;
                collection.Upsert(change);
            }
        }

        public List<DraftChange> GetDraftChangesBySession(Guid sessionId)
        {
            using var db = new LiteDatabase(_dbPath);
            var collection = db.GetCollection<DraftChange>("draft_changes");

            return collection.Find(x => x.SessionId == sessionId).ToList();
        }

        public void DeleteDraftChanges(Guid sessionId)
        {
            using var db = new LiteDatabase(_dbPath);
            var collection = db.GetCollection<DraftChange>("draft_changes");

            collection.DeleteMany(x => x.SessionId == sessionId);
        }
    }
}